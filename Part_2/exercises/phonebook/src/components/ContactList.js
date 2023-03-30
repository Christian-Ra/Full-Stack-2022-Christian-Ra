import Contact from "./Contact";

const ContactList = ({ contactsToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map((person) => (
          <li key={person.id}>
            <Contact name={person.name} number={person.number} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
