import noteServise from '../services/notes'

const AllPerson = ({ person, allPerson, setPersons }) => {

    const removePerson = (p) => {

        if (window.confirm(`Delete ${p.name} ?`)) {
            noteServise
                .remove(p.id)
                .then(response => {
                    setPersons(allPerson.filter(person => person.id !== p.id))
                })
                .catch(error => {
                    alert(`the person ${p.name} was already deleted from server`)
                    
                })
        }
    }

    return (
        <>
            {person.map(p =>
                <p key={p.id}> {p.name} {p.number}
                    <button onClick={() => removePerson(p)}>delete</button>
                </p>
            )}

        </>
    )
}

const Person = ({ search, person, setPersons }) => {
    if (search.length === 0) {
        return (
            <ul>
                <AllPerson person={person} allPerson={person} setPersons={setPersons}/>
            </ul>
        )
    }
    else {
        let s = search.toLowerCase();
        let x = person.filter(({ name }) => name.toLowerCase().indexOf(s) > -1)
        return (
            <ul>
                <AllPerson person={x} allPerson={person} setPersons={setPersons} />
            </ul>
        )
    }
}
export default Person