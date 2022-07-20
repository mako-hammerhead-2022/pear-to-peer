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
  Wrap,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { postNewUser } from '@/slices/userData'

export default function Register() {
  const { user, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: '',
  })

  useEffect(() => {
    if (user) {
      setForm({
        email: user?.email,
      })
    }
  }, [user])

  async function handleSubmit(formData) {
    const token = await getAccessTokenSilently()
    const userToSave = {
      ...formData,
      email: user?.email,
    }
    dispatch(postNewUser({ user: userToSave, token }))
    navigate('/profile')
  }

  function validateName(value) {
    let error
    if (!value) {
      error = 'Name is required.'
    } else if (value.length < 2 || value.length > 32) {
      error = 'Please enter a name between 2 and 32 characters.'
    }
    return error
  }
  function validateUsername(value) {
    let error
    if (!value) {
      error = 'Username is required.'
    } else if (value.length < 2 || value.length > 16) {
      error = 'Please create a username between 2 and 16 characters.'
    }
    return error
  }
  function validatePostcode(value) {
    let error
    if (!value) {
      error = 'Postcode is required.'
    } else if (value.length !== 4) {
      error = 'Please provide a valid postcode.'
    }
    return error
  }

  //TODO: handle loading state

  return (
    <Box
      marginRight='20vw'
      marginLeft='20vw'
      border='2px'
      borderWidth='5px'
      borderColor='#1D6638'
      borderRadius='7%'
    >
      <Heading align='center' fontFamily='pacifico' color='#1D6638' py={10}>
        Register Your Details
      </Heading>
      <Wrap marginBottom='5vw' marginTop='1vw' justify='center'>
        {form.email != '' ? (
          <Formik
            initialValues={{ ...form, name: '', username: '', postcode: '' }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(props) => (
              <Form>
                <Field name='email'>
                  {({ field }) => (
                    <FormControl>
                      <FormLabel
                        color='#1D6638'
                        fontWeight={'bold'}
                        htmlFor='email'
                      >
                        Email:
                      </FormLabel>
                      <Input
                        mb={3}
                        borderColor='#1D6638'
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
                      <FormLabel
                        color='#1D6638'
                        fontWeight={'bold'}
                        htmlFor='name'
                      >
                        Your name:
                      </FormLabel>
                      <Input
                        mb={3}
                        borderColor='#1D6638'
                        {...field}
                        id='name'
                      ></Input>
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
                      <FormLabel
                        color='#1D6638'
                        fontWeight={'bold'}
                        htmlFor='username'
                      >
                        Display name:
                      </FormLabel>
                      <Input
                        mb={3}
                        borderColor='#1D6638'
                        {...field}
                        id='username'
                      ></Input>
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='postcode' validate={validatePostcode}>
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.postcode && form.touched.postcode}
                    >
                      <FormLabel
                        color='#1D6638'
                        fontWeight={'bold'}
                        htmlFor='postcode'
                      >
                        Postal Code:
                      </FormLabel>
                      <NumberInput
                        mb={3}
                        borderColor='#1D6638'
                        id='postcode'
                        max={9999}
                        min={100}
                      >
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
                <Button
                  border='2px'
                  color='#1D6638'
                  borderColor={'#1D6638'}
                  bgColor='#e5eee4'
                  _hover={{ background: '#1D6638', color: '#e5eee4' }}
                  mt={2}
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <p>Loading..</p>
        )}
      </Wrap>
    </Box>
  )
}
