import React from "react";

function Inputs({ input }) {
  return (
    <div className='core'>
      {input.map((entry) => {
        return (
          <div className='child' key={entry.id}>
            <button>Edit</button>
            <h2>{entry.name}</h2>
            <h2>{entry.age}</h2>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Inputs;
