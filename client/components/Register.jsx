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
} from '@chakra-ui/react'
import * as Yup from 'yup'
import { postNewUser } from '@/slices/usersSlice'

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  function handleSubmit(formData) {
    const userToSave = {
      ...formData,
      auth0Id: user.auth0Id,
      email: user.email,
    }
    dispatch(postNewUser(userToSave))
    navigate('/')
  }

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(32, 'Too Long!')
      .required('Required'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(16, 'Too Long!')
      .required('Required'),
    postcode: Yup.number()
      .min(110, 'Too low for a postcode!')
      .max(9999, 'Too high for a postcode!')
      .required('Required'), //0110 - 9999
  })

  //TODO: handle loading state

  return (
    <div>
      <Heading>Register Your Details</Heading>
      {form.auth0Id != '' ? (
        <Formik
          initialValues={{ ...form, name: '', username: '', postcode: '' }}
          validationSchema={RegisterSchema}
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
              <Field name='name'>
                {({ field }) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor='name'>Your name:</FormLabel>
                    <Input {...field} id='name'></Input>
                  </FormControl>
                )}
              </Field>
              <Field name='username'>
                {({ field }) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor='username'>Display name:</FormLabel>
                    <Input {...field} id='username'></Input>
                  </FormControl>
                )}
              </Field>
              {/* TODO: validate postcode, only allow numbers */}
              <Field name='postcode'>
                {props.errors.postcode && props.touched.postcode ? (
                  <div>{props.errors.postcode}</div>
                ) : (
                  ({ field }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor='postcode'>Postal Code:</FormLabel>
                      <NumberInput id='postcode' max={9999} min={100}>
                        <NumberInputField
                          {...field}
                          id='postcode'
                        ></NumberInputField>
                      </NumberInput>
                    </FormControl>
                  )
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
