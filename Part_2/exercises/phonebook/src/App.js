import { useState, useEffect } from "react";
import contactService from "./services/persons";
import ContactList from "./components/ContactList";
import InputBar from "./components/InputBar";
import SubmissionForm from "./components/SubmissionForm";

const App = () => {
  //! STATES
  const [persons, setPersons] = useState([]);
  //? Following Exercise 2.10, Objects moved to json file

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  // console.log(JSON.stringify(persons));

  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  //! Event Handlers

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const checkExistingContacts = (contact, contactList) => {
    return JSON.stringify(contactList)
      .toLowerCase()
      .includes(JSON.stringify(contact.name).toLowerCase());
  };

  const addContact = (event) => {
    event.preventDefault();
    const contactList = Object.values(persons);
    // console.log("button clicked", event.target);
    const newPerson = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1, better to let server generate id's for our resources
    };
    if (checkExistingContacts(newPerson, contactList)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, do you want to update with new number: ${newNumber}`
        )
      ) {
        const contact = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        );
        const modifiedContact = { ...contact, number: newNumber };

        contactService
          .update(contact.id, modifiedContact)
          .then((updatedContacts) => {
            setPersons(
              persons.map((p) => (p.id !== contact.id ? p : updatedContacts))
            );
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      contactService.create(newPerson).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteContact = (id) => {
    const contact = persons.find((p) => p.id === id);
    const name = contact.name;
    if (window.confirm(`Do you really want to remove ${name}`)) {
      contactService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  // if (persons.name.includes(newPerson.name)) {     //* Object comparison should be done doing either
  //   alert(`${newName} is already added to phonebook`); //* deep or shallow key/value check
  // } else {
  //   setPersons(persons.concat(newPerson));
  //   setNewName("");
  // }
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
      <ContactList
        contactsToShow={contactsToShow}
        deleteContact={deleteContact}
      ></ContactList>
    </div>
  );
};

export default App;
