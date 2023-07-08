const Form = ({updateName, newName, updateNumber, newNumber, addPerson}) => {
    return (
        <form>
            <div>
                name: <input onChange={updateName} value={newName}/>
                <br></br>
                number: <input onChange={updateNumber} value={newNumber}/>
            </div>
            <div>
                <button onClick={(event) => addPerson(event)} type="submit">add</button>
            </div>
        </form>
    )
}

export default Form