const Contact = ({ name, number, handleClick }) => {
  return (
    <p>
      {name} {number} <button onClick={handleClick}>Delete Contact</button>
    </p>
  );
};

export default Contact;
