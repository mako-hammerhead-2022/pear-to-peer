import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { getImageUrl } from '@/apiClient/items'
import { Formik, Form, Field } from 'formik'
import {
  FormLabel,
  Input,
  Button,
  Container,
  Select,
  Textarea,
  FormControl,
  NumberInputField,
  NumberInput,
} from '@chakra-ui/react'
import { postNewItem } from '@/slices/userItems'
import { fetchUserByAuth0Id } from '@/slices/userData'
import { useNavigate } from 'react-router-dom'

export function AddItemForm() {
  const dispatch = useDispatch()
  const { auth0Id, id } = useSelector((state) => state.userData)

  const navigate = useNavigate()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()

  useEffect(() => {
    dispatch(fetchUserByAuth0Id(auth0Id))
  }, [auth0Id])

  async function handleSubmit(formData) {
    const token = await getAccessTokenSilently()
    const imageUrl = await getImageUrl(formData.image, token)
    const itemToAdd = {
      itemName: formData.itemName,
      allergens: JSON.stringify([formData.allergens]),
      description: formData.description,
      image: imageUrl,
      expiry: formData.expiry,
      availability: formData.availability,
      userId: id,
    }
    dispatch(postNewItem({ item: itemToAdd, token }))
    navigate('/')
  }

  return (
    <Formik
      initialValues={{
        itemName: '',
        expiry: null,
        allergens: '',
        description: '',
        image: null,
        availability: 'Yes',
        userId: id,
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {(props) => {
        const { availability } = props.values
        return (
          <Form>
            <Field name='itemName'>
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor='itemName'>Item Name:</FormLabel>
                  <Input {...field} type='text' id='itemName' required />
                </FormControl>
              )}
            </Field>
            <Field name='expiry'>
              {({ field }) => (
                <FormControl isRequired>
                  <FormLabel htmlFor='expiry'>Expires after (days):</FormLabel>
                  <NumberInput id='expiry' min={1} max={14}>
                    <NumberInputField {...field} id='expiry' required />
                  </NumberInput>
                </FormControl>
              )}
            </Field>
            <Field name='allergens'>
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor='allergens'>Allergens:</FormLabel>
                  <Input {...field} type='text' id='allergens' required />
                </FormControl>
              )}
            </Field>
            <Field name='description'>
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor='description'>
                    Description of food item:
                  </FormLabel>
                  <Textarea {...field} type='text' id='description' required />
                </FormControl>
              )}
            </Field>
            <Field name='image'>
              {() => (
                <FormControl>
                  <FormLabel htmlFor='image'>Upload image:</FormLabel>
                  <Input
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                    onChange={(e) =>
                      props.setFieldValue('image', e.currentTarget.files[0])
                    }
                  />
                </FormControl>
              )}
            </Field>

            <FormLabel htmlFor='availability'>
              Is this item available?
            </FormLabel>
            <Field name='availability'>
              {({ field }) => (
                <FormControl>
                  <Select
                    {...field}
                    name='availability'
                    id='availability'
                    value={availability}
                    required
                  >
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </Select>
                </FormControl>
              )}
            </Field>

            <Container centerContent>
              <div>
                {isAuthenticated && (
                  <Button
                    type='submit'
                    isLoading={props.isSubmitting}
                    colorScheme='teal'
                    m={2}
                    onClick={props.handleSubmit}
                  >
                    Add Item
                  </Button>
                )}
              </div>
            </Container>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddItemForm
