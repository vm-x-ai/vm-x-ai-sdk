from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_vmxai import ChatVMX
from langchain_vmxai.output_parsers.tools import PydanticToolsParser


# Note that the docstrings here are crucial, as they will be passed along
# to the model along with the class name.
class add(BaseModel):
    """Add two integers together."""

    a: int = Field(..., description="First integer")
    b: int = Field(..., description="Second integer")


class multiply(BaseModel):
    """Multiply two integers together."""

    a: int = Field(..., description="First integer")
    b: int = Field(..., description="Second integer")


tools = [add, multiply]

llm = ChatVMX(
    resource="default",
)

llm_with_tools = llm.bind_tools(tools) | PydanticToolsParser(tools=[multiply, add])

query = "What is 3 * 12? Also, what is 11 + 49?"

for chunk in llm_with_tools.stream(query):
    print(chunk)
