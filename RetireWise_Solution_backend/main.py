from dotenv import load_dotenv
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import WebBaseLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores.chroma import Chroma
from langchain.schema import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from process import check_best_match, filter_portfolio_json
import json


def get_chat(question, risk_factor):
    load_dotenv()
    file_path = "data.json"
    with open(file_path, 'r') as file:
        old_data = json.load(file)

    persist_directory = 'db'
    vectorstore = Chroma(persist_directory=persist_directory, embedding_function=OpenAIEmbeddings())

    template = """
    Use the context given below for suggesting the traits for a good investment plan based on the goals and risk taking profile.
    If you don't know the answer, just say that you don't know. Do not direcly suggest a plan instead only give 
    Use three sentences maximum and keep the answer as concise as possible.
    Always say "thanks for asking!" at the end of the answer.
    {context}
    Goal and risk: {question}
    Helpful Answer:
    """
    rag_prompt = PromptTemplate.from_template(template=template)
    retriever = vectorstore.as_retriever()

    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | rag_prompt
        | llm
        | StrOutputParser()
    )
    print("Now Asking the question - ")
    output = []
    risk_text = ""
    if risk_factor > 62:
        risk_text = "High Risk Aggressive Scheme"
    elif risk_factor > 42:
        risk_text = "Moderate Risk Balanced Scheme"
    else:
        risk_text = "Low Risk Conservative Scheme"

    chat_output = rag_chain.invoke(f"{question} {risk_text}")
    output.append(chat_output)
    three_suggestion = vectorstore.similarity_search_with_relevance_scores(chat_output, k=3)
    for suggestion in three_suggestion:
        portfolio = check_best_match(suggestion[0].page_content, filter_portfolio_json(old_data))
        output.append(portfolio)
    return output
