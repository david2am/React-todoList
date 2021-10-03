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

  const removeTodo = (el: string): void => {
    const newTodoList = todoList.filter(e => e !== el)
    localStorage.setItem('todoList', newTodoList.toString())
    setTodoList(newTodoList)
  }

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
          <li key={e} onClick={() => removeTodo(e)}>
            {e}
          </li>
        ))}
      </ul>
    </main>
  )
}

export { Main }