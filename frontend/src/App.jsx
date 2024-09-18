import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import Todos from './pages/Todos';
import TodoById from './pages/TodoById';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/update/:id' element={<UpdateProfile />} />



                <Route path='/todos' element={<Todos />} />
                <Route path='/todos/:id' element={<TodoById />} />

            </Routes>
        </Router>
    )
}

export default App