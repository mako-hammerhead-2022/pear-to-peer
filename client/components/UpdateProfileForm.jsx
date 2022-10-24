import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
  Wrap,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function UpdateProfileForm() {
  const { getAccessTokenSilently } = useAuth0()
  const {name, username, postcode} = useSelector((state) => state.userData.data)
  
  return (
    <>
    <div>UpdateProfileForm</div>
    <Formik 
      initialValues={{
        name,
        username,
        postcode
      }}
      >
      </Formik>
      </>
  )
}
