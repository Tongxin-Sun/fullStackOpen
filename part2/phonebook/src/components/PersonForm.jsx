const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, addPerson }) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={setNewName} />
            </div>
            <div>
                number: <input value={newNumber} onChange={setNewNumber} />
            </div>
            <div>
                <button type="submit" onClick={addPerson}>add</button>
            </div>
        </form>)
}

export default PersonForm