const AllPerson = ({ person }) => {
    return (
        <>
            {person.map(p => <p key={p.id}> {p.name} {p.number}</p>)}
        </>
    )
}
const Person = ({ search, person }) => {
    if (search.length === 0) {
        return (
            <ul>
                <AllPerson person={person} />
            </ul>
        )
    }
    else {
        let s = search.toLowerCase();
        let x = person.filter(({ name }) => name.toLowerCase().indexOf(s) > -1)
        return (
            <ul>
                <AllPerson person={x} />
            </ul>
        )
    }
}
export default Person