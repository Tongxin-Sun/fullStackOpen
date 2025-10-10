
const Persons = ({ persons, deletePerson }) => {
    return (
        <>
            {
                persons
                    .map((person) =>
                        <div key={person.name}>
                            {person.name} {person.number} <button onClick={(e) => deletePerson(e, person)}>delete</button>
                        </div>
                    )
            }
        </>
    )
}

export default Persons