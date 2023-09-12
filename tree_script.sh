#!/bin/bash

tmp_file="temp.txt"

ignored_files=(".DS_Store" "secrets.json" "README.md" "node_modules" "output.txt" "temp.txt" "tree_script.sh" "package-lock.json" "ignored_files" ".git" ".env" ".gitignore")

ignore_pattern=$(IFS='|'; echo "${ignored_files[*]}")

echo "## Structure of the project" > "$tmp_file"

tree -I "$ignore_pattern" >> "$tmp_file"

file_paths=()
while IFS= read -r line; do
  # Pattern matching fixes (ensure we are not looking for string within word)
  if [[ ! -d "$line" && ! " ${ignored_files[*]} " =~ " $line " ]]; then
    file_paths+=("$line")
  fi
done <<< "$(tree -I "$ignore_pattern" -a -if --noreport)"

echo -e "\n## Project code:" >> "$tmp_file"

for file in "${file_paths[@]}"; do
  echo "**$file**" >> "$tmp_file"
  echo '```' >> "$tmp_file"
  cat "$file" >> "$tmp_file"
  echo >> "$tmp_file"
  echo '```' >> "$tmp_file"
  echo >> "$tmp_file"
done 

mv "$tmp_file" "output.txt"




