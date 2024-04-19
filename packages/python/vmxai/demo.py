from vmxai import CompletionRequest, OpenAIRequest, RequestMessage, VMXClient, VMXClientOAuth

client = VMXClient(
    workspace_id="ws-bee717f1-85a1-44ae-8ae2-b71877a865b7",
    environment_id="env-b6e43a32-7db3-40f5-94ef-66d004f7b032",
    domain="env-b6e43a32-7db3-40f5-94ef-66d004f7b032.clnt.dev.vm-x.ai",
    auth=VMXClientOAuth(
        client_id="1p9rqus4oh1s6oild19eir960n", client_secret="155k3aa259mtro5j4pqsmfcih4cha5kmrk2150sbbtlu2l0njoqv"
    ),
)

result = client.completion(
    CompletionRequest(
        provider="openai",
        resource="resource1-openai-gpt-3-5-turbo",
        workload="high1",
        messages=[RequestMessage(role="user", content="hey")],
        functions=[],
        openai=OpenAIRequest(model="gpt-3.5-turbo"),
    ),
    stream=True,
)

for message in result:
    print(message.message)
