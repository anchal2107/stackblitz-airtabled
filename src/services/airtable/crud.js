const Airtable = require('airtable');
import { airtable_key, airtable_endutl } from './config';
const base = new Airtable({ apiKey: airtable_key }).base('YOUR_BASE_ID');

// Create a record
async function createRecord(table, data) {
  try {
    const createdRecord = await base(table).create(data);
    console.log('Record created:', createdRecord);
    return createdRecord;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
}

// Read records
async function readRecords(table) {
  try {
    const records = [];
    await base(table)
      .select()
      .eachPage(
        (partialRecords, fetchNextPage) => {
          records.push(...partialRecords);
          fetchNextPage();
        },
        (error) => {
          if (error) {
            console.error('Error reading records:', error);
            throw error;
          }
        }
      );
    console.log('Records retrieved:', records);
    return records;
  } catch (error) {
    console.error('Error reading records:', error);
    throw error;
  }
}

// Update a record
async function updateRecord(table, recordId, data) {
  try {
    const updatedRecord = await base(table).update(recordId, data);
    console.log('Record updated:', updatedRecord);
    return updatedRecord;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
}

// Delete a record
async function deleteRecord(table, recordId) {
  try {
    await base(table).destroy(recordId);
    console.log('Record deleted successfully');
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
}

// Usage example
// async function main() {
//   try {
//     // Create a record
//     const createdRecord = await createRecord("Your Table Name", {
//       field1: "Value 1",
//       field2: "Value 2",
//     });

//     // Read records
//     const records = await readRecords("Your Table Name");

//     // Update a record
//     const updatedRecord = await updateRecord("Your Table Name", createdRecord.id, {
//       field1: "New Value 1",
//     });

//     // Delete a record
//     await deleteRecord("Your Table Name", createdRecord.id);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// // Call the main function
// main();
