# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from vmxai.protos.completion import completion_pb2 as vmxai_dot_protos_dot_completion_dot_completion__pb2


class CompletionServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.create = channel.unary_stream(
                '/llm.chat.CompletionService/create',
                request_serializer=vmxai_dot_protos_dot_completion_dot_completion__pb2.CompletionRequest.SerializeToString,
                response_deserializer=vmxai_dot_protos_dot_completion_dot_completion__pb2.CompletionResponse.FromString,
                )


class CompletionServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def create(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_CompletionServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'create': grpc.unary_stream_rpc_method_handler(
                    servicer.create,
                    request_deserializer=vmxai_dot_protos_dot_completion_dot_completion__pb2.CompletionRequest.FromString,
                    response_serializer=vmxai_dot_protos_dot_completion_dot_completion__pb2.CompletionResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'llm.chat.CompletionService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class CompletionService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def create(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_stream(request, target, '/llm.chat.CompletionService/create',
            vmxai_dot_protos_dot_completion_dot_completion__pb2.CompletionRequest.SerializeToString,
            vmxai_dot_protos_dot_completion_dot_completion__pb2.CompletionResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
