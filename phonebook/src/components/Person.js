const Person = ({person, deletePerson}) => {
    return (
        <div>
            <p style={{"display": "inline-block"}}>{person.name} {person.number}</p> 
            <button style={{"display": "inline-block"}} id={person.id} name={person.name} onClick={(event) => deletePerson(event)}>delete</button>
        </div>
    )

}

export default Person

