import { Fragment} from 'react'
import './App.css'
import Home from './pages/Home'
import LoginSignUp from './pages/LoginSignUp'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Fragment>
      <div className='bg-slate-100'>

        <Router>
          <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/Login' Component={LoginSignUp}/>
          </Routes>

        </Router>


      </div>
    </Fragment>
  )
}

export default App
