/* eslint-disable */
import {
  type CallOptions,
  ChannelCredentials,
  Client,
  type ClientOptions,
  ClientReadableStream,
  handleServerStreamingCall,
  makeGenericClientConstructor,
  Metadata,
  type UntypedServiceImplementation,
} from '@grpc/grpc-js';
import Long from 'long';
import _m0 from 'protobufjs/minimal.js';
import { Struct } from '../google/protobuf/struct';

export const protobufPackage = 'llm.chat';

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

export interface CompletionRequest {
  resource: string;
  workload: string;
  stream: boolean;
  messages: RequestMessage[];
  tools: RequestTools[];
  toolChoice?: RequestToolChoice | undefined;
  config?: { [key: string]: any } | undefined;
}

export interface CompletionResponse {
  id: string;
  message?: string | undefined;
  role: string;
  toolCalls: RequestMessageToolCall[];
  usage?: CompletionUsage | undefined;
  responseTimestamp?: number | undefined;
}

export interface CompletionUsage {
  prompt: number;
  completion: number;
  total: number;
}

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

function createBaseCompletionRequest(): CompletionRequest {
  return {
    resource: '',
    workload: '',
    stream: false,
    messages: [],
    tools: [],
    toolChoice: undefined,
    config: undefined,
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
    if (message.stream !== false) {
      writer.uint32(24).bool(message.stream);
    }
    for (const v of message.messages) {
      RequestMessage.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.tools) {
      RequestTools.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.toolChoice !== undefined) {
      RequestToolChoice.encode(message.toolChoice, writer.uint32(50).fork()).ldelim();
    }
    if (message.config !== undefined) {
      Struct.encode(Struct.wrap(message.config), writer.uint32(58).fork()).ldelim();
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
          if (tag !== 24) {
            break;
          }

          message.stream = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.messages.push(RequestMessage.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.tools.push(RequestTools.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.toolChoice = RequestToolChoice.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.config = Struct.unwrap(Struct.decode(reader, reader.uint32()));
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
      stream: isSet(object.stream) ? globalThis.Boolean(object.stream) : false,
      messages: globalThis.Array.isArray(object?.messages)
        ? object.messages.map((e: any) => RequestMessage.fromJSON(e))
        : [],
      tools: globalThis.Array.isArray(object?.tools) ? object.tools.map((e: any) => RequestTools.fromJSON(e)) : [],
      toolChoice: isSet(object.toolChoice) ? RequestToolChoice.fromJSON(object.toolChoice) : undefined,
      config: isObject(object.config) ? object.config : undefined,
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
    return obj;
  },

  create<I extends Exact<DeepPartial<CompletionRequest>, I>>(base?: I): CompletionRequest {
    return CompletionRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CompletionRequest>, I>>(object: I): CompletionRequest {
    const message = createBaseCompletionRequest();
    message.resource = object.resource ?? '';
    message.workload = object.workload ?? '';
    message.stream = object.stream ?? false;
    message.messages = object.messages?.map((e) => RequestMessage.fromPartial(e)) || [];
    message.tools = object.tools?.map((e) => RequestTools.fromPartial(e)) || [];
    message.toolChoice =
      object.toolChoice !== undefined && object.toolChoice !== null
        ? RequestToolChoice.fromPartial(object.toolChoice)
        : undefined;
    message.config = object.config ?? undefined;
    return message;
  },
};

function createBaseCompletionResponse(): CompletionResponse {
  return { id: '', message: undefined, role: '', toolCalls: [], usage: undefined, responseTimestamp: undefined };
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
