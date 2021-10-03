import { FormEvent, useEffect, useRef, useState } from "react"

const Main = (): JSX.Element => {
  const [todoList, setTodoList] = useState<string[]>([])

  const searchValue = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const existingTodoList = localStorage.getItem('todoList')
    existingTodoList && setTodoList(JSON.parse(existingTodoList) as string[])
  }, [])

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    if (searchValue.current) {
      const newTodoList = [...todoList, searchValue.current.value]
      localStorage.setItem('todoList', newTodoList.toString())
      setTodoList(newTodoList)
    }
  }
  
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={searchValue} />
        <button>Add new one</button>
      </form>
      <ul>
        {todoList.map((e) => (
          <li key={e}>
            {e}
          </li>
        ))}
      </ul>
    </main>
  )
}

export { Main }