import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import './main.sass'

const Main = (): JSX.Element => {
  const [value, setValue] = useState<string>('')
  const [todoList, setTodoList] = useState<string[]>([])

  useEffect(() => {
    const existingTodoList = localStorage.getItem('todoList')    
    existingTodoList && setTodoList(existingTodoList.split(','))
  }, [])

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    addTodo()
    setValue('')
  }

  const handleValue = (e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value)

  const handleRemoveTodo = (el: string): void => setTodoList(todoList.filter(e => e !== el))

  function addTodo() {
    const newTodoList = [...todoList, value]
    localStorage.setItem('todoList', newTodoList.toString())
    setTodoList(newTodoList)
  }
  
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleValue} />
        <button>Add new one</button>
      </form>
      <ul>
        {todoList.map(e => (
          <li key={e} onClick={() => handleRemoveTodo(e)}>
            {e}
          </li>
        ))}
      </ul>
    </main>
  )
}

export { Main }