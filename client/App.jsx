import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { cacheUser } from '@/auth0-utils'
import AboutUs from '@/components/AboutUs'
import AddItemForm from '@/components/AddItemForm'
import Home from '@/components/Home'
import MainLayout from '@/components/MainLayout'
import NotFound from '@/components/NotFound'
import Profile from '@/components/Profile'
import Register from '@/components/Register'

function App() {
  cacheUser(useAuth0)
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/' element={<AboutUs />} />
          <Route exact path='/addfooditem' element={<AddItemForm />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
