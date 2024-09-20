
import './App.css'
import AddTodo from './Components/AddTodo'
import TodoList from './Components/TodoList'

function App() {

  return (
    <>
    <h1 className="text-3xl font-bold underline">
    My Todo List
  </h1>
  <AddTodo/>
  <TodoList/>

    </>
  )
}

export default App
