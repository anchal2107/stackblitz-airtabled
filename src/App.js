import React, { useEffect,useRef,useState } from 'react';
import './style.css';
import { createRecord } from './services/airtable/crud.js';
// const createAirTable = async () => {
//   console.log('Creating record...');
//   const createdRecord = await createRecord('Table 1', {
//     field1: 'Value11',
//     field2: 'Value22',
//   });
// };
const createRecorduseFetch = async () => {
  try {
    await createRecord('Table 1', {
      field1: 'Value111',
      field2: 'Value221',
    });
  } catch (error) {
    console.error('Error creating record:', error);
  }
};
export default function App() {
  const count = useRef(0);
 
  useEffect(() => {
   
    if(count.current === 0)
    {
          createRecorduseFetch();
    console.log('Creating record...');
    count.current = 1;
    }
 console.log('useEffect');
  }, []); // Add 'value' to the dependency array if it should trigger the effect


  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
