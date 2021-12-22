import React from "react";

function Inputs({ input, Delete, Edit }) {
  function eventHandler(prop) {
    Delete(prop);
  }
  function editHandler(prop) {
    Edit(prop);
  }
  return (
    <div className='core'>
      {input.map((entry) => {
        return (
          <div className='child' key={entry.id}>
            <button onClick={() => editHandler(entry.id)}>Edit</button>
            <div>
              <span>{entry.name}</span>
              <span>{entry.age}</span>
            </div>
            <button onClick={() => eventHandler(entry.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Inputs;
