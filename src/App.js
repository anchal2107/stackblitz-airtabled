import React from 'react';
import './style.css';
import { createRecord } from './services/airtable/crud.js';
const createAirTable = async () => {
  const createdRecord = await createRecord('Your Table Name', {
    field1: 'Value 1',
    field2: 'Value 2',
  });
};
export default function App() {
  return (
    <div>
      {createAirTable()}
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
