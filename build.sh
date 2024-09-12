#!/bin/bash

# Define the source file and destination files
SOURCE_FILE="build/cm.css"
WEBAPP_FILE="build/cm_webapp.css"
PORTAL_FILE="build/cm_portal.css"

# Function to perform copy and replacements
process_file() {
    local dest_file=$1
    
    # Copy the source file to the destination
    cp "$SOURCE_FILE" "$dest_file"
    echo "File copied successfully: $SOURCE_FILE -> $dest_file"
    
    # Perform the text replacements using sed
    sed -i '' 's/--title-text-weight: var(--title-rethink-sans-weight);/--title-text-weight: var(--title-neue-haas-weight);/' "$dest_file"
    sed -i '' 's/--primary-button-weight: var(--primary-button-rethink-sans-weight);/--primary-button-weight: var(--primary-button-neue-haas-weight);/' "$dest_file"
    
    echo "Text replacements completed in $dest_file."
}

# Check if the source file exists
if [[ -f "$SOURCE_FILE" ]]; then
    # Process both destination files
    process_file "$WEBAPP_FILE"
    process_file "$PORTAL_FILE"
else
    # Print an error message if the source file does not exist
    echo "Error: Source file '$SOURCE_FILE' does not exist."
    exit 1
fi

