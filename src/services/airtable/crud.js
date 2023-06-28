const Airtable = require('airtable');
import { airtable_key, airtable_endutl } from './config';
const YOUR_BASE_ID ='appJbmgqjRnOBPg2d'
const API_KEY ='keyOg6Kc4yKqjdVBQ'
const TOKEN_ID='patYQGCEh3dRxylt6.df0bdb51183f3997b511125793ec775a7211f9b8fed0c27ee740cbcae193c7a5'
// Airtable.configure({ apiKey: airtable_key })
const base = new Airtable({ apiKey: API_KEY }).base(YOUR_BASE_ID);
// const base = new Airtable({endpointUrl: 'https://api-airtable-com-8hw7i1oz63iz.runscope.net/'})
// Create a record
async function createRecord(table, data) {
  try {
    // const createdRecord = await base(table).create(data);
        // return createdRecord;
const resultExits = await checkRecord(table, data)
if(!resultExits && resultExits !== undefined){
   const result = await  base(table).create(data)
   console.error(result);
  } 
}catch (error) {
  console.error('Error creating record:', error);
  throw error;
}
}

function formatDataToFilter(data) {
  const filterClauses = Object.entries(data).map(([field, value]) => `{${field}} = "${value}"`);
  return filterClauses.join(' AND ');
}
function createFilterFormula(data) {
  const filterConditions = Object.entries(data).map(([field, value]) => {
    return `{${field}} = "${value}"`;
  });
  
  const filterFormula = `AND(${filterConditions.join(', ')})`;
  
  return filterFormula;
}

// check if recored exist
// check if record exists
async function checkRecord(table, data) {
  try {
    const filterData = createFilterFormula(data);

    const records = await base(table).select({
      maxRecords: 1,
      filterByFormula: filterData,
    }).firstPage();

    if (records.length > 0) {
      // Record already exists
      console.log('Record already exists:', records[0].getId());
      return true;
    } else {
      // Record does not exist
      console.log('Record does not exist');
      return false;
    }
  } catch (error) {
    console.error('Error checking record:', error);
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
export {
  createRecord,
  readRecords,
  updateRecord,
  deleteRecord,
};  

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
