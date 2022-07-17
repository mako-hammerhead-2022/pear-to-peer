import React from 'react'
import { Routes, Route } from 'react-router-dom'

import MainLayout from '@/components/MainLayout'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
import NotFound from '@/components/NotFound'
import AboutUs from '@/components/AboutUs'
import FoodItemPage from '@/components/FoodItemPage'
import AddItemForm from '@/components/AddItemForm'
import { Container } from '@chakra-ui/react'
import { cacheUser } from '@/auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  cacheUser(useAuth0)
  return (
    <>
      <Container centerContent>
        <Routes>
          <Route element={<MainLayout />}>
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/' element={<AboutUs />} />
            <Route exact path='/addfooditem' element={<AddItemForm />} />
            <Route exact path='/item/:id' element={<FoodItemPage />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
