import { useState } from "react"
import { Item, Search } from "../atoms"

const Main = (): JSX.Element => {
  const [todoList, setTodoList] = useState<string[]>(['example'])

  const addTodo = (newItem: string): void => {
    setTodoList([...todoList, newItem])
  }

  const removeTodo = (id: string): void => {
    setTodoList(todoList.filter((e) => e !== id))
  }
  
  return (
    <main>
      <Search />
      <ul>
        {todoList.map((e) => (
          <li>
            <Item key={e} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export { Main }