/* eslint-disable */
import {
  ChannelCredentials,
  Client,
  ClientReadableStream,
  handleServerStreamingCall,
  makeGenericClientConstructor,
  Metadata,
} from '@grpc/grpc-js';
import type { CallOptions, ClientOptions, UntypedServiceImplementation } from '@grpc/grpc-js';
import Long from 'long';
import _m0 from 'protobufjs/minimal.js';
import { Struct } from '../google/protobuf/struct.js';

export const protobufPackage = 'llm.chat';

export interface RequestFunctions {
  description: string;
  name: string;
  parameters: { [key: string]: any } | undefined;
}

export interface RequestFunctionCall {
  auto?: boolean | undefined;
  none?: boolean | undefined;
  function?: RequestFunctionCallName | undefined;
}

export interface RequestFunctionCallName {
  name: string;
}

export interface RequestMessage {
  name?: string | undefined;
  role: string;
  content?: string | undefined;
  functionCall?: RequestMessageFunctionCall | undefined;
}

export interface RequestMessageFunctionCall {
  name: string;
  arguments: string;
}

export interface OpenAIRequest {
  model: string;
  frequencyPenalty?: number | undefined;
  maxTokens?: number | undefined;
  presencePenalty?: number | undefined;
  temperature?: number | undefined;
}

export interface GeminiRequest {
  model: string;
  maxOutputTokens?: number | undefined;
  temperature?: number | undefined;
}

export interface CompletionRequest {
  resource: string;
  workload: string;
  provider: string;
  stream: boolean;
  messages: RequestMessage[];
  functions: RequestFunctions[];
  functionCall?: RequestFunctionCall | undefined;
  openai?: OpenAIRequest | undefined;
  gemini?: GeminiRequest | undefined;
}

export interface CompletionResponse {
  id: string;
  message?: string | undefined;
  role: string;
  functionCall?: RequestMessageFunctionCall | undefined;
  usage?: CompletionUsage | undefined;
  responseTimestamp?: number | undefined;
}

export interface CompletionUsage {
  prompt: number;
  completion: number;
  total: number;
}

function createBaseRequestFunctions(): RequestFunctions {
  return { description: '', name: '', parameters: undefined };
}

export const RequestFunctions = {
  encode(message: RequestFunctions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== '') {
      writer.uint32(10).string(message.description);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    if (message.parameters !== undefined) {
      Struct.encode(Struct.wrap(message.parameters), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFunctions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFunctions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
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
  // Transform<RequestFunctions, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<RequestFunctions | RequestFunctions[]> | Iterable<RequestFunctions | RequestFunctions[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestFunctions.encode(p).finish()];
        }
      } else {
        yield* [RequestFunctions.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestFunctions>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestFunctions> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestFunctions.decode(p)];
        }
      } else {
        yield* [RequestFunctions.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestFunctions {
    return {
      description: isSet(object.description) ? globalThis.String(object.description) : '',
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      parameters: isObject(object.parameters) ? object.parameters : undefined,
    };
  },

  toJSON(message: RequestFunctions): unknown {
    const obj: any = {};
    if (message.description !== '') {
      obj.description = message.description;
    }
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.parameters !== undefined) {
      obj.parameters = message.parameters;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestFunctions>, I>>(base?: I): RequestFunctions {
    return RequestFunctions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestFunctions>, I>>(object: I): RequestFunctions {
    const message = createBaseRequestFunctions();
    message.description = object.description ?? '';
    message.name = object.name ?? '';
    message.parameters = object.parameters ?? undefined;
    return message;
  },
};

function createBaseRequestFunctionCall(): RequestFunctionCall {
  return { auto: undefined, none: undefined, function: undefined };
}

export const RequestFunctionCall = {
  encode(message: RequestFunctionCall, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.auto !== undefined) {
      writer.uint32(8).bool(message.auto);
    }
    if (message.none !== undefined) {
      writer.uint32(16).bool(message.none);
    }
    if (message.function !== undefined) {
      RequestFunctionCallName.encode(message.function, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFunctionCall {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFunctionCall();
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

          message.function = RequestFunctionCallName.decode(reader, reader.uint32());
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
  // Transform<RequestFunctionCall, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestFunctionCall | RequestFunctionCall[]>
      | Iterable<RequestFunctionCall | RequestFunctionCall[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestFunctionCall.encode(p).finish()];
        }
      } else {
        yield* [RequestFunctionCall.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestFunctionCall>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestFunctionCall> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestFunctionCall.decode(p)];
        }
      } else {
        yield* [RequestFunctionCall.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestFunctionCall {
    return {
      auto: isSet(object.auto) ? globalThis.Boolean(object.auto) : undefined,
      none: isSet(object.none) ? globalThis.Boolean(object.none) : undefined,
      function: isSet(object.function) ? RequestFunctionCallName.fromJSON(object.function) : undefined,
    };
  },

  toJSON(message: RequestFunctionCall): unknown {
    const obj: any = {};
    if (message.auto !== undefined) {
      obj.auto = message.auto;
    }
    if (message.none !== undefined) {
      obj.none = message.none;
    }
    if (message.function !== undefined) {
      obj.function = RequestFunctionCallName.toJSON(message.function);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestFunctionCall>, I>>(base?: I): RequestFunctionCall {
    return RequestFunctionCall.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestFunctionCall>, I>>(object: I): RequestFunctionCall {
    const message = createBaseRequestFunctionCall();
    message.auto = object.auto ?? undefined;
    message.none = object.none ?? undefined;
    message.function =
      object.function !== undefined && object.function !== null
        ? RequestFunctionCallName.fromPartial(object.function)
        : undefined;
    return message;
  },
};

function createBaseRequestFunctionCallName(): RequestFunctionCallName {
  return { name: '' };
}

export const RequestFunctionCallName = {
  encode(message: RequestFunctionCallName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestFunctionCallName {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestFunctionCallName();
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
  // Transform<RequestFunctionCallName, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestFunctionCallName | RequestFunctionCallName[]>
      | Iterable<RequestFunctionCallName | RequestFunctionCallName[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestFunctionCallName.encode(p).finish()];
        }
      } else {
        yield* [RequestFunctionCallName.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestFunctionCallName>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestFunctionCallName> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestFunctionCallName.decode(p)];
        }
      } else {
        yield* [RequestFunctionCallName.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestFunctionCallName {
    return { name: isSet(object.name) ? globalThis.String(object.name) : '' };
  },

  toJSON(message: RequestFunctionCallName): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestFunctionCallName>, I>>(base?: I): RequestFunctionCallName {
    return RequestFunctionCallName.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestFunctionCallName>, I>>(object: I): RequestFunctionCallName {
    const message = createBaseRequestFunctionCallName();
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseRequestMessage(): RequestMessage {
  return { name: undefined, role: '', content: undefined, functionCall: undefined };
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
    if (message.functionCall !== undefined) {
      RequestMessageFunctionCall.encode(message.functionCall, writer.uint32(34).fork()).ldelim();
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

          message.functionCall = RequestMessageFunctionCall.decode(reader, reader.uint32());
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
      functionCall: isSet(object.functionCall) ? RequestMessageFunctionCall.fromJSON(object.functionCall) : undefined,
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
    if (message.functionCall !== undefined) {
      obj.functionCall = RequestMessageFunctionCall.toJSON(message.functionCall);
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
    message.functionCall =
      object.functionCall !== undefined && object.functionCall !== null
        ? RequestMessageFunctionCall.fromPartial(object.functionCall)
        : undefined;
    return message;
  },
};

function createBaseRequestMessageFunctionCall(): RequestMessageFunctionCall {
  return { name: '', arguments: '' };
}

export const RequestMessageFunctionCall = {
  encode(message: RequestMessageFunctionCall, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.arguments !== '') {
      writer.uint32(18).string(message.arguments);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestMessageFunctionCall {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestMessageFunctionCall();
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
  // Transform<RequestMessageFunctionCall, Uint8Array>
  async *encodeTransform(
    source:
      | AsyncIterable<RequestMessageFunctionCall | RequestMessageFunctionCall[]>
      | Iterable<RequestMessageFunctionCall | RequestMessageFunctionCall[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessageFunctionCall.encode(p).finish()];
        }
      } else {
        yield* [RequestMessageFunctionCall.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, RequestMessageFunctionCall>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<RequestMessageFunctionCall> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [RequestMessageFunctionCall.decode(p)];
        }
      } else {
        yield* [RequestMessageFunctionCall.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): RequestMessageFunctionCall {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : '',
      arguments: isSet(object.arguments) ? globalThis.String(object.arguments) : '',
    };
  },

  toJSON(message: RequestMessageFunctionCall): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.arguments !== '') {
      obj.arguments = message.arguments;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestMessageFunctionCall>, I>>(base?: I): RequestMessageFunctionCall {
    return RequestMessageFunctionCall.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestMessageFunctionCall>, I>>(object: I): RequestMessageFunctionCall {
    const message = createBaseRequestMessageFunctionCall();
    message.name = object.name ?? '';
    message.arguments = object.arguments ?? '';
    return message;
  },
};

function createBaseOpenAIRequest(): OpenAIRequest {
  return {
    model: '',
    frequencyPenalty: undefined,
    maxTokens: undefined,
    presencePenalty: undefined,
    temperature: undefined,
  };
}

export const OpenAIRequest = {
  encode(message: OpenAIRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.model !== '') {
      writer.uint32(10).string(message.model);
    }
    if (message.frequencyPenalty !== undefined) {
      writer.uint32(21).float(message.frequencyPenalty);
    }
    if (message.maxTokens !== undefined) {
      writer.uint32(24).int32(message.maxTokens);
    }
    if (message.presencePenalty !== undefined) {
      writer.uint32(37).float(message.presencePenalty);
    }
    if (message.temperature !== undefined) {
      writer.uint32(53).float(message.temperature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OpenAIRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOpenAIRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.model = reader.string();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.frequencyPenalty = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxTokens = reader.int32();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.presencePenalty = reader.float();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }

          message.temperature = reader.float();
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
  // Transform<OpenAIRequest, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<OpenAIRequest | OpenAIRequest[]> | Iterable<OpenAIRequest | OpenAIRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [OpenAIRequest.encode(p).finish()];
        }
      } else {
        yield* [OpenAIRequest.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, OpenAIRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<OpenAIRequest> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [OpenAIRequest.decode(p)];
        }
      } else {
        yield* [OpenAIRequest.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): OpenAIRequest {
    return {
      model: isSet(object.model) ? globalThis.String(object.model) : '',
      frequencyPenalty: isSet(object.frequencyPenalty) ? globalThis.Number(object.frequencyPenalty) : undefined,
      maxTokens: isSet(object.maxTokens) ? globalThis.Number(object.maxTokens) : undefined,
      presencePenalty: isSet(object.presencePenalty) ? globalThis.Number(object.presencePenalty) : undefined,
      temperature: isSet(object.temperature) ? globalThis.Number(object.temperature) : undefined,
    };
  },

  toJSON(message: OpenAIRequest): unknown {
    const obj: any = {};
    if (message.model !== '') {
      obj.model = message.model;
    }
    if (message.frequencyPenalty !== undefined) {
      obj.frequencyPenalty = message.frequencyPenalty;
    }
    if (message.maxTokens !== undefined) {
      obj.maxTokens = Math.round(message.maxTokens);
    }
    if (message.presencePenalty !== undefined) {
      obj.presencePenalty = message.presencePenalty;
    }
    if (message.temperature !== undefined) {
      obj.temperature = message.temperature;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OpenAIRequest>, I>>(base?: I): OpenAIRequest {
    return OpenAIRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OpenAIRequest>, I>>(object: I): OpenAIRequest {
    const message = createBaseOpenAIRequest();
    message.model = object.model ?? '';
    message.frequencyPenalty = object.frequencyPenalty ?? undefined;
    message.maxTokens = object.maxTokens ?? undefined;
    message.presencePenalty = object.presencePenalty ?? undefined;
    message.temperature = object.temperature ?? undefined;
    return message;
  },
};

function createBaseGeminiRequest(): GeminiRequest {
  return { model: '', maxOutputTokens: undefined, temperature: undefined };
}

export const GeminiRequest = {
  encode(message: GeminiRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.model !== '') {
      writer.uint32(10).string(message.model);
    }
    if (message.maxOutputTokens !== undefined) {
      writer.uint32(16).int32(message.maxOutputTokens);
    }
    if (message.temperature !== undefined) {
      writer.uint32(29).float(message.temperature);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GeminiRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGeminiRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.model = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.maxOutputTokens = reader.int32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.temperature = reader.float();
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
  // Transform<GeminiRequest, Uint8Array>
  async *encodeTransform(
    source: AsyncIterable<GeminiRequest | GeminiRequest[]> | Iterable<GeminiRequest | GeminiRequest[]>,
  ): AsyncIterable<Uint8Array> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [GeminiRequest.encode(p).finish()];
        }
      } else {
        yield* [GeminiRequest.encode(pkt as any).finish()];
      }
    }
  },

  // decodeTransform decodes a source of encoded messages.
  // Transform<Uint8Array, GeminiRequest>
  async *decodeTransform(
    source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>,
  ): AsyncIterable<GeminiRequest> {
    for await (const pkt of source) {
      if (globalThis.Array.isArray(pkt)) {
        for (const p of pkt as any) {
          yield* [GeminiRequest.decode(p)];
        }
      } else {
        yield* [GeminiRequest.decode(pkt as any)];
      }
    }
  },

  fromJSON(object: any): GeminiRequest {
    return {
      model: isSet(object.model) ? globalThis.String(object.model) : '',
      maxOutputTokens: isSet(object.maxOutputTokens) ? globalThis.Number(object.maxOutputTokens) : undefined,
      temperature: isSet(object.temperature) ? globalThis.Number(object.temperature) : undefined,
    };
  },

  toJSON(message: GeminiRequest): unknown {
    const obj: any = {};
    if (message.model !== '') {
      obj.model = message.model;
    }
    if (message.maxOutputTokens !== undefined) {
      obj.maxOutputTokens = Math.round(message.maxOutputTokens);
    }
    if (message.temperature !== undefined) {
      obj.temperature = message.temperature;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GeminiRequest>, I>>(base?: I): GeminiRequest {
    return GeminiRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GeminiRequest>, I>>(object: I): GeminiRequest {
    const message = createBaseGeminiRequest();
    message.model = object.model ?? '';
    message.maxOutputTokens = object.maxOutputTokens ?? undefined;
    message.temperature = object.temperature ?? undefined;
    return message;
  },
};

function createBaseCompletionRequest(): CompletionRequest {
  return {
    resource: '',
    workload: '',
    provider: '',
    stream: false,
    messages: [],
    functions: [],
    functionCall: undefined,
    openai: undefined,
    gemini: undefined,
  };
}

export const CompletionRequest = {
  encode(message: CompletionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.resource !== '') {
      writer.uint32(10).string(message.resource);
    }
    if (message.workload !== '') {
      writer.uint32(18).string(message.workload);
    }
    if (message.provider !== '') {
      writer.uint32(26).string(message.provider);
    }
    if (message.stream === true) {
      writer.uint32(32).bool(message.stream);
    }
    for (const v of message.messages) {
      RequestMessage.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.functions) {
      RequestFunctions.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    if (message.functionCall !== undefined) {
      RequestFunctionCall.encode(message.functionCall, writer.uint32(58).fork()).ldelim();
    }
    if (message.openai !== undefined) {
      OpenAIRequest.encode(message.openai, writer.uint32(66).fork()).ldelim();
    }
    if (message.gemini !== undefined) {
      GeminiRequest.encode(message.gemini, writer.uint32(74).fork()).ldelim();
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

          message.resource = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.workload = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.provider = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.stream = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.messages.push(RequestMessage.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.functions.push(RequestFunctions.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.functionCall = RequestFunctionCall.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.openai = OpenAIRequest.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.gemini = GeminiRequest.decode(reader, reader.uint32());
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
      resource: isSet(object.resource) ? globalThis.String(object.resource) : '',
      workload: isSet(object.workload) ? globalThis.String(object.workload) : '',
      provider: isSet(object.provider) ? globalThis.String(object.provider) : '',
      stream: isSet(object.stream) ? globalThis.Boolean(object.stream) : false,
      messages: globalThis.Array.isArray(object?.messages)
        ? object.messages.map((e: any) => RequestMessage.fromJSON(e))
        : [],
      functions: globalThis.Array.isArray(object?.functions)
        ? object.functions.map((e: any) => RequestFunctions.fromJSON(e))
        : [],
      functionCall: isSet(object.functionCall) ? RequestFunctionCall.fromJSON(object.functionCall) : undefined,
      openai: isSet(object.openai) ? OpenAIRequest.fromJSON(object.openai) : undefined,
      gemini: isSet(object.gemini) ? GeminiRequest.fromJSON(object.gemini) : undefined,
    };
  },

  toJSON(message: CompletionRequest): unknown {
    const obj: any = {};
    if (message.resource !== '') {
      obj.resource = message.resource;
    }
    if (message.workload !== '') {
      obj.workload = message.workload;
    }
    if (message.provider !== '') {
      obj.provider = message.provider;
    }
    if (message.stream === true) {
      obj.stream = message.stream;
    }
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => RequestMessage.toJSON(e));
    }
    if (message.functions?.length) {
      obj.functions = message.functions.map((e) => RequestFunctions.toJSON(e));
    }
    if (message.functionCall !== undefined) {
      obj.functionCall = RequestFunctionCall.toJSON(message.functionCall);
    }
    if (message.openai !== undefined) {
      obj.openai = OpenAIRequest.toJSON(message.openai);
    }
    if (message.gemini !== undefined) {
      obj.gemini = GeminiRequest.toJSON(message.gemini);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CompletionRequest>, I>>(base?: I): CompletionRequest {
    return CompletionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompletionRequest>, I>>(object: I): CompletionRequest {
    const message = createBaseCompletionRequest();
    message.resource = object.resource ?? '';
    message.workload = object.workload ?? '';
    message.provider = object.provider ?? '';
    message.stream = object.stream ?? false;
    message.messages = object.messages?.map((e) => RequestMessage.fromPartial(e)) || [];
    message.functions = object.functions?.map((e) => RequestFunctions.fromPartial(e)) || [];
    message.functionCall =
      object.functionCall !== undefined && object.functionCall !== null
        ? RequestFunctionCall.fromPartial(object.functionCall)
        : undefined;
    message.openai =
      object.openai !== undefined && object.openai !== null ? OpenAIRequest.fromPartial(object.openai) : undefined;
    message.gemini =
      object.gemini !== undefined && object.gemini !== null ? GeminiRequest.fromPartial(object.gemini) : undefined;
    return message;
  },
};

function createBaseCompletionResponse(): CompletionResponse {
  return {
    id: '',
    message: undefined,
    role: '',
    functionCall: undefined,
    usage: undefined,
    responseTimestamp: undefined,
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
    if (message.functionCall !== undefined) {
      RequestMessageFunctionCall.encode(message.functionCall, writer.uint32(34).fork()).ldelim();
    }
    if (message.usage !== undefined) {
      CompletionUsage.encode(message.usage, writer.uint32(42).fork()).ldelim();
    }
    if (message.responseTimestamp !== undefined) {
      writer.uint32(48).int64(message.responseTimestamp);
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

          message.functionCall = RequestMessageFunctionCall.decode(reader, reader.uint32());
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
      functionCall: isSet(object.functionCall) ? RequestMessageFunctionCall.fromJSON(object.functionCall) : undefined,
      usage: isSet(object.usage) ? CompletionUsage.fromJSON(object.usage) : undefined,
      responseTimestamp: isSet(object.responseTimestamp) ? globalThis.Number(object.responseTimestamp) : undefined,
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
    if (message.functionCall !== undefined) {
      obj.functionCall = RequestMessageFunctionCall.toJSON(message.functionCall);
    }
    if (message.usage !== undefined) {
      obj.usage = CompletionUsage.toJSON(message.usage);
    }
    if (message.responseTimestamp !== undefined) {
      obj.responseTimestamp = Math.round(message.responseTimestamp);
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
    message.functionCall =
      object.functionCall !== undefined && object.functionCall !== null
        ? RequestMessageFunctionCall.fromPartial(object.functionCall)
        : undefined;
    message.usage =
      object.usage !== undefined && object.usage !== null ? CompletionUsage.fromPartial(object.usage) : undefined;
    message.responseTimestamp = object.responseTimestamp ?? undefined;
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
} as const;

export interface CompletionServiceServer extends UntypedServiceImplementation {
  create: handleServerStreamingCall<CompletionRequest, CompletionResponse>;
}

export interface CompletionServiceClient extends Client {
  create(request: CompletionRequest, options?: Partial<CallOptions>): ClientReadableStream<CompletionResponse>;
  create(
    request: CompletionRequest,
    metadata?: Metadata,
    options?: Partial<CallOptions>,
  ): ClientReadableStream<CompletionResponse>;
}

export const CompletionServiceClient = makeGenericClientConstructor(
  CompletionServiceService,
  'llm.chat.CompletionService',
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): CompletionServiceClient;
  service: typeof CompletionServiceService;
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
