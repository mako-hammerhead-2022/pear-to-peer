import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { postNewUser } from '@/slices/userData'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userData.data)
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

  function handleSubmit(formData) {
    const userToSave = {
      ...formData,
      auth0Id: user.auth0Id,
      email: user.email,
    }
    dispatch(postNewUser(userToSave))
    navigate('/')
  }

  // const RegisterSchema = Yup.object().shape({
  //   name: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(32, 'Too Long!')
  //     .required('Required'),
  //   username: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(16, 'Too Long!')
  //     .required('Required'),
  //   postcode: Yup.number()
  //     .min(110, 'Too low for a postcode!')
  //     .max(9999, 'Too high for a postcode!')
  //     .required('Required'), //0110 - 9999
  // })

  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required'
    } else if (value.length < 2 || value.length > 32) {
      error = 'Please enter a name between 2 and 32 characters'
    }
    return error
  }
  function validateUsername(value) {
    let error
    if (!value) {
      error = 'Username is required'
    } else if (value.length < 2 || value.length > 16) {
      error = 'Please create a username between 2 and 16 characters'
    }
    return error
  }
  function validatePostcode(value) {
    let error
    if (!value) {
      error = 'Postcode is required'
    } else if (value.length !== 4) {
      error = 'Please provide a valid postcode'
    }
    return error
  }

  //TODO: handle loading state

  return (
    <div>
      <Heading>Register Your Details</Heading>
      {form.auth0Id != '' ? (
        <Formik
          initialValues={{ ...form, name: '', username: '', postcode: '' }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {(props) => (
            <Form>
              <Field name='email'>
                {({ field }) => (
                  <FormControl>
                    <FormLabel htmlFor='email'>Email:</FormLabel>
                    <Input
                      {...field}
                      id='email'
                      value={props.values.email}
                      disabled
                    ></Input>
                  </FormControl>
                )}
              </Field>
              <Field name='name' validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor='name'>Your name:</FormLabel>
                    <Input {...field} id='name'></Input>
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='username' validate={validateUsername}>
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel htmlFor='username'>Display name:</FormLabel>
                    <Input {...field} id='username'></Input>
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* TODO: validate postcode, only allow numbers */}
              <Field name='postcode' validate={validatePostcode}>
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.postcode && form.touched.postcode}
                  >
                    <FormLabel htmlFor='postcode'>Postal Code:</FormLabel>
                    <NumberInput id='postcode' max={9999} min={100}>
                      <FormErrorMessage>
                        {form.errors.postcode}
                      </FormErrorMessage>
                      <NumberInputField
                        {...field}
                        id='postcode'
                      ></NumberInputField>
                    </NumberInput>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme='teal' type='submit'>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  )
}
