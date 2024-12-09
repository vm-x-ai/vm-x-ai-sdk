# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: vmxai_completion_client/protos/completion/completion.proto
# Protobuf Python Version: 4.25.1
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import struct_pb2 as google_dot_protobuf_dot_struct__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n:vmxai_completion_client/protos/completion/completion.proto\x12\x08llm.chat\x1a\x1cgoogle/protobuf/struct.proto\"\x8f\x01\n\x1fGetResourceProviderCountRequest\x12\x19\n\x0cworkspace_id\x18\x01 \x01(\tH\x00\x88\x01\x01\x12\x1b\n\x0e\x65nvironment_id\x18\x02 \x01(\tH\x01\x88\x01\x01\x12\x10\n\x08resource\x18\x03 \x01(\tB\x0f\n\r_workspace_idB\x11\n\x0f_environment_id\"1\n GetResourceProviderCountResponse\x12\r\n\x05\x63ount\x18\x01 \x01(\x05\"\x9c\x05\n\x11\x43ompletionRequest\x12\x19\n\x0cworkspace_id\x18\x01 \x01(\tH\x00\x88\x01\x01\x12\x1b\n\x0e\x65nvironment_id\x18\x02 \x01(\tH\x01\x88\x01\x01\x12\x14\n\x07primary\x18\x03 \x01(\x08H\x02\x88\x01\x01\x12\"\n\x15secondary_model_index\x18\x04 \x01(\x05H\x03\x88\x01\x01\x12\x10\n\x08resource\x18\x05 \x01(\t\x12\x0e\n\x06stream\x18\x06 \x01(\x08\x12*\n\x08messages\x18\x07 \x03(\x0b\x32\x18.llm.chat.RequestMessage\x12%\n\x05tools\x18\x08 \x03(\x0b\x32\x16.llm.chat.RequestTools\x12\x35\n\x0btool_choice\x18\t \x01(\x0b\x32\x1b.llm.chat.RequestToolChoiceH\x04\x88\x01\x01\x12,\n\x06\x63onfig\x18\n \x01(\x0b\x32\x17.google.protobuf.StructH\x05\x88\x01\x01\x12!\n\x14include_raw_response\x18\x0b \x01(\x08H\x06\x88\x01\x01\x12?\n\x19resource_config_overrides\x18\x0c \x01(\x0b\x32\x17.google.protobuf.StructH\x07\x88\x01\x01\x12.\n\x08metadata\x18\r \x01(\x0b\x32\x17.google.protobuf.StructH\x08\x88\x01\x01\x42\x0f\n\r_workspace_idB\x11\n\x0f_environment_idB\n\n\x08_primaryB\x18\n\x16_secondary_model_indexB\x0e\n\x0c_tool_choiceB\t\n\x07_configB\x17\n\x15_include_raw_responseB\x1c\n\x1a_resource_config_overridesB\x0b\n\t_metadata\"\xbe\x01\n\x0eRequestMessage\x12\x11\n\x04name\x18\x01 \x01(\tH\x00\x88\x01\x01\x12\x0c\n\x04role\x18\x02 \x01(\t\x12\x14\n\x07\x63ontent\x18\x03 \x01(\tH\x01\x88\x01\x01\x12\x34\n\ntool_calls\x18\x04 \x03(\x0b\x32 .llm.chat.RequestMessageToolCall\x12\x19\n\x0ctool_call_id\x18\x05 \x01(\tH\x02\x88\x01\x01\x42\x07\n\x05_nameB\n\n\x08_contentB\x0f\n\r_tool_call_id\"n\n\x16RequestMessageToolCall\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\t\x12:\n\x08\x66unction\x18\x03 \x01(\x0b\x32(.llm.chat.RequestMessageToolCallFunction\"A\n\x1eRequestMessageToolCallFunction\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x11\n\targuments\x18\x02 \x01(\t\"M\n\x0cRequestTools\x12\x0c\n\x04type\x18\x01 \x01(\t\x12/\n\x08\x66unction\x18\x02 \x01(\x0b\x32\x1d.llm.chat.RequestToolFunction\"e\n\x13RequestToolFunction\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x02 \x01(\t\x12+\n\nparameters\x18\x03 \x01(\x0b\x32\x17.google.protobuf.Struct\"l\n\x11RequestToolChoice\x12\x0e\n\x04\x61uto\x18\x01 \x01(\x08H\x00\x12\x0e\n\x04none\x18\x02 \x01(\x08H\x00\x12/\n\x04tool\x18\x03 \x01(\x0b\x32\x1f.llm.chat.RequestToolChoiceItemH\x00\x42\x06\n\x04type\"\\\n\x15RequestToolChoiceItem\x12\x0c\n\x04type\x18\x01 \x01(\t\x12\x35\n\x08\x66unction\x18\x02 \x01(\x0b\x32#.llm.chat.RequestToolChoiceFunction\")\n\x19RequestToolChoiceFunction\x12\x0c\n\x04name\x18\x01 \x01(\t\"\xe9\x03\n\x12\x43ompletionResponse\x12\n\n\x02id\x18\x01 \x01(\t\x12\x14\n\x07message\x18\x02 \x01(\tH\x00\x88\x01\x01\x12\x0c\n\x04role\x18\x03 \x01(\t\x12\x34\n\ntool_calls\x18\x04 \x03(\x0b\x32 .llm.chat.RequestMessageToolCall\x12-\n\x05usage\x18\x05 \x01(\x0b\x32\x19.llm.chat.CompletionUsageH\x01\x88\x01\x01\x12\x1f\n\x12response_timestamp\x18\x06 \x01(\x03H\x02\x88\x01\x01\x12\x36\n\x08metadata\x18\x07 \x01(\x0b\x32$.llm.chat.CompletionResponseMetadata\x12\x39\n\x07metrics\x18\x08 \x01(\x0b\x32#.llm.chat.CompletionResponseMetricsH\x03\x88\x01\x01\x12\x32\n\x0craw_response\x18\t \x01(\x0b\x32\x17.google.protobuf.StructH\x04\x88\x01\x01\x12\x1a\n\rfinish_reason\x18\n \x01(\tH\x05\x88\x01\x01\x42\n\n\x08_messageB\x08\n\x06_usageB\x15\n\x13_response_timestampB\n\n\x08_metricsB\x0f\n\r_raw_responseB\x10\n\x0e_finish_reason\"D\n\x0f\x43ompletionUsage\x12\x0e\n\x06prompt\x18\x01 \x01(\x05\x12\x12\n\ncompletion\x18\x02 \x01(\x05\x12\r\n\x05total\x18\x03 \x01(\x05\"\xda\x02\n\x1a\x43ompletionResponseMetadata\x12\x0f\n\x07primary\x18\x01 \x01(\x08\x12\"\n\x15secondary_model_index\x18\x02 \x01(\x05H\x00\x88\x01\x01\x12\x10\n\x08provider\x18\x03 \x01(\t\x12\r\n\x05model\x18\x04 \x01(\t\x12\x0c\n\x04\x64one\x18\x05 \x01(\x08\x12\x0f\n\x07success\x18\x06 \x01(\x08\x12\x10\n\x08\x66\x61llback\x18\x07 \x01(\x08\x12\x19\n\x11\x66\x61llback_attempts\x18\x08 \x01(\x05\x12\x1a\n\rerror_message\x18\t \x01(\tH\x01\x88\x01\x01\x12\x17\n\nerror_code\x18\n \x01(\x05H\x02\x88\x01\x01\x12\x19\n\x0c\x65rror_reason\x18\x0b \x01(\tH\x03\x88\x01\x01\x42\x18\n\x16_secondary_model_indexB\x10\n\x0e_error_messageB\r\n\x0b_error_codeB\x0f\n\r_error_reason\"\x94\x01\n\x19\x43ompletionResponseMetrics\x12 \n\x13time_to_first_token\x18\x01 \x01(\x02H\x00\x88\x01\x01\x12\x19\n\x11tokens_per_second\x18\x02 \x01(\x02\x12\x15\n\x08\x64uration\x18\x03 \x01(\x02H\x01\x88\x01\x01\x42\x16\n\x14_time_to_first_tokenB\x0b\n\t_duration2\xcd\x01\n\x11\x43ompletionService\x12\x45\n\x06\x63reate\x12\x1b.llm.chat.CompletionRequest\x1a\x1c.llm.chat.CompletionResponse0\x01\x12q\n\x18getResourceProviderCount\x12).llm.chat.GetResourceProviderCountRequest\x1a*.llm.chat.GetResourceProviderCountResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'vmxai_completion_client.protos.completion.completion_pb2', _globals)
if _descriptor._USE_C_DESCRIPTORS == False:
  DESCRIPTOR._options = None
  _globals['_GETRESOURCEPROVIDERCOUNTREQUEST']._serialized_start=103
  _globals['_GETRESOURCEPROVIDERCOUNTREQUEST']._serialized_end=246
  _globals['_GETRESOURCEPROVIDERCOUNTRESPONSE']._serialized_start=248
  _globals['_GETRESOURCEPROVIDERCOUNTRESPONSE']._serialized_end=297
  _globals['_COMPLETIONREQUEST']._serialized_start=300
  _globals['_COMPLETIONREQUEST']._serialized_end=968
  _globals['_REQUESTMESSAGE']._serialized_start=971
  _globals['_REQUESTMESSAGE']._serialized_end=1161
  _globals['_REQUESTMESSAGETOOLCALL']._serialized_start=1163
  _globals['_REQUESTMESSAGETOOLCALL']._serialized_end=1273
  _globals['_REQUESTMESSAGETOOLCALLFUNCTION']._serialized_start=1275
  _globals['_REQUESTMESSAGETOOLCALLFUNCTION']._serialized_end=1340
  _globals['_REQUESTTOOLS']._serialized_start=1342
  _globals['_REQUESTTOOLS']._serialized_end=1419
  _globals['_REQUESTTOOLFUNCTION']._serialized_start=1421
  _globals['_REQUESTTOOLFUNCTION']._serialized_end=1522
  _globals['_REQUESTTOOLCHOICE']._serialized_start=1524
  _globals['_REQUESTTOOLCHOICE']._serialized_end=1632
  _globals['_REQUESTTOOLCHOICEITEM']._serialized_start=1634
  _globals['_REQUESTTOOLCHOICEITEM']._serialized_end=1726
  _globals['_REQUESTTOOLCHOICEFUNCTION']._serialized_start=1728
  _globals['_REQUESTTOOLCHOICEFUNCTION']._serialized_end=1769
  _globals['_COMPLETIONRESPONSE']._serialized_start=1772
  _globals['_COMPLETIONRESPONSE']._serialized_end=2261
  _globals['_COMPLETIONUSAGE']._serialized_start=2263
  _globals['_COMPLETIONUSAGE']._serialized_end=2331
  _globals['_COMPLETIONRESPONSEMETADATA']._serialized_start=2334
  _globals['_COMPLETIONRESPONSEMETADATA']._serialized_end=2680
  _globals['_COMPLETIONRESPONSEMETRICS']._serialized_start=2683
  _globals['_COMPLETIONRESPONSEMETRICS']._serialized_end=2831
  _globals['_COMPLETIONSERVICE']._serialized_start=2834
  _globals['_COMPLETIONSERVICE']._serialized_end=3039
# @@protoc_insertion_point(module_scope)
