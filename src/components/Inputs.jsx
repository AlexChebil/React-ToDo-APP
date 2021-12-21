import React from "react";

function Inputs({ input }) {
  return (
    <div className='core'>
      {input.map((entry) => {
        return (
          <div className='child' key={entry.id}>
            <button>Edit</button>
            <div>
              <span>{entry.name}</span>
              <span>{entry.age}</span>
            </div>
            <button>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default Inputs;
