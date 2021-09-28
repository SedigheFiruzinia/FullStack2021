const ShowList = ({ list , handler}) => {

    
    
    const showclicked = (country) => {
        return ()=>handler(country)
    }

    return (
        list.map(p =>
            <ul key={p.callingCodes}>
                {p.name} <button onClick={showclicked(p.name)}>Show</button>
            </ul>)
    )
}



export default ShowList