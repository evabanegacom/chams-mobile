import { useEffect, useState } from "react"
import { RootState } from './redux/store'
import { useDispatch, useSelector } from "react-redux"
import { addTodos, getTodos, removeTodo } from "./redux/actions"


const TodosTable= () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state?.todos?.loading)
  const todos = useSelector((state: RootState) => state?.todos?.data)
  console.log({todos})

  useEffect(() => {
    dispatch(getTodos() as any)
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id) as any)
  }

  return (
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
              <button>Edit</button>
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
      </tbody>
    </table>
  )
}

const YourEntityForm = () => {
  const dispatch = useDispatch()
  const [ values, setValues ] = useState({
    name: '',
    description: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(values)
    // dispatch(addTodos(values) as any)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input onChange={handleChange} placeholder='name' type="text" name="name" required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea onChange={handleChange} placeholder='description' name="description" required />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const App = () => {
  const dispatch = useDispatch()

  const handleRefresh = () => {
    dispatch(getTodos() as any)
  }

  return (
    <div>
      <h1>Your Entity</h1>
      <TodosTable />
      <YourEntityForm />
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  )
}

export default App
