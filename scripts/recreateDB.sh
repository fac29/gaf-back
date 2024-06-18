#!/bin/bash

# Define the path to the database file
DB_FILE="gaf_database.sqlite"

# Check if the file exists and delete it
if [ -f "$DB_FILE" ]; then
  echo "Deleting $DB_FILE..."
  rm "$DB_FILE"
  echo "$DB_FILE deleted."
else
  echo "$DB_FILE does not exist, no need to delete."
fi

# Run the database script
echo "Running database setup script..."
node database/db.js
if [ $? -eq 0 ]; then
  echo "Database setup script executed successfully."
else
  echo "Database setup script failed." >&2
  exit 1
fi

# Run the seed script
echo "Running database seed script..."
node database/seed.js
if [ $? -eq 0 ]; then
  echo "Database seed script executed successfully."
else
  echo "Database seed script failed." >&2
  exit 1
fi

echo "All tasks completed successfully."
