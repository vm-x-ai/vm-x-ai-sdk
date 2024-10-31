/* eslint-disable */
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  ClientReadableStream,
  type ClientUnaryCall,
  handleServerStreamingCall,
  type handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  type ServiceError,
  type UntypedServiceImplementation,
} from '@grpc/grpc-js';
import Long from 'long';
import _m0 from 'protobufjs/minimal.js';
import { Struct } from './google/protobuf/struct';

export const protobufPackage = 'llm.chat';

/** getResourceProviderCount: Request Types */
export interface GetResourceProviderCountRequest {
  workspaceId?: string | undefined;
  environmentId?: string | undefined;
  resource: string;
}

/** getResourceProviderCount: Response Types */
export interface GetResourceProviderCountResponse {
  count: number;
}

/** create: Request Types */
export interface CompletionRequest {
  workspaceId?: string | undefined;
  environmentId?: string | undefined;
  primary?: boolean | undefined;
  secondaryModelIndex?: number | undefined;
  resource: string;
  stream: boolean;
  messages: RequestMessage[];
  tools: RequestTools[];
  toolChoice?: RequestToolChoice | undefined;
  config?: { [key: string]: any } | undefined;
  includeRawResponse?: boolean | undefined;
  resourceConfigOverrides?: { [key: string]: any } | undefined;
  metadata?: { [key: string]: any } | undefined;
}

export interface RequestMessage {
  name?: string | undefined;
  role: string;
  content?: string | undefined;
  toolCalls: RequestMessageToolCall[];
  toolCallId?: string | undefined;
}

export interface RequestMessageToolCall {
  id: string;
  type: string;
  function: RequestMessageToolCallFunction | undefined;
}

export interface RequestMessageToolCallFunction {
  name: string;
  arguments: string;
}

export interface RequestTools {
  type: string;
  function: RequestToolFunction | undefined;
}

export interface RequestToolFunction {
  name: string;
  description: string;
  parameters: { [key: string]: any } | undefined;
}

export interface RequestToolChoice {
  auto?: boolean | undefined;
  none?: boolean | undefined;
  tool?: RequestToolChoiceItem | undefined;
}

export interface RequestToolChoiceItem {
  type: string;
  function: RequestToolChoiceFunction | undefined;
}

export interface RequestToolChoiceFunction {
  name: string;
}

/** create: Response Types */
export interface CompletionResponse {
  id: string;
  message?: string | undefined;
  role: string;
  toolCalls: RequestMessageToolCall[];
  usage?: CompletionUsage | undefined;
  responseTimestamp?: number | undefined;
  metadata: CompletionResponseMetadata | undefined;
  metrics?: CompletionResponseMetrics | undefined;
  rawResponse?: { [key: string]: any } | undefined;
  finishReason?: string | undefined;
}

export interface CompletionUsage {
  prompt: number;
  completion: number;
  total: number;
}

export interface CompletionResponseMetadata {
  primary: boolean;
  secondaryModelIndex?: number | undefined;
  provider: string;
  model: string;
  done: boolean;
  success: boolean;
  fallback: boolean;
  fallbackAttempts: number;
  errorMessage?: string | undefined;
  errorCode?: number | undefined;
  errorReason?: string | undefined;
}

export interface CompletionResponseMetrics {
  timeToFirstToken?: number | undefined;
  tokensPerSecond: number;
}

function createBaseGetResourceProviderCountRequest(): GetResourceProviderCountRequest {
  return { workspaceId: undefined, environmentId: undefined, resource: '' };
}

export const GetResourceProviderCountRequest = {
  encode(message: GetResourceProviderCountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workspaceId !== undefined) {
      writer.uint32(10).string(message.workspaceId);
    }
    if (message.environmentId !== undefined) {
      writer.uint32(18).string(message.environmentId);
    }
    if (message.resource !== '') {
      writer.uint32(26).string(message.resource);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetResourceProviderCountRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetResourceProviderCountRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workspaceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.environmentId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.resource = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetResourceProviderCountRequest, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetResourceProviderCountRequest | GetResourceProviderCountRequest[]>
      | Iterable<GetResourceProviderCountRequest | GetResourceProviderCountRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [GetResourceProviderCountRequest.encode(p).finish()];
        }
      } else {
        yield* [GetResourceProviderCountRequest.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetResourceProviderCountRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetResourceProviderCountRequest> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [GetResourceProviderCountRequest.decode(p)];
        }
      } else {
        yield* [GetResourceProviderCountRequest.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): GetResourceProviderCountRequest {
    return {
      workspaceId: isSet(object.workspaceId) ? globalThis.String(object.workspaceId) : undefined,
      environmentId: isSet(object.environmentId) ? globalThis.String(object.environmentId) : undefined,
      resource: isSet(object.resource) ? globalThis.String(object.resource) : '',
    };
  },

  toJSON(message: GetResourceProviderCountRequest): unknown {
    const obj: any = {};
    if (message.workspaceId !== undefined) {
      obj.workspaceId = message.workspaceId;
    }
    if (message.environmentId !== undefined) {
      obj.environmentId = message.environmentId;
    }
    if (message.resource !== '') {
      obj.resource = message.resource;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetResourceProviderCountRequest>, I>>(base?: I): GetResourceProviderCountRequest {
    return GetResourceProviderCountRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetResourceProviderCountRequest>, I>>(
    object: I,
  ): GetResourceProviderCountRequest {
    const message = createBaseGetResourceProviderCountRequest();
    message.workspaceId = object.workspaceId ?? undefined;
    message.environmentId = object.environmentId ?? undefined;
    message.resource = object.resource ?? '';
    return message;
  },
};

function createBaseGetResourceProviderCountResponse(): GetResourceProviderCountResponse {
  return { count: 0 };
}

export const GetResourceProviderCountResponse = {
  encode(message: GetResourceProviderCountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.count !== 0) {
      writer.uint32(8).int32(message.count);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetResourceProviderCountResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetResourceProviderCountResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.count = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<GetResourceProviderCountResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<GetResourceProviderCountResponse | GetResourceProviderCountResponse[]>
      | Iterable<GetResourceProviderCountResponse | GetResourceProviderCountResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [GetResourceProviderCountResponse.encode(p).finish()];
        }
      } else {
        yield* [GetResourceProviderCountResponse.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GetResourceProviderCountResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GetResourceProviderCountResponse> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [GetResourceProviderCountResponse.decode(p)];
        }
      } else {
        yield* [GetResourceProviderCountResponse.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): GetResourceProviderCountResponse {
    return { count: isSet(object.count) ? globalThis.Number(object.count) : 0 };
  },

  toJSON(message: GetResourceProviderCountResponse): unknown {
    const obj: any = {};
    if (message.count !== 0) {
      obj.count = Math.round(message.count);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetResourceProviderCountResponse>, I>>(
    base?: I,
  ): GetResourceProviderCountResponse {
    return GetResourceProviderCountResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetResourceProviderCountResponse>, I>>(
    object: I,
  ): GetResourceProviderCountResponse {
    const message = createBaseGetResourceProviderCountResponse();
    message.count = object.count ?? 0;
    return message;
  },
};

function createBaseCompletionRequest(): CompletionRequest {
  return {
    workspaceId: undefined,
    environmentId: undefined,
    primary: undefined,
    secondaryModelIndex: undefined,
    resource: '',
    stream: false,
    messages: [],
    tools: [],
    toolChoice: undefined,
    config: undefined,
    includeRawResponse: undefined,
    resourceConfigOverrides: undefined,
    metadata: undefined,
  };
}

export const CompletionRequest = {
  encode(message: CompletionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.workspaceId !== undefined) {
      writer.uint32(10).string(message.workspaceId);
    }
    if (message.environmentId !== undefined) {
      writer.uint32(18).string(message.environmentId);
    }
    if (message.primary !== undefined) {
      writer.uint32(24).bool(message.primary);
    }
    if (message.secondaryModelIndex !== undefined) {
      writer.uint32(32).int32(message.secondaryModelIndex);
    }
    if (message.resource !== '') {
      writer.uint32(42).string(message.resource);
    }
    if (message.stream !== false) {
      writer.uint32(48).bool(message.stream);
    }
    for (const v of message.messages) {
      RequestMessage.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.tools) {
      RequestTools.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.toolChoice !== undefined) {
      RequestToolChoice.encode(message.toolChoice, writer.uint32(74).fork()).ldelim();
    }
    if (message.config !== undefined) {
      Struct.encode(Struct.wrap(message.config), writer.uint32(82).fork()).ldelim();
    }
    if (message.includeRawResponse !== undefined) {
      writer.uint32(88).bool(message.includeRawResponse);
    }
    if (message.resourceConfigOverrides !== undefined) {
      Struct.encode(Struct.wrap(message.resourceConfigOverrides), writer.uint32(98).fork()).ldelim();
    }
    if (message.metadata !== undefined) {
      Struct.encode(Struct.wrap(message.metadata), writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompletionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompletionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.workspaceId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.environmentId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.primary = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.secondaryModelIndex = reader.int32();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.resource = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.stream = reader.bool();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.messages.push(RequestMessage.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.tools.push(RequestTools.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.toolChoice = RequestToolChoice.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.config = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.includeRawResponse = reader.bool();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.resourceConfigOverrides = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.metadata = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CompletionRequest, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<CompletionRequest | CompletionRequest[]> | Iterable<CompletionRequest | CompletionRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionRequest.encode(p).finish()];
        }
      } else {
        yield* [CompletionRequest.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CompletionRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CompletionRequest> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionRequest.decode(p)];
        }
      } else {
        yield* [CompletionRequest.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): CompletionRequest {
    return {
      workspaceId: isSet(object.workspaceId) ? globalThis.String(object.workspaceId) : undefined,
      environmentId: isSet(object.environmentId) ? globalThis.String(object.environmentId) : undefined,
      primary: isSet(object.primary) ? globalThis.Boolean(object.primary) : undefined,
      secondaryModelIndex: isSet(object.secondaryModelIndex)
        ? globalThis.Number(object.secondaryModelIndex)
        : undefined,
      resource: isSet(object.resource) ? globalThis.String(object.resource) : '',
      stream: isSet(object.stream) ? globalThis.Boolean(object.stream) : false,
      messages: globalThis.Array.isArray(object?.messages)
        ? object.messages.map((e: any) => RequestMessage.fromJSON(e))
        : [],
      tools: globalThis.Array.isArray(object?.tools) ? object.tools.map((e: any) => RequestTools.fromJSON(e)) : [],
      toolChoice: isSet(object.toolChoice) ? RequestToolChoice.fromJSON(object.toolChoice) : undefined,
      config: isObject(object.config) ? object.config : undefined,
      includeRawResponse: isSet(object.includeRawResponse) ? globalThis.Boolean(object.includeRawResponse) : undefined,
      resourceConfigOverrides: isObject(object.resourceConfigOverrides) ? object.resourceConfigOverrides : undefined,
      metadata: isObject(object.metadata) ? object.metadata : undefined,
    };
  },

  toJSON(message: CompletionRequest): unknown {
    const obj: any = {};
    if (message.workspaceId !== undefined) {
      obj.workspaceId = message.workspaceId;
    }
    if (message.environmentId !== undefined) {
      obj.environmentId = message.environmentId;
    }
    if (message.primary !== undefined) {
      obj.primary = message.primary;
    }
    if (message.secondaryModelIndex !== undefined) {
      obj.secondaryModelIndex = Math.round(message.secondaryModelIndex);
    }
    if (message.resource !== '') {
      obj.resource = message.resource;
    }
    if (message.stream !== false) {
      obj.stream = message.stream;
    }
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => RequestMessage.toJSON(e));
    }
    if (message.tools?.length) {
      obj.tools = message.tools.map((e) => RequestTools.toJSON(e));
    }
    if (message.toolChoice !== undefined) {
      obj.toolChoice = RequestToolChoice.toJSON(message.toolChoice);
    }
    if (message.config !== undefined) {
      obj.config = message.config;
    }
    if (message.includeRawResponse !== undefined) {
      obj.includeRawResponse = message.includeRawResponse;
    }
    if (message.resourceConfigOverrides !== undefined) {
      obj.resourceConfigOverrides = message.resourceConfigOverrides;
    }
    if (message.metadata !== undefined) {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompletionRequest>, I>>(base?: I): CompletionRequest {
    return CompletionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompletionRequest>, I>>(object: I): CompletionRequest {
    const message = createBaseCompletionRequest();
    message.workspaceId = object.workspaceId ?? undefined;
    message.environmentId = object.environmentId ?? undefined;
    message.primary = object.primary ?? undefined;
    message.secondaryModelIndex = object.secondaryModelIndex ?? undefined;
    message.resource = object.resource ?? '';
    message.stream = object.stream ?? false;
    message.messages = object.messages?.map((e) => RequestMessage.fromPartial(e)) || [];
    message.tools = object.tools?.map((e) => RequestTools.fromPartial(e)) || [];
    message.toolChoice =
      object.toolChoice !== undefined && object.toolChoice !== null
        ? RequestToolChoice.fromPartial(object.toolChoice)
        : undefined;
    message.config = object.config ?? undefined;
    message.includeRawResponse = object.includeRawResponse ?? undefined;
    message.resourceConfigOverrides = object.resourceConfigOverrides ?? undefined;
    message.metadata = object.metadata ?? undefined;
    return message;
  },
};

function createBaseRequestMessage(): RequestMessage {
  return { name: undefined, role: '', content: undefined, toolCalls: [], toolCallId: undefined };
}

export const RequestMessage = {
  encode(message: RequestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.role !== '') {
      writer.uint32(18).string(message.role);
    }
    if (message.content !== undefined) {
      writer.uint32(26).string(message.content);
    }
    for (const v of message.toolCalls) {
      RequestMessageToolCall.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.toolCallId !== undefined) {
      writer.uint32(42).string(message.toolCallId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.role = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.content = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.toolCalls.push(RequestMessageToolCall.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.toolCallId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestMessage, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<RequestMessage | RequestMessage[]> | Iterable<RequestMessage | RequestMessage[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessage.encode(p).finish()];
        }
      } else {
        yield* [RequestMessage.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestMessage>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestMessage> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessage.decode(p)];
        }
      } else {
        yield* [RequestMessage.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestMessage {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : undefined,
      role: isSet(object.role) ? globalThis.String(object.role) : '',
      content: isSet(object.content) ? globalThis.String(object.content) : undefined,
      toolCalls: globalThis.Array.isArray(object?.toolCalls)
        ? object.toolCalls.map((e: any) => RequestMessageToolCall.fromJSON(e))
        : [],
      toolCallId: isSet(object.toolCallId) ? globalThis.String(object.toolCallId) : undefined,
    };
  },

  toJSON(message: RequestMessage): unknown {
    const obj: any = {};
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.role !== '') {
      obj.role = message.role;
    }
    if (message.content !== undefined) {
      obj.content = message.content;
    }
    if (message.toolCalls?.length) {
      obj.toolCalls = message.toolCalls.map((e) => RequestMessageToolCall.toJSON(e));
    }
    if (message.toolCallId !== undefined) {
      obj.toolCallId = message.toolCallId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestMessage>, I>>(base?: I): RequestMessage {
    return RequestMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestMessage>, I>>(object: I): RequestMessage {
    const message = createBaseRequestMessage();
    message.name = object.name ?? undefined;
    message.role = object.role ?? '';
    message.content = object.content ?? undefined;
    message.toolCalls = object.toolCalls?.map((e) => RequestMessageToolCall.fromPartial(e)) || [];
    message.toolCallId = object.toolCallId ?? undefined;
    return message;
  },
};

function createBaseRequestMessageToolCall(): RequestMessageToolCall {
  return { id: '', type: '', function: undefined };
}

export const RequestMessageToolCall = {
  encode(message: RequestMessageToolCall, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== '') {
      writer.uint32(18).string(message.type);
    }
    if (message.function !== undefined) {
      RequestMessageToolCallFunction.encode(message.function, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestMessageToolCall {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestMessageToolCall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.function = RequestMessageToolCallFunction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestMessageToolCall, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestMessageToolCall | RequestMessageToolCall[]>
      | Iterable<RequestMessageToolCall | RequestMessageToolCall[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessageToolCall.encode(p).finish()];
        }
      } else {
        yield* [RequestMessageToolCall.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestMessageToolCall>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestMessageToolCall> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessageToolCall.decode(p)];
        }
      } else {
        yield* [RequestMessageToolCall.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestMessageToolCall {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : '',
      type: isSet(object.type) ? globalThis.String(object.type) : '',
      function: isSet(object.function) ? RequestMessageToolCallFunction.fromJSON(object.function) : undefined,
    };
  },

  toJSON(message: RequestMessageToolCall): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    if (message.type !== '') {
      obj.type = message.type;
    }
    if (message.function !== undefined) {
      obj.function = RequestMessageToolCallFunction.toJSON(message.function);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestMessageToolCall>, I>>(base?: I): RequestMessageToolCall {
    return RequestMessageToolCall.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestMessageToolCall>, I>>(object: I): RequestMessageToolCall {
    const message = createBaseRequestMessageToolCall();
    message.id = object.id ?? '';
    message.type = object.type ?? '';
    message.function =
      object.function !== undefined && object.function !== null
        ? RequestMessageToolCallFunction.fromPartial(object.function)
        : undefined;
    return message;
  },
};

function createBaseRequestMessageToolCallFunction(): RequestMessageToolCallFunction {
  return { name: '', arguments: '' };
}

export const RequestMessageToolCallFunction = {
  encode(message: RequestMessageToolCallFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.arguments !== '') {
      writer.uint32(18).string(message.arguments);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestMessageToolCallFunction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestMessageToolCallFunction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.arguments = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestMessageToolCallFunction, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestMessageToolCallFunction | RequestMessageToolCallFunction[]>
      | Iterable<RequestMessageToolCallFunction | RequestMessageToolCallFunction[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessageToolCallFunction.encode(p).finish()];
        }
      } else {
        yield* [RequestMessageToolCallFunction.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestMessageToolCallFunction>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestMessageToolCallFunction> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessageToolCallFunction.decode(p)];
        }
      } else {
        yield* [RequestMessageToolCallFunction.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestMessageToolCallFunction {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      arguments: isSet(object.arguments) ? globalThis.String(object.arguments) : '',
    };
  },

  toJSON(message: RequestMessageToolCallFunction): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.arguments !== '') {
      obj.arguments = message.arguments;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestMessageToolCallFunction>, I>>(base?: I): RequestMessageToolCallFunction {
    return RequestMessageToolCallFunction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestMessageToolCallFunction>, I>>(
    object: I,
  ): RequestMessageToolCallFunction {
    const message = createBaseRequestMessageToolCallFunction();
    message.name = object.name ?? '';
    message.arguments = object.arguments ?? '';
    return message;
  },
};

function createBaseRequestTools(): RequestTools {
  return { type: '', function: undefined };
}

export const RequestTools = {
  encode(message: RequestTools, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== '') {
      writer.uint32(10).string(message.type);
    }
    if (message.function !== undefined) {
      RequestToolFunction.encode(message.function, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestTools {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestTools();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.function = RequestToolFunction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestTools, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<RequestTools | RequestTools[]> | Iterable<RequestTools | RequestTools[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestTools.encode(p).finish()];
        }
      } else {
        yield* [RequestTools.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestTools>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestTools> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestTools.decode(p)];
        }
      } else {
        yield* [RequestTools.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestTools {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : '',
      function: isSet(object.function) ? RequestToolFunction.fromJSON(object.function) : undefined,
    };
  },

  toJSON(message: RequestTools): unknown {
    const obj: any = {};
    if (message.type !== '') {
      obj.type = message.type;
    }
    if (message.function !== undefined) {
      obj.function = RequestToolFunction.toJSON(message.function);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestTools>, I>>(base?: I): RequestTools {
    return RequestTools.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestTools>, I>>(object: I): RequestTools {
    const message = createBaseRequestTools();
    message.type = object.type ?? '';
    message.function =
      object.function !== undefined && object.function !== null
        ? RequestToolFunction.fromPartial(object.function)
        : undefined;
    return message;
  },
};

function createBaseRequestToolFunction(): RequestToolFunction {
  return { name: '', description: '', parameters: undefined };
}

export const RequestToolFunction = {
  encode(message: RequestToolFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    if (message.parameters !== undefined) {
      Struct.encode(Struct.wrap(message.parameters), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestToolFunction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestToolFunction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.parameters = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestToolFunction, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestToolFunction | RequestToolFunction[]>
      | Iterable<RequestToolFunction | RequestToolFunction[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolFunction.encode(p).finish()];
        }
      } else {
        yield* [RequestToolFunction.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestToolFunction>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestToolFunction> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolFunction.decode(p)];
        }
      } else {
        yield* [RequestToolFunction.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestToolFunction {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      description: isSet(object.description) ? globalThis.String(object.description) : '',
      parameters: isObject(object.parameters) ? object.parameters : undefined,
    };
  },

  toJSON(message: RequestToolFunction): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.description !== '') {
      obj.description = message.description;
    }
    if (message.parameters !== undefined) {
      obj.parameters = message.parameters;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestToolFunction>, I>>(base?: I): RequestToolFunction {
    return RequestToolFunction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestToolFunction>, I>>(object: I): RequestToolFunction {
    const message = createBaseRequestToolFunction();
    message.name = object.name ?? '';
    message.description = object.description ?? '';
    message.parameters = object.parameters ?? undefined;
    return message;
  },
};

function createBaseRequestToolChoice(): RequestToolChoice {
  return { auto: undefined, none: undefined, tool: undefined };
}

export const RequestToolChoice = {
  encode(message: RequestToolChoice, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.auto !== undefined) {
      writer.uint32(8).bool(message.auto);
    }
    if (message.none !== undefined) {
      writer.uint32(16).bool(message.none);
    }
    if (message.tool !== undefined) {
      RequestToolChoiceItem.encode(message.tool, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestToolChoice {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestToolChoice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.auto = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.none = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.tool = RequestToolChoiceItem.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestToolChoice, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<RequestToolChoice | RequestToolChoice[]> | Iterable<RequestToolChoice | RequestToolChoice[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolChoice.encode(p).finish()];
        }
      } else {
        yield* [RequestToolChoice.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestToolChoice>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestToolChoice> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolChoice.decode(p)];
        }
      } else {
        yield* [RequestToolChoice.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestToolChoice {
    return {
      auto: isSet(object.auto) ? globalThis.Boolean(object.auto) : undefined,
      none: isSet(object.none) ? globalThis.Boolean(object.none) : undefined,
      tool: isSet(object.tool) ? RequestToolChoiceItem.fromJSON(object.tool) : undefined,
    };
  },

  toJSON(message: RequestToolChoice): unknown {
    const obj: any = {};
    if (message.auto !== undefined) {
      obj.auto = message.auto;
    }
    if (message.none !== undefined) {
      obj.none = message.none;
    }
    if (message.tool !== undefined) {
      obj.tool = RequestToolChoiceItem.toJSON(message.tool);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestToolChoice>, I>>(base?: I): RequestToolChoice {
    return RequestToolChoice.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestToolChoice>, I>>(object: I): RequestToolChoice {
    const message = createBaseRequestToolChoice();
    message.auto = object.auto ?? undefined;
    message.none = object.none ?? undefined;
    message.tool =
      object.tool !== undefined && object.tool !== null ? RequestToolChoiceItem.fromPartial(object.tool) : undefined;
    return message;
  },
};

function createBaseRequestToolChoiceItem(): RequestToolChoiceItem {
  return { type: '', function: undefined };
}

export const RequestToolChoiceItem = {
  encode(message: RequestToolChoiceItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== '') {
      writer.uint32(10).string(message.type);
    }
    if (message.function !== undefined) {
      RequestToolChoiceFunction.encode(message.function, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestToolChoiceItem {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestToolChoiceItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.function = RequestToolChoiceFunction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestToolChoiceItem, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestToolChoiceItem | RequestToolChoiceItem[]>
      | Iterable<RequestToolChoiceItem | RequestToolChoiceItem[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolChoiceItem.encode(p).finish()];
        }
      } else {
        yield* [RequestToolChoiceItem.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestToolChoiceItem>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestToolChoiceItem> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolChoiceItem.decode(p)];
        }
      } else {
        yield* [RequestToolChoiceItem.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestToolChoiceItem {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : '',
      function: isSet(object.function) ? RequestToolChoiceFunction.fromJSON(object.function) : undefined,
    };
  },

  toJSON(message: RequestToolChoiceItem): unknown {
    const obj: any = {};
    if (message.type !== '') {
      obj.type = message.type;
    }
    if (message.function !== undefined) {
      obj.function = RequestToolChoiceFunction.toJSON(message.function);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestToolChoiceItem>, I>>(base?: I): RequestToolChoiceItem {
    return RequestToolChoiceItem.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestToolChoiceItem>, I>>(object: I): RequestToolChoiceItem {
    const message = createBaseRequestToolChoiceItem();
    message.type = object.type ?? '';
    message.function =
      object.function !== undefined && object.function !== null
        ? RequestToolChoiceFunction.fromPartial(object.function)
        : undefined;
    return message;
  },
};

function createBaseRequestToolChoiceFunction(): RequestToolChoiceFunction {
  return { name: '' };
}

export const RequestToolChoiceFunction = {
  encode(message: RequestToolChoiceFunction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestToolChoiceFunction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestToolChoiceFunction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<RequestToolChoiceFunction, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestToolChoiceFunction | RequestToolChoiceFunction[]>
      | Iterable<RequestToolChoiceFunction | RequestToolChoiceFunction[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolChoiceFunction.encode(p).finish()];
        }
      } else {
        yield* [RequestToolChoiceFunction.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestToolChoiceFunction>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestToolChoiceFunction> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestToolChoiceFunction.decode(p)];
        }
      } else {
        yield* [RequestToolChoiceFunction.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestToolChoiceFunction {
    return { name: isSet(object.name) ? globalThis.String(object.name) : '' };
  },

  toJSON(message: RequestToolChoiceFunction): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestToolChoiceFunction>, I>>(base?: I): RequestToolChoiceFunction {
    return RequestToolChoiceFunction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestToolChoiceFunction>, I>>(object: I): RequestToolChoiceFunction {
    const message = createBaseRequestToolChoiceFunction();
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseCompletionResponse(): CompletionResponse {
  return {
    id: '',
    message: undefined,
    role: '',
    toolCalls: [],
    usage: undefined,
    responseTimestamp: undefined,
    metadata: undefined,
    metrics: undefined,
    rawResponse: undefined,
    finishReason: undefined,
  };
}

export const CompletionResponse = {
  encode(message: CompletionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    if (message.role !== '') {
      writer.uint32(26).string(message.role);
    }
    for (const v of message.toolCalls) {
      RequestMessageToolCall.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.usage !== undefined) {
      CompletionUsage.encode(message.usage, writer.uint32(42).fork()).ldelim();
    }
    if (message.responseTimestamp !== undefined) {
      writer.uint32(48).int64(message.responseTimestamp);
    }
    if (message.metadata !== undefined) {
      CompletionResponseMetadata.encode(message.metadata, writer.uint32(58).fork()).ldelim();
    }
    if (message.metrics !== undefined) {
      CompletionResponseMetrics.encode(message.metrics, writer.uint32(66).fork()).ldelim();
    }
    if (message.rawResponse !== undefined) {
      Struct.encode(Struct.wrap(message.rawResponse), writer.uint32(74).fork()).ldelim();
    }
    if (message.finishReason !== undefined) {
      writer.uint32(82).string(message.finishReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompletionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompletionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.role = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.toolCalls.push(RequestMessageToolCall.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.usage = CompletionUsage.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.responseTimestamp = longToNumber(reader.int64() as Long);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.metadata = CompletionResponseMetadata.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.metrics = CompletionResponseMetrics.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.rawResponse = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.finishReason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CompletionResponse, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CompletionResponse | CompletionResponse[]>
      | Iterable<CompletionResponse | CompletionResponse[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionResponse.encode(p).finish()];
        }
      } else {
        yield* [CompletionResponse.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CompletionResponse>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CompletionResponse> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionResponse.decode(p)];
        }
      } else {
        yield* [CompletionResponse.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): CompletionResponse {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : '',
      message: isSet(object.message) ? globalThis.String(object.message) : undefined,
      role: isSet(object.role) ? globalThis.String(object.role) : '',
      toolCalls: globalThis.Array.isArray(object?.toolCalls)
        ? object.toolCalls.map((e: any) => RequestMessageToolCall.fromJSON(e))
        : [],
      usage: isSet(object.usage) ? CompletionUsage.fromJSON(object.usage) : undefined,
      responseTimestamp: isSet(object.responseTimestamp) ? globalThis.Number(object.responseTimestamp) : undefined,
      metadata: isSet(object.metadata) ? CompletionResponseMetadata.fromJSON(object.metadata) : undefined,
      metrics: isSet(object.metrics) ? CompletionResponseMetrics.fromJSON(object.metrics) : undefined,
      rawResponse: isObject(object.rawResponse) ? object.rawResponse : undefined,
      finishReason: isSet(object.finishReason) ? globalThis.String(object.finishReason) : undefined,
    };
  },

  toJSON(message: CompletionResponse): unknown {
    const obj: any = {};
    if (message.id !== '') {
      obj.id = message.id;
    }
    if (message.message !== undefined) {
      obj.message = message.message;
    }
    if (message.role !== '') {
      obj.role = message.role;
    }
    if (message.toolCalls?.length) {
      obj.toolCalls = message.toolCalls.map((e) => RequestMessageToolCall.toJSON(e));
    }
    if (message.usage !== undefined) {
      obj.usage = CompletionUsage.toJSON(message.usage);
    }
    if (message.responseTimestamp !== undefined) {
      obj.responseTimestamp = Math.round(message.responseTimestamp);
    }
    if (message.metadata !== undefined) {
      obj.metadata = CompletionResponseMetadata.toJSON(message.metadata);
    }
    if (message.metrics !== undefined) {
      obj.metrics = CompletionResponseMetrics.toJSON(message.metrics);
    }
    if (message.rawResponse !== undefined) {
      obj.rawResponse = message.rawResponse;
    }
    if (message.finishReason !== undefined) {
      obj.finishReason = message.finishReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompletionResponse>, I>>(base?: I): CompletionResponse {
    return CompletionResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompletionResponse>, I>>(object: I): CompletionResponse {
    const message = createBaseCompletionResponse();
    message.id = object.id ?? '';
    message.message = object.message ?? undefined;
    message.role = object.role ?? '';
    message.toolCalls = object.toolCalls?.map((e) => RequestMessageToolCall.fromPartial(e)) || [];
    message.usage =
      object.usage !== undefined && object.usage !== null ? CompletionUsage.fromPartial(object.usage) : undefined;
    message.responseTimestamp = object.responseTimestamp ?? undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? CompletionResponseMetadata.fromPartial(object.metadata)
        : undefined;
    message.metrics =
      object.metrics !== undefined && object.metrics !== null
        ? CompletionResponseMetrics.fromPartial(object.metrics)
        : undefined;
    message.rawResponse = object.rawResponse ?? undefined;
    message.finishReason = object.finishReason ?? undefined;
    return message;
  },
};

function createBaseCompletionUsage(): CompletionUsage {
  return { prompt: 0, completion: 0, total: 0 };
}

export const CompletionUsage = {
  encode(message: CompletionUsage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.prompt !== 0) {
      writer.uint32(8).int32(message.prompt);
    }
    if (message.completion !== 0) {
      writer.uint32(16).int32(message.completion);
    }
    if (message.total !== 0) {
      writer.uint32(24).int32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompletionUsage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompletionUsage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.prompt = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.completion = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.total = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CompletionUsage, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<CompletionUsage | CompletionUsage[]> | Iterable<CompletionUsage | CompletionUsage[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionUsage.encode(p).finish()];
        }
      } else {
        yield* [CompletionUsage.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CompletionUsage>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CompletionUsage> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionUsage.decode(p)];
        }
      } else {
        yield* [CompletionUsage.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): CompletionUsage {
    return {
      prompt: isSet(object.prompt) ? globalThis.Number(object.prompt) : 0,
      completion: isSet(object.completion) ? globalThis.Number(object.completion) : 0,
      total: isSet(object.total) ? globalThis.Number(object.total) : 0,
    };
  },

  toJSON(message: CompletionUsage): unknown {
    const obj: any = {};
    if (message.prompt !== 0) {
      obj.prompt = Math.round(message.prompt);
    }
    if (message.completion !== 0) {
      obj.completion = Math.round(message.completion);
    }
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompletionUsage>, I>>(base?: I): CompletionUsage {
    return CompletionUsage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompletionUsage>, I>>(object: I): CompletionUsage {
    const message = createBaseCompletionUsage();
    message.prompt = object.prompt ?? 0;
    message.completion = object.completion ?? 0;
    message.total = object.total ?? 0;
    return message;
  },
};

function createBaseCompletionResponseMetadata(): CompletionResponseMetadata {
  return {
    primary: false,
    secondaryModelIndex: undefined,
    provider: '',
    model: '',
    done: false,
    success: false,
    fallback: false,
    fallbackAttempts: 0,
    errorMessage: undefined,
    errorCode: undefined,
    errorReason: undefined,
  };
}

export const CompletionResponseMetadata = {
  encode(message: CompletionResponseMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.primary !== false) {
      writer.uint32(8).bool(message.primary);
    }
    if (message.secondaryModelIndex !== undefined) {
      writer.uint32(16).int32(message.secondaryModelIndex);
    }
    if (message.provider !== '') {
      writer.uint32(26).string(message.provider);
    }
    if (message.model !== '') {
      writer.uint32(34).string(message.model);
    }
    if (message.done !== false) {
      writer.uint32(40).bool(message.done);
    }
    if (message.success !== false) {
      writer.uint32(48).bool(message.success);
    }
    if (message.fallback !== false) {
      writer.uint32(56).bool(message.fallback);
    }
    if (message.fallbackAttempts !== 0) {
      writer.uint32(64).int32(message.fallbackAttempts);
    }
    if (message.errorMessage !== undefined) {
      writer.uint32(74).string(message.errorMessage);
    }
    if (message.errorCode !== undefined) {
      writer.uint32(80).int32(message.errorCode);
    }
    if (message.errorReason !== undefined) {
      writer.uint32(90).string(message.errorReason);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompletionResponseMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompletionResponseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.primary = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.secondaryModelIndex = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.provider = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.model = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.done = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.success = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.fallback = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.fallbackAttempts = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.errorMessage = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.errorCode = reader.int32();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.errorReason = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CompletionResponseMetadata, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CompletionResponseMetadata | CompletionResponseMetadata[]>
      | Iterable<CompletionResponseMetadata | CompletionResponseMetadata[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionResponseMetadata.encode(p).finish()];
        }
      } else {
        yield* [CompletionResponseMetadata.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CompletionResponseMetadata>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CompletionResponseMetadata> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionResponseMetadata.decode(p)];
        }
      } else {
        yield* [CompletionResponseMetadata.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): CompletionResponseMetadata {
    return {
      primary: isSet(object.primary) ? globalThis.Boolean(object.primary) : false,
      secondaryModelIndex: isSet(object.secondaryModelIndex)
        ? globalThis.Number(object.secondaryModelIndex)
        : undefined,
      provider: isSet(object.provider) ? globalThis.String(object.provider) : '',
      model: isSet(object.model) ? globalThis.String(object.model) : '',
      done: isSet(object.done) ? globalThis.Boolean(object.done) : false,
      success: isSet(object.success) ? globalThis.Boolean(object.success) : false,
      fallback: isSet(object.fallback) ? globalThis.Boolean(object.fallback) : false,
      fallbackAttempts: isSet(object.fallbackAttempts) ? globalThis.Number(object.fallbackAttempts) : 0,
      errorMessage: isSet(object.errorMessage) ? globalThis.String(object.errorMessage) : undefined,
      errorCode: isSet(object.errorCode) ? globalThis.Number(object.errorCode) : undefined,
      errorReason: isSet(object.errorReason) ? globalThis.String(object.errorReason) : undefined,
    };
  },

  toJSON(message: CompletionResponseMetadata): unknown {
    const obj: any = {};
    if (message.primary !== false) {
      obj.primary = message.primary;
    }
    if (message.secondaryModelIndex !== undefined) {
      obj.secondaryModelIndex = Math.round(message.secondaryModelIndex);
    }
    if (message.provider !== '') {
      obj.provider = message.provider;
    }
    if (message.model !== '') {
      obj.model = message.model;
    }
    if (message.done !== false) {
      obj.done = message.done;
    }
    if (message.success !== false) {
      obj.success = message.success;
    }
    if (message.fallback !== false) {
      obj.fallback = message.fallback;
    }
    if (message.fallbackAttempts !== 0) {
      obj.fallbackAttempts = Math.round(message.fallbackAttempts);
    }
    if (message.errorMessage !== undefined) {
      obj.errorMessage = message.errorMessage;
    }
    if (message.errorCode !== undefined) {
      obj.errorCode = Math.round(message.errorCode);
    }
    if (message.errorReason !== undefined) {
      obj.errorReason = message.errorReason;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompletionResponseMetadata>, I>>(base?: I): CompletionResponseMetadata {
    return CompletionResponseMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompletionResponseMetadata>, I>>(object: I): CompletionResponseMetadata {
    const message = createBaseCompletionResponseMetadata();
    message.primary = object.primary ?? false;
    message.secondaryModelIndex = object.secondaryModelIndex ?? undefined;
    message.provider = object.provider ?? '';
    message.model = object.model ?? '';
    message.done = object.done ?? false;
    message.success = object.success ?? false;
    message.fallback = object.fallback ?? false;
    message.fallbackAttempts = object.fallbackAttempts ?? 0;
    message.errorMessage = object.errorMessage ?? undefined;
    message.errorCode = object.errorCode ?? undefined;
    message.errorReason = object.errorReason ?? undefined;
    return message;
  },
};

function createBaseCompletionResponseMetrics(): CompletionResponseMetrics {
  return { timeToFirstToken: undefined, tokensPerSecond: 0 };
}

export const CompletionResponseMetrics = {
  encode(message: CompletionResponseMetrics, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timeToFirstToken !== undefined) {
      writer.uint32(13).float(message.timeToFirstToken);
    }
    if (message.tokensPerSecond !== 0) {
      writer.uint32(21).float(message.tokensPerSecond);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CompletionResponseMetrics {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompletionResponseMetrics();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.timeToFirstToken = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.tokensPerSecond = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  // encodeTransform encodes a source of message objects.
  // Transform<CompletionResponseMetrics, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<CompletionResponseMetrics | CompletionResponseMetrics[]>
      | Iterable<CompletionResponseMetrics | CompletionResponseMetrics[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionResponseMetrics.encode(p).finish()];
        }
      } else {
        yield* [CompletionResponseMetrics.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, CompletionResponseMetrics>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<CompletionResponseMetrics> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [CompletionResponseMetrics.decode(p)];
        }
      } else {
        yield* [CompletionResponseMetrics.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): CompletionResponseMetrics {
    return {
      timeToFirstToken: isSet(object.timeToFirstToken) ? globalThis.Number(object.timeToFirstToken) : undefined,
      tokensPerSecond: isSet(object.tokensPerSecond) ? globalThis.Number(object.tokensPerSecond) : 0,
    };
  },

  toJSON(message: CompletionResponseMetrics): unknown {
    const obj: any = {};
    if (message.timeToFirstToken !== undefined) {
      obj.timeToFirstToken = message.timeToFirstToken;
    }
    if (message.tokensPerSecond !== 0) {
      obj.tokensPerSecond = message.tokensPerSecond;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompletionResponseMetrics>, I>>(base?: I): CompletionResponseMetrics {
    return CompletionResponseMetrics.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompletionResponseMetrics>, I>>(object: I): CompletionResponseMetrics {
    const message = createBaseCompletionResponseMetrics();
    message.timeToFirstToken = object.timeToFirstToken ?? undefined;
    message.tokensPerSecond = object.tokensPerSecond ?? 0;
    return message;
  },
};

export type CompletionServiceService = typeof CompletionServiceService;
export const CompletionServiceService = {
  create: {
    path: '/llm.chat.CompletionService/create',
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: CompletionRequest) => Buffer.from(CompletionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CompletionRequest.decode(value),
    responseSerialize: (value: CompletionResponse) => Buffer.from(CompletionResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CompletionResponse.decode(value),
  },
  getResourceProviderCount: {
    path: '/llm.chat.CompletionService/getResourceProviderCount',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetResourceProviderCountRequest) =>
      Buffer.from(GetResourceProviderCountRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetResourceProviderCountRequest.decode(value),
    responseSerialize: (value: GetResourceProviderCountResponse) =>
      Buffer.from(GetResourceProviderCountResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetResourceProviderCountResponse.decode(value),
  },
} as const;

export interface CompletionServiceServer extends UntypedServiceImplementation {
  create: handleServerStreamingCall<CompletionRequest, CompletionResponse>;
  getResourceProviderCount: handleUnaryCall<GetResourceProviderCountRequest, GetResourceProviderCountResponse>;
}

export interface CompletionServiceClient extends Client {
  create(request: CompletionRequest, options?: Partial<CallOptions>): ClientReadableStream<CompletionResponse>;
  create(
    request: CompletionRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<CompletionResponse>;
  getResourceProviderCount(
    request: GetResourceProviderCountRequest,
    callback: (error: ServiceError | null, response: GetResourceProviderCountResponse) => void,
  ): ClientUnaryCall;
  getResourceProviderCount(
    request: GetResourceProviderCountRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetResourceProviderCountResponse) => void,
  ): ClientUnaryCall;
  getResourceProviderCount(
    request: GetResourceProviderCountRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetResourceProviderCountResponse) => void,
  ): ClientUnaryCall;
}

export const CompletionServiceClient = makeGenericClientConstructor(
  CompletionServiceService,
  'llm.chat.CompletionService',
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CompletionServiceClient;
  service: typeof CompletionServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  if (long.lt(globalThis.Number.MIN_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is smaller than Number.MIN_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
