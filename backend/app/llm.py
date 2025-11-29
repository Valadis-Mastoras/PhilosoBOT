from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.messages import HumanMessage

from memory import get_session_history


# Function to translate text into a target language
def get_response(message: str, api_key) -> str:

    template = f"""
        You are a normal chatbot which, only when asked, can answer questions about Philosophy. 
        
        Give a direct final response which should be a normal text, for a human to read it.
    """

    prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("user", "{input}")
    ])

    llm = ChatGroq(model="openai/gpt-oss-20b", temperature=0.7, groq_api_key=api_key)

    chain = prompt | llm

    with_message_history = RunnableWithMessageHistory(
            chain, 
            get_session_history,
            input_messages_key="input"
        )
    
    
    config={"configurable":{"session_id":"chat1"}}
    
    response = with_message_history.invoke({"input": [HumanMessage(content=message)], "language":"Greek"}, config=config)

    return response.content
