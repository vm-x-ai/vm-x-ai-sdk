from langchain_vmxai import ChatVMX

llm = ChatVMX(
    resource="default",
)

messages = [
    (
        "system",
        "You are a helpful translator. Translate the user sentence to French.",
    ),
    ("human", "I love programming."),
]
result = llm.invoke(messages)

print(result)
