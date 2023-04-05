import Contact from "./Contact";

const ContactList = ({ contactsToShow, deleteContact }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {console.log("Contacts after deletion", contactsToShow)}
      <ul>
        {contactsToShow.map((person) => (
          <li key={person.id}>
            <Contact
              name={person.name}
              number={person.number}
              handleClick={() => deleteContact(person.id)} //Every contact has uniques deleteContact function since the id of every note is unique
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
