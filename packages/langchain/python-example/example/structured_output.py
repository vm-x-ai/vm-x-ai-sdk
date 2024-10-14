from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_vmxai import ChatVMX


class Joke(BaseModel):
    setup: str = Field(description="The setup of the joke")
    punchline: str = Field(description="The punchline to the joke")


llm = ChatVMX(resource="default")
structured_llm = llm.with_structured_output(Joke, strict=True)

print(structured_llm.invoke("Tell me a joke about cats"))
