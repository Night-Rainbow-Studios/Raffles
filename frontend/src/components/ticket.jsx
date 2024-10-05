import React from 'react';

export default function Ticket({ id, isFree }) {
  return (
    <div className='grid grid-cols-2'>
      <div>
        <h1>ID</h1>
        <h1>Libre</h1>
      </div>
      <div>{id}</div>
      <div>{isFree}</div>
    </div>
  );
}