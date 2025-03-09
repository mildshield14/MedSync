import requests
from xml.etree import ElementTree as ET
import re

def get_doc_content(keywords):
    base_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/'

    # ESearch to retrieve query info
    esearch_url = f"{base_url}esearch.fcgi?db=pubmed&term={keywords}&usehistory=y"
    esearch_response = requests.get(esearch_url)
    esearch_data = esearch_response.text

    # Extract WebEnv and QueryKey
    webenv = ET.fromstring(esearch_data).find(".//WebEnv").text
    query_key = ET.fromstring(esearch_data).find(".//QueryKey").text

    # EFetch to retrieve full document content
    efetch_url = f"{base_url}efetch.fcgi?db=pubmed&query_key={query_key}&WebEnv={webenv}&rettype=abstract&retmode=text"
    efetch_response = requests.get(efetch_url)
    documents = re.split(r'(\d+\.)', efetch_response.text)[1:]
    with open("output_filename.txt", "w") as file:
        file.write(str(efetch_response.text))
    print(efetch_response.text)

# Example usage
keywords = "asthma[mesh]+AND+leukotrienes[mesh]+AND+2009[pdat]"
get_doc_content(keywords)
