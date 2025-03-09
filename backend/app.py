from flask import Flask, request, jsonify
import os
from chat import query_database, add_documents_to_vstore
from fetch import get_doc_content


app = Flask(__name__)

project_root = os.path.abspath(os.path.dirname(__file__))

@app.route('/')
def home():
    return "/"

@app.route('update_db', methods=['POST'])
def update_vetor_db():
    try:
        form_data = request.form
        keywords = form_data["keywords"]
        doc_dict = get_doc_content(keywords)
        is_success = add_documents_to_vstore(doc_dict)

        if is_success:
            return jsonify({"message": "Documents added successfully!"}), 200
        else:
            return jsonify({"message": "Failed to add documents."}), 500

    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 500

    
@app.route('query_db', methods=['POST'])
def query_db():
    try:
        form_data = request.form
        keywords = form_data["query"]
        
        result = query_database(keywords)
        
        if result:
            return jsonify({"message": result}), 200
        else:
            return jsonify({"message": "No results found for your query."}), 404

    except Exception as e:
        return jsonify({"message": "I'm sorry, there was an issue processing your request. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True)


