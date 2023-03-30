import { useState } from "react";
import ContactList from "./components/ContactList";
import InputBar from "./components/InputBar";
import SubmissionForm from "./components/SubmissionForm";

const App = () => {
  //! vvvvv STATES vvvv
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  // console.log(JSON.stringify(persons));

  //! vvvvv Event Handlers vvvvv
  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    // console.log(event.target.value);
    setFilter(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();
    const contactList = Object.values(persons);
    // console.log("button clicked", event.target);
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    console.log("Contact.values list: ", Object.values(persons));
    if (
      JSON.stringify(contactList)
        .toLowerCase()
        .includes(JSON.stringify(newPerson.name).toLowerCase())
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }

    // if (persons.name.includes(newPerson.name)) {     //* Object comparison should be done doing either
    //   alert(`${newName} is already added to phonebook`); //* deep or shallow key/value check
    // } else {
    //   setPersons(persons.concat(newPerson));
    //   setNewName("");
    // }
  };

  const contactsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      <h1>Phonebook</h1>
      Filter Search:
      <InputBar input={filter} eventHandler={handleFilterChange}></InputBar>
      <SubmissionForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
      ></SubmissionForm>
      <ContactList contactsToShow={contactsToShow}></ContactList>
    </div>
  );
};

export default App;
