import json

def load_data_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()

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

    with open('sections.json', 'w', encoding='utf-8') as json_file:
        json.dump(sections, json_file, ensure_ascii=False, indent=4)

# def send_to_db(file):


def main(file_path):
    load_data_from_file(file_path)


if __name__ == "__main__":
    file_path = "output_filename.txt"
    main(file_path)
