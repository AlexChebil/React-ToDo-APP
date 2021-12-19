import React, { useRef, useState } from "react";
import Inputs from "./components/Inputs";

function App() {
  const RefName = useRef();
  const RefAge = useRef();
  const [agents, updateAgents] = useState([
    { name: "aziz", age: 10, id: 5 },
    { name: "amira", age: 100, id: 2 },
  ]);
  const [required, setRequired] = useState(false); //for the warning on blank submit

  function addAgents(e) {
    e.preventDefault();
    let nameValue = RefName.current.value;
    let ageValue = RefAge.current.value;
    if (!ageValue) {
      setRequired(true);
      return;
    }
    updateAgents((prev) => {
      setRequired(false);
      return [
        ...prev,
        { name: nameValue, age: ageValue, id: Math.random() * 400 },
      ];
    });
    RefName.current.value = ""; //to remove the last person from input
    RefAge.current.value = "";
  }
  return (
    <div className='main'>
      <h1>CRUD</h1>
      <Inputs input={agents} />
      <form>
        <div>
          <input type='text' placeholder='Enter Name' ref={RefName} required />
          <input type='number' placeholder='Enter Age' ref={RefAge} required />
          {required && (
            <div className='warings'>Please Fill Out All Inputs</div>
          )}
          <button onClick={(e) => addAgents(e)}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
