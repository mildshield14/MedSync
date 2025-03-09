import requests
import re
import json
import os
from xml.etree import ElementTree
from dotenv import load_dotenv

load_dotenv()

NCBI_API_KEY = os.getenv("NCBI_API_KEY")

def extract_webenv_querykey(response_content):
    response_str = response_content.decode('utf-8')
    
    web = re.search(r'<WebEnv>(\S+)</WebEnv>', response_str)
    key = re.search(r'<QueryKey>(\d+)</QueryKey>', response_str)
    
    if web and key:
        return web.group(1), key.group(1)
    return None, None

def fetch_summary(base_url, db, webenv, querykey, retmax=5):
    esummary_url = f"{base_url}esummary.fcgi?db={db}&api_key={NCBI_API_KEY}&query_key={querykey}&WebEnv={webenv}&retmax={retmax}"
    response = requests.get(esummary_url)
    return response.content

def parse_summary(xml_content):
    tree = ElementTree.fromstring(xml_content)
    documents = []

    for docsum in tree.findall('.//DocSum'):
        document = {}

        doc_id = docsum.find('Id').text if docsum.find('Id') is not None else None
        document['Id'] = doc_id
        
        for item in docsum.findall('Item'):
            name = item.get('Name')
            value = item.text
            document[name] = value
        
        documents.append(document)
    
    return documents

def fetch_pubmed_document_complete(pubmed_id):
    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"
    
    efetch_url = f"{base_url}efetch.fcgi"
    params = {
        "db": "pubmed",
        "id": pubmed_id,
        "retmode": "xml"
    }
    
    response = requests.get(efetch_url, params=params)
    
    if response.status_code != 200:
        return f"Error: {response.status_code} - {response.reason}"
    
    xml_content = response.text
    root = ElementTree.fromstring(xml_content)
    
    document = {}
    
    article_element = root.find('.//PubmedArticle')
    
    if article_element is None:
        return "No article found with this ID"
    
    article = article_element.find('.//Article')
    if article is not None:
        title_element = article.find('.//ArticleTitle')
        if title_element is not None:
            document['title'] = title_element.text
        
        abstract_element = article.find('.//Abstract')
        if abstract_element is not None:
            abstract_texts = abstract_element.findall('.//AbstractText')
            if abstract_texts:
                abstract_parts = []
                for abstract_text in abstract_texts:
                    label = abstract_text.get('Label')
                    if label:
                        abstract_parts.append(f"{label}: {abstract_text.text}")
                    else:
                        abstract_parts.append(abstract_text.text)
                document['abstract'] = "\n\n".join([part for part in abstract_parts if part])
        
        author_list = article.find('.//AuthorList')
        if author_list is not None:
            authors = []
            for author in author_list.findall('.//Author'):
                last_name = author.find('.//LastName')
                fore_name = author.find('.//ForeName')
                
                author_name = []
                if last_name is not None and last_name.text:
                    author_name.append(last_name.text)
                if fore_name is not None and fore_name.text:
                    author_name.append(fore_name.text)
                
                if author_name:
                    authors.append(" ".join(author_name))
            
            document['authors'] = ", ".join(authors)
        
        journal = article.find('.//Journal')
        if journal is not None:
            journal_info = {}
            
            journal_title = journal.find('.//Title')
            if journal_title is not None:
                journal_info['title'] = journal_title.text
            
            journal_issue = journal.find('.//JournalIssue')
            if journal_issue is not None:
                volume = journal_issue.find('.//Volume')
                if volume is not None:
                    journal_info['volume'] = volume.text
                
                issue = journal_issue.find('.//Issue')
                if issue is not None:
                    journal_info['issue'] = issue.text
                
                pub_date = journal_issue.find('.//PubDate')
                if pub_date is not None:
                    year = pub_date.find('.//Year')
                    month = pub_date.find('.//Month')
                    day = pub_date.find('.//Day')
                    
                    date_parts = []
                    if year is not None and year.text:
                        date_parts.append(year.text)
                    if month is not None and month.text:
                        date_parts.append(month.text)
                    if day is not None and day.text:
                        date_parts.append(day.text)
                    
                    if date_parts:
                        journal_info['pub_date'] = " ".join(date_parts)
            
            document['journal'] = journal_info
    
    article_id_list = article_element.findall('.//ArticleId')
    for article_id in article_id_list:
        if article_id.get('IdType') == 'doi':
            document['doi'] = article_id.text
    
    pmc_id = None
    for article_id in article_id_list:
        if article_id.get('IdType') == 'pmc':
            pmc_id = article_id.text.replace('PMC', '')
            document['pmc_id'] = pmc_id
    
    if pmc_id:
        pmc_url = f"{base_url}efetch.fcgi"
        pmc_params = {
            "db": "pmc",
            "id": pmc_id,
            "retmode": "xml"
        }
        
        pmc_response = requests.get(pmc_url, pmc_params)
        
        if pmc_response.status_code == 200:
            document['full_text_available'] = True
    
    return document

def fetch_docs(keywords="Cure"):
    db = "pubmed"
    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"

    esearch_url = f"{base_url}esearch.fcgi?db={db}&api_key={NCBI_API_KEY}&term={keywords}&usehistory=y&retmax=5"
    
    response = requests.get(esearch_url)
    
    if response.status_code == 200:
        webenv, querykey = extract_webenv_querykey(response.content)
        
        if webenv and querykey:
            docsums = fetch_summary(base_url, db, webenv, querykey, retmax=5)
            
            summaries = parse_summary(docsums)

            document_summaries = []

            for doc in summaries:
                document = fetch_pubmed_document_complete(doc["Id"])
                if isinstance(document, dict):
                    document_summary = {
                        "Title": document.get('title', 'Not available'),
                        "Authors": document.get('authors', 'Not available'),
                        "Journal Information": document.get('journal', {}),
                        "DOI": document.get('doi', 'Not available'),
                        "Abstract": document.get('abstract', 'Abstract not available'),
                        "FullTextAvailable": document.get('full_text_available', False)
                    }
                    document_summaries.append(document_summary)
                else:
                    document_summaries.append({"Error": str(document)})

            with open('document_summaries.json', 'w') as json_file:
                json.dump(document_summaries, json_file, indent=4)

            print("Document summaries written to 'document_summaries.json'.")
        else:
            print("Error: Failed to extract WebEnv and QueryKey.")
    else:
        print(f"Error fetching search results: {response.status_code}")

if __name__ == "__main__":
    fetch_docs("Tylenol")
