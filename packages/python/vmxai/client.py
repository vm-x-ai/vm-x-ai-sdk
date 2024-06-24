import os
from typing import Iterable, Literal, Union, overload

import grpc
import grpc._grpcio_metadata
from google.protobuf.struct_pb2 import Struct

from vmxai.auth.api_key import VMXClientAPIKey
from vmxai.auth.provider import VMXClientAuthProvider
from vmxai.protos.completion.completion_pb2 import (
    CompletionRequest as GrpcCompletionRequest,
)
from vmxai.protos.completion.completion_pb2 import (
    CompletionResponse,
    RequestToolChoiceItem,
)
from vmxai.protos.completion.completion_pb2 import (
    RequestMessage as GrpcRequestMessage,
)
from vmxai.protos.completion.completion_pb2 import (
    RequestToolChoice as GrpcRequestToolChoice,
)
from vmxai.protos.completion.completion_pb2 import (
    RequestToolFunction as GrpcRequestToolFunction,
)
from vmxai.protos.completion.completion_pb2 import (
    RequestTools as GrpcRequestTools,
)
from vmxai.protos.completion.completion_pb2_grpc import CompletionServiceStub
from vmxai.types import CompletionRequest, RequestTools


class VMXClient:
    def __init__(
        self,
        workspace_id: str,
        environment_id: str,
        domain: str,
        auth: VMXClientAuthProvider = None,
        api_key: str = None,
    ):
        self.workspace_id = workspace_id
        self.environment_id = environment_id
        self.domain = domain
        if not auth and not api_key:
            raise ValueError("Either auth or api_key must be provided")

        if api_key:
            self.auth = VMXClientAPIKey(api_key)
        else:
            self.auth = auth

        self.api_key = api_key

        channel = grpc.secure_channel(f"grpc.{self.domain}", grpc.ssl_channel_credentials())

        self.completion_client = CompletionServiceStub(channel)

    @overload
    def completion(self, *, request: CompletionRequest) -> Iterable[CompletionResponse]: ...

    @overload
    def completion(self, *, request: CompletionRequest, stream: Literal[True]) -> Iterable[CompletionResponse]: ...

    @overload
    def completion(self, *, request: CompletionRequest, stream: Literal[False]) -> CompletionResponse: ...

    def completion(
        self, *, request: CompletionRequest, stream: bool = True
    ) -> Union[CompletionResponse, Iterable[CompletionResponse]]:
        metadata: list[tuple[str, str]] = []
        if "_X_AMZN_TRACE_ID" in os.environ:
            metadata.append(("x-amzn-trace-id", os.environ["_X_AMZN_TRACE_ID"]))

        self.auth.inject_credentials(self, metadata)
        config = Struct()
        if request.config:
            config.update(request.config)

        grpc_request = GrpcCompletionRequest(
            workload=request.workload,
            resource=request.resource,
            config=config,
            stream=stream,
            tools=self._parse_tools(request.tools),
            tool_choice=self._parse_tool_choice(request.tool_choice),
            messages=[
                GrpcRequestMessage(
                    name=message.name,
                    role=message.role,
                    tool_call_id=message.tool_call_id,
                    tool_calls=message.tool_calls or [],
                    content=message.content,
                )
                for message in request.messages
            ],
        )

        if stream:
            return self.completion_client.create(grpc_request, metadata=tuple(metadata))
        else:
            for response in self.completion_client.create(grpc_request, metadata=metadata):
                return response

    def _parse_tools(self, tools: list[RequestTools]) -> list[GrpcRequestTools]:
        result: list[GrpcRequestTools] = []
        for tool in tools or []:
            grpc_function_params = Struct()
            grpc_function_params.update(tool.function.parameters)

            grpc_tool = GrpcRequestTools(
                type=tool.type,
                function=GrpcRequestToolFunction(
                    name=tool.function.name,
                    description=tool.function.description,
                    parameters=grpc_function_params
                ),
            )
            result.append(grpc_tool)

        return result

    def _parse_tool_choice(
        self, tool_choice: Union[Literal["auto", "none"], RequestToolChoiceItem]
    ) -> GrpcRequestToolChoice:
        if tool_choice == "auto":
            return GrpcRequestToolChoice(auto=True, none=False)
        elif tool_choice == "none":
            return GrpcRequestToolChoice(auto=False, none=True)
        else:
            return GrpcRequestToolChoice(auto=False, none=False, tool=tool_choice)
