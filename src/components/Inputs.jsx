import React from "react";

function Inputs({ input, Delete, Edit, editToggle, editButton }) {
  function eventHandler(prop) {
    Delete(prop);
  }
  function editHandler(prop) {
    Edit(prop);
    editToggle((prev) => !prev);
  }

  function submitHandler(prop) {
    editButton(prop);
  }
  function test(prop) {
    editHandler(prop);
    submitHandler(prop);
  }
  return (
    <div className='core'>
      {input.map((entry) => {
        return (
          <div className='child' key={entry.id}>
            <button onClick={() => test(entry.id)}>Edit</button>
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
