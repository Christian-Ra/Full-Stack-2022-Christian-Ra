import InputBar from "./InputBar";

const SubmissionForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  addContact,
}) => {
  return (
    <div>
      <h2>Add New Contact</h2>
      <form onSubmit={addContact}>
        <div>
          name: <InputBar input={newName} eventHandler={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <InputBar input={newNumber} eventHandler={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
