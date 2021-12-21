import React, { useEffect, useRef, useState } from "react";
import Inputs from "./components/Inputs";
import { v4 as uuidv4 } from "uuid";

function App() {
  const RefName = useRef();
  const RefAge = useRef();
  const [agents, updateAgents] = useState([]);
  const [required, setRequired] = useState(false); //for the warning on blank submit
  const uuid = uuidv4();

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
      return [...prev, { name: nameValue, age: ageValue, id: uuid }];
    });
    RefName.current.value = ""; //to remove the last person from input
    RefAge.current.value = "";
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("data"));
    saved && updateAgents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(agents));
  }, [agents]);

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
          <button id='addButton' onClick={(e) => addAgents(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
