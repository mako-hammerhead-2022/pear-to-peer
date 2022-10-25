import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  Container,
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

import {patchUser} from '@/slices/userData'

export default function UpdateProfileForm() {
  const { getAccessTokenSilently } = useAuth0()
  const { name, username, postcode, id } = useSelector((state) => state.userData.data)
  const dispatch = useDispatch()
  const toast = useToast()


  async function handleUpdate(formData) {
    const token = await getAccessTokenSilently()

    const updatedProfileInfo = {
      ...formData,
      id,
      name: formData.name,
      username: formData.username,
      postcode: formData.postcode
    }
    console.log(updatedProfileInfo)
    dispatch(patchUser({user: updatedProfileInfo, token}))
  }
  
  return (
    <>
    <Formik 
      initialValues={{
        name,
        username,
        postcode
      }}
      onSubmit={(values, actions) => {
        // formData
        handleUpdate(values)
        setTimeout(() => {
          actions.setSubmitting(false)
        }, 400)
      }}
      
      >
        {(props) => {
          return (
            <Form>
              <Field name='name'>
                {({field, form}) => (

                <><FormLabel
                    mt={3}
                    color='#1D6638'
                    fontWeight={'bold'}
                    htmlFor='name'
                  >
                    Name:
                  </FormLabel><Input
                      borderColor='#1D6638'
                      {...field}
                      type='text'
                      id='name'
                      required /></>
                )}
              </Field>
              <Field name='username'>
                {({field, form}) => (

                <><FormLabel
                    mt={3}
                    color='#1D6638'
                    fontWeight={'bold'}
                    htmlFor='username'
                  >
                    Username:
                  </FormLabel><Input
                      borderColor='#1D6638'
                      {...field}
                      type='text'
                      id='username'
                      required /></>
                )}
              </Field>
              <Field name='postcode'>
                {({field, form}) => (

                <><FormLabel
                    mt={3}
                    color='#1D6638'
                    fontWeight={'bold'}
                    htmlFor='postcode'
                  >
                    Postcode:
                  </FormLabel><Input
                      borderColor='#1D6638'
                      {...field}
                      type='text'
                      id='postcode'
                      required /></>
                )}
              </Field>

              <Container centerContent>
                    <div>
                      <Button
                        type='submit'
                        isLoading={props.isSubmitting}
                        border='2px'
                        color='#1D6638'
                        borderColor={'#1D6638'}
                        bgColor='#e5eee4'
                        _hover={{ background: '#1D6638', color: '#e5eee4' }}
                        m={4}
                        onClick={props.handleSubmit}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Container>
            </Form>
          )
        }}
      </Formik>
      </>
  )
}
