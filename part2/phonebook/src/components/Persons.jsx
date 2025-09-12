
const Persons = ({ filter, persons, deletePerson }) => {
    return (
        <>
            {
                persons
                    .filter((person) => filter === '' || person.name.toLowerCase().startsWith(filter.toLowerCase()))
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