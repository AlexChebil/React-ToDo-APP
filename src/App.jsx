import React, { useEffect, useRef, useState } from "react";
import Inputs from "./components/Inputs";
import { v4 as uuidv4 } from "uuid";

function App() {
  let RefName = useRef();
  const RefAge = useRef();

  let EditRefName = useRef();
  const EditRefAge = useRef();

  const [agents, updateAgents] = useState([]);
  const [required, setRequired] = useState(false); //for the warning on blank submit
  const [editToggle, setEditToggle] = useState(false);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState(Number); //set to number to deal with a warning in console

  const uuid = uuidv4(); // for the agents {id}
  const agentsNumber = agents.length;

  function addAgents(e) {
    e.preventDefault();

    let nameValue = RefName.current.value; // the current value for the name input
    let ageValue = RefAge.current.value;

    if (!ageValue || !nameValue) {
      //   || = Logical OR
      setRequired(true);
      return; // to defend user from passing data without all inputs being filled
    }

    updateAgents((prev) => {
      setRequired(false);
      return [...prev, { name: nameValue, age: ageValue, id: uuid }];
    });

    RefName.current.value = ""; //to remove the last person from input
    RefAge.current.value = "";
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("data")); //get our saved data
    saved && updateAgents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(agents)); //save the input data
  }, [agents]);

  function Delete(prop) {
    let temporaryList = [...agents]; // we do not directly work with the main array this is a clone
    const remove = temporaryList.filter((entry) => entry.id !== prop);
    updateAgents(remove);
  }

  function Edit(prop) {
    let agentsClone = agents;
    agentsClone.map((entry) =>
      entry.id === prop ? setEditName(entry.name) + setEditAge(entry.age) : null
    );
  }

  function editSubmitButton(prop) {
    let agentsClone2 = agents;
    let foundIndex = agentsClone2.findIndex((entry) => entry.id === prop);
    let foundElem = agentsClone2.find((entry) => entry.id === prop);
    let EditRefNameValue = EditRefName.current.value; // the current value for the name input
    let EditRefAgeValue = EditRefAge.current.value;
    updateAgents((prev) => {
      return [
        ...prev,
        { name: EditRefNameValue[foundIndex], age: EditRefAgeValue, id: uuid },
      ];
    });
  }

  return (
    <div className={`main ${CSS ? "active" : null}`}>
      <h1>CRUD</h1>
      <h3>We Currently Have {agentsNumber} Agents In Active Duty </h3>

      <Inputs
        input={agents}
        Delete={Delete}
        Edit={Edit}
        editToggle={setEditToggle}
        editButton={editSubmitButton}
      />

      <form>
        <div>
          <input type='text' placeholder='Enter Name' ref={RefName} />
          <input type='number' placeholder='Enter Age' ref={RefAge} />

          {required && (
            <div className='warings'>Please Fill Out All Inputs</div>
          )}

          <button id='addButton' onClick={(e) => addAgents(e)}>
            Submit
          </button>
        </div>

        <div className={`edit ${editToggle ? "active" : null}`}>
          <h2>Update Palace</h2>
          <input
            type='text'
            placeholder='Enter New Name'
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            ref={EditRefName}
            required
          />
          <input
            type='number'
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
            placeholder='Enter New Age'
            ref={EditRefAge}
            required
          />
          <button onClick={() => editSubmitButton()}>EDIT SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default App;
