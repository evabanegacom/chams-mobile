import { useEffect, useState } from "react"
import { RootState } from './redux/store'
import { useDispatch, useSelector } from "react-redux"
import { addTodos, getTodos, removeTodo, updateTodos } from "./redux/actions"
import { Button } from "@mui/material"

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state?.todos?.loading)
  const todos = useSelector((state: RootState) => state?.todos?.data)

// const todos = [
//     {
//       id: 1,
//       name: 'test1',
//       description: 'test1'
//     },
//     {
//       id: 2,
//       name: 'test2',
//       description: 'test2'
//     },

// ]

  const error = useSelector((state: RootState) => state?.todos?.error)

  const [todoId, setTodoId] = useState(0)
  const [editing, setEditing] = useState(false)
  
  useEffect(() => {
    dispatch(getTodos() as any)
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id) as any)
  }

  const [values, setValues] = useState({
    name: '',
    description: '',
  })

  const handleEdit = (todo: any) => {
    setTodoId(todo.id)
    setValues({ name: todo.name, description: todo.description })
    setEditing(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editing) {
      dispatch(updateTodos(todoId, values) as any)
      setTodoId(0)
      setEditing(false)
    } else {
      dispatch(addTodos(values) as any)
      setValues({ name: '', description: '' })
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input onChange={handleChange} placeholder='name' type="text" name="name" value={values.name} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea onChange={handleChange} placeholder='description' name="description" value={values.description} required />
        </div>
        <div>
          <button type="submit">{editing ? 'Update' : 'Add'}</button>
        </div>
      </form>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.length > 0 && todos?.map((yourEntity) => (
          <tr key={yourEntity.id}>
            <td>{yourEntity.id}</td>
            <td>{yourEntity.name}</td>
            <td>{yourEntity.description}</td>
            <td>
            <button onClick={() => handleEdit(yourEntity)}>Edit</button>
              <button onClick={() => handleDelete(yourEntity.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        {loading && (
          <tr>
            <td colSpan={4}>Loading...</td>
          </tr>
        )}
        { error && (
          <tr>
            <td colSpan={4}>{error}</td>
          </tr>
        )}
      </tbody>
    </table>
    </>
  )
}

export default App
