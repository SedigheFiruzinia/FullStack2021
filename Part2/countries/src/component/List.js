const ShowAllTen = ({ list , h}) => {

    const showclicked = (country) => {
        return ()=>h(country)
    }

    return (
        list.map(p =>
            <ul key={p.callingCodes}>
                {p.name} <button onClick={showclicked(p.name)}>Show</button>
            </ul>)
    )
}

const ShowInfo = ({ country, langAry }) => {
    const langname = langAry.map(c => <li key={c.name}>{c.name}</li>)
    return (
        country.map(c =>
            <div key={c.callingCodes}>
                <h1 > {c.name} </h1>
                <ul>capital {c.capital}</ul>
                <ul>population {c.population}</ul>
                <h1>languages</h1>
                <ul>{langname}</ul>
                <img src={c.flag} alt={' '} width={'200'} />
            </div>

        )

    )

}
//


const List = ({ searchCountry, countries ,h}) => {
    let s = searchCountry.toLowerCase();
    let x = countries.filter(({ name }) => name.toLowerCase().indexOf(s) > -1)

    if (x.length > 10) {
        return (<ul>Too many matches, specify another filter</ul>)
    }
    else {

        if (x.length === 1) {
            const langAry = x[0].languages
            //const langname = langAry.map(c => <li>{c.name}</li>)
            return (<ShowInfo country={x} langAry={langAry} />)
        }
        else {
            return (<ShowAllTen list={x} h={h}/>)
        }
    }
}

export default List