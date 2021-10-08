import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import './main.sass'

const Main = (): JSX.Element => {
  // state
  const [inputValue, setInputValue] = useState<string>('')
  const [todoList, setTodoList] = useState<string[]>([])

  // effects
  useEffect(() => {
    const existingTodoList = localStorage.getItem('todoList')    
    existingTodoList && setTodoList(existingTodoList.split(','))
  }, [])

  // handlers
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    addTodo()
    setInputValue('')
  }

  const handleInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setInputValue(value)

  const handleClick = (key: string): void => {
    removeTodo(key)
  }

  // helpers
  function removeTodo (el: string): void {
    const newTodoList = todoList.filter(e => e !== el)
    localStorage.setItem('todoList', newTodoList.toString())
    setTodoList(newTodoList)
  }

  function addTodo() {
    const newTodoList = [...todoList, inputValue]
    localStorage.setItem('todoList', newTodoList.toString())
    setTodoList(newTodoList)
  }
  
  // JSX
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInput} />
        <button>Add new one</button>
      </form>
      <ul>
        {todoList.map(e => (
          <li key={e} onClick={() => handleClick(e)}>
            {e}
          </li>
        ))}
      </ul>
    </main>
  )
}

export { Main }