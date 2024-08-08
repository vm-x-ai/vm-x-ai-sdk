from vmxai_langchain import ChatVMX

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

for chunk in llm.stream(messages):
    print(chunk.content, end="", flush=True)
