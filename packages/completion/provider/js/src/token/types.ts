export type TokenMessage = {
  name?: string;
  role: string;
  content: string;
  tool_calls?: TokenMessageToolCall[];
  tool_call_id?: string;
};

export type TokenMessageToolCall = {
  id: string;
  type: 'function';
  function: TokenMessageToolCallFunction;
};

export type TokenMessageToolCallFunction = {
  name: string;
  arguments: string;
};
