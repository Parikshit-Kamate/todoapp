import React from 'react'
import { useState } from 'react'

const TodoApp = () => {



    const [todos, settodos] = useState([])
    const [item, setitem] = useState('')
    const [description, setdescription] = useState('')
    const [date, setdate] = useState('')
    const [editIndex, setEditIndex] = useState(null)



    const dataHandler = () => {
        if (item.trim() && description.trim() && date.trim()) {


            if (editIndex !== null) {

                const updatetodo = [...todos]
                updatetodo[editIndex] = { item, description, date }
                settodos(updatetodo)
                setEditIndex(null)
            } else {
                settodos([...todos, { id: Date.now(), item, description, date }])
            }

            setitem('')
            setdescription('')
            setdate('')
        } else {
            alert('All field are Imp')
        }
    }


    const edititems = (index) => {
        const todo = todos[index]
        setitem(todo.item)
        setdescription(todo.description)
        setdate(todo.date)
        setEditIndex(index)
    }



    const deleteItems = (index) => {
        const updatedTodo = [...todos]
        updatedTodo.splice(index, 1)
        settodos(updatedTodo)
    }

    const completed = (index) => {
        const updated = [...todos];
        updated[index].completed = !updated[index].completed;
        settodos(updated)
    }

    return (
        <div>
            <h2>TodoApp</h2>
            <div className="w-50 bg-dark mx-auto p-4 rounded-3">
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Enter List"
                        className="form-control"
                        value={item}
                        onChange={(event) => setitem(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Enter List Description"
                        className="form-control"
                        value={description}
                        onChange={(event) => setdescription(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(event) => setdate(event.target.value)}
                    />
                </div>
                <button className="btn btn-success" onClick={dataHandler}>
                    {
                        editIndex !== null ? 'Update List' : 'Add List'
                    }
                </button>
            </div>


            <div className="w-50 mx-auto mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>List Name</th>
                            <th>List Description</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo, index) => {
                                return (
                                    <tr key={index}>
                                        <td style={{textDecoration : todo.completed ? 'line-through' : 'none'}}>{index + 1}</td>
                                        <td style={{textDecoration : todo.completed ? 'line-through' : 'none'}}>{todo.item}</td>
                                        <td style={{textDecoration : todo.completed ? 'line-through' : 'none'}}>{todo.description}</td>
                                        <td style={{textDecoration : todo.completed ? 'line-through' : 'none'}}>{todo.date}</td>
                                        <td>
                                            <button onClick={() => edititems(index)} className="btn btn-warning">Edit</button>
                                            <button className="btn btn-danger ms-2" onClick={() => deleteItems(index)}>Delete</button>
                                            <button className="btn btn-primary ms-2" onClick={()=> completed(index)}>
                                                {
                                                todo.completed ? 'Undo' : 'Completed'
                                                }</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TodoApp
