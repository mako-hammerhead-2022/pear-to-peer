import React, { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { fetchAllUsers, postNewUser } from './slices/usersSlice'

import MainLayout from './components/MainLayout'
import Home from './components/Home'
import Register from './components/Register'
import NotFound from './components/NotFound'
import { Container } from '@chakra-ui/react'

function App() {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  if (!users) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Container centerContent>
        <Routes>
          <Route element={<MainLayout />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
