from dotenv import load_dotenv
import os

from langchain.agents import create_tool_calling_agent
from langchain.tools.retriever import create_retriever_tool
from langchain.agents import AgentExecutor
from langchain_astradb import AstraDBVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema import Document
from langchain_ollama import OllamaLLM

load_dotenv()

def connect_to_vstore():
    embeddings = HuggingFaceEmbeddings()
    ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
    ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
    desired_namespace = os.getenv("ASTRA_DB_KEYSPACE")

    vstore = AstraDBVectorStore(
        embedding=embeddings,
        collection_name="Doc",
        api_endpoint=ASTRA_DB_API_ENDPOINT,
        token=ASTRA_DB_APPLICATION_TOKEN,
        namespace="MedDocs",
    )
    return vstore

def query_database(query):
    # Connect to the vector store
    vstore = connect_to_vstore()

    # Set up retriever
    retriever = vstore.as_retriever(search_kwargs={"k": 3})

    # Retrieve the data based on the query
    retrieved_data = retriever.get_relevant_documents(query)

    # Combine the retrieved data (documents) into a string to pass as context
    context = "\n".join([doc.page_content for doc in retrieved_data])

    # Set up the language model (LLM)
    llm = OllamaLLM(model="llama3")

    # Format the prompt for the LLM
    prompt_template = ( 
        "You are a helpful assistant answering medical questions based on the provided context. "
        "Answer the query using the context information.\n"
        "Query: {query}\n"
        "Context: {context}" 
    )

    # Generate response directly from the LLM
    result = llm.invoke(prompt_template.format(query=query, context=context))

    return result


def add_documents_to_vstore(documents):
    print(1)
    vstore = connect_to_vstore()

    for doc_id, doc_text in documents.items():
        document = Document(
            id=doc_id,
            page_content=doc_text, 
            metadata={"author": "Unknown"} 
        )

        vstore.add_documents([document]) 
    
    print("Documents added successfully.")


# with open("sections.json", "r") as file:
#     documents = json.load(file)

# add_documents_to_vstore(documents)

print(query_database("Cure"))