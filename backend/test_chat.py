# from support_chat import emotional_support_chat

# if __name__ == "__main__":
#     print("💬 Wellness AI Chatbot (Mistral → Zephyr fallback)")
#     print("Type 'quit' to exit.\n")

#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ["quit", "exit"]:
#             break
#         ai_response = emotional_support_chat(user_input)
#         print("AI:", ai_response)

#2
from support_chat import emotional_support_chat

if __name__ == "__main__":
    print("💬 Wellness AI Chatbot (Gemini + DB)")
    print("Type 'quit' to exit.\n")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit", "exit"]:
            break
        ai_response = emotional_support_chat(user_input, employee_id="1")
        print("AI:", ai_response)
