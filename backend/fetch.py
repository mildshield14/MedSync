import requests
from xml.etree import ElementTree as ET
import urllib.parse

def create_url_part(*keywords):
    formatted_keywords = '+AND+'.join([urllib.parse.quote(keyword) for keyword in keywords])
    
    return formatted_keywords

def get_doc_content(keywords):
    keywords_url = create_url_part(keywords)
    base_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'

    esearch_url = f"{base_url}esearch.fcgi?db=pubmed&term={keywords_url}&usehistory=y"
    esearch_response = requests.get(esearch_url)
    esearch_data = esearch_response.text

    webenv = ET.fromstring(esearch_data).find(".//WebEnv").text
    query_key = ET.fromstring(esearch_data).find(".//QueryKey").text

    efetch_url = f"{base_url}efetch.fcgi?db=pubmed&query_key={query_key}&WebEnv={webenv}&rettype=abstract&retmode=text"
    efetch_response = requests.get(efetch_url)
    text = str(efetch_response.text)
    sections = {}
    start = 0
    i = 0
    while True:
        position_start = text.find("Author information", start)
        position_end = text.find("PMID", position_start)

        if position_start == -1 or position_end == -1:
            break

        content = text[position_start:position_end]

        sections[f"{i}"] = content

        start = position_end
        i += 1 

    return sections


def main():
    keywords = ["asthma", "leukotrienes", "2009"]
    docs = get_doc_content(keywords)
    print(docs)

if __name__ == "__main__":
    main()