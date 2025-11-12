import json

# --------- CONFIGURE THESE ---------
INPUT_FILE = "records-4.json"      # your input JSON file name
OUTPUT_FILE = INPUT_FILE  # new file (or same file if you want to overwrite)
# ----------------------------------

def lowercase_terms():
    # Step 1: Load the JSON file
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Step 2: Loop through all items and lowercase the term
    count = 0
    for item in data.get("CloudDefinitions", []):
        put_request = item.get("PutRequest", {})
        term_item = put_request.get("Item", {}).get("term", {})
        if "S" in term_item and isinstance(term_item["S"], str):
            old_value = term_item["S"]
            new_value = old_value.lower()
            term_item["S"] = new_value
            count += 1

    # Step 3: Save the modified data to a new file
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Converted {count} term values to lowercase.")
    print(f"📁 Output written to: {OUTPUT_FILE}")

if __name__ == "__main__":
    lowercase_terms()
