import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'
import { Heading } from '@chakra-ui/react'

export default function Register() {
  const user = useSelector((state) => state.userData)
  const [form, setForm] = useState({
    auth0Id: '',
    email: '',
  })

  useEffect(() => {
    setForm({
      auth0Id: user?.auth0Id,
      email: user?.email,
    })
  }, [user])

  async function handleClick() {
    const userToSave = {
      auth0Id: user.auth0Id,
      email: user.email,
      location: form.location,
    }
    await addNewUser(form)
    navigate('/')
  }

  return (
    <div>
      <Heading>Register Your Details</Heading>
      <form>
        <label htmlFor='auth0Id'>Auth0 Id:</label>
        <input
          type='text'
          id='auth0Id'
          name='auth0Id'
          value={form.auth0Id}
          disabled
        />
        <label htmlFor='email'>Email:</label>
        <input
          type='text'
          id='email'
          name='email'
          value={form.email}
          disabled
        />
        <button onClick={handleClick}>Register</button>
      </form>
    </div>
  )
}
