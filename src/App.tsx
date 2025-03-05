
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/Login/Login'
import { ToDoList } from './components/ToDoList/ToDoList'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path ='/list' element={<ToDoList />}/>
      </Routes>

    </BrowserRouter>

  )
}

export default App
