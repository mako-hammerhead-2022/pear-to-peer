import { useAuth0 } from '@auth0/auth0-react'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import {
  clearCurrentItem,
  fetchItemById,
  patchItem,
} from '@/slices/currentItem'

export default function UpdateFoodItem() {
  const { itemName, allergens, description, expiry, availability, imageUrl } =
    useSelector((state) => state.currentItem)

  const itemId = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    dispatch(fetchItemById(itemId.id))
    return () => {
      dispatch(clearCurrentItem())
    }
  }, [])

  async function handleUpdate(formData) {
    const token = await getAccessTokenSilently()
    const itemToUpdate = {
      ...formData,
      itemName: formData.itemName,
      allergens: formData.allergens,
      description: formData.description,
      availability: formData.availability,
      itemsId: itemId.id,
    }
    dispatch(patchItem({ item: itemToUpdate, token }))
    navigate('/profile')
  }

  function validateItemName(value) {
    let error
    if (!value) {
      error = 'Item name is required.'
    } else if (value.length < 2 || value.length > 32) {
      error = 'Please enter an item name between 2 and 32 characters.'
    }
    return error
  }

  function validateAllergens(value) {
    let error
    if (!value) {
      error = `Please enter in any allergens seperated by a comma (,). If no allergens please enter 'None'.`
    }
    return error
  }
  function validateDescription(value) {
    let error
    if (!value) {
      error = 'Please enter a description of your item (up to 250 characters).'
    } else if (value.length > 251) {
      error = `We love that you're passionate about your food, but you've gone above the character limit! Please describe your item in 250 characters or less`
    }
    return error
  }

  return (
    <>
      {itemName && (
        <>
          <Heading>Update Your Schnazzy FoodItem</Heading>
          <Formik
            initialValues={{
              itemName: itemName,
              expiry: expiry,
              allergens: allergens,
              description: description,
              availability: availability,
              imageUrl: imageUrl,
            }}
            onSubmit={(values) => {
              handleUpdate(values)
            }}
          >
            {(props) => {
              return (
                <Form>
                  <Field name='itemName' validate={validateItemName}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.itemName && form.touched.itemName
                        }
                      >
                        <FormLabel htmlFor='itemName'>Item Name:</FormLabel>
                        <Input {...field} type='text' id='itemName' required />
                        <FormErrorMessage>
                          {form.errors.itemName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='allergens' validate={validateAllergens}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.allergens && form.touched.allergens
                        }
                      >
                        <FormLabel htmlFor='allergens'>Allergens:</FormLabel>
                        <Input {...field} type='text' id='allergens' required />
                        <FormErrorMessage>
                          {form.errors.allergens}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name='description' validate={validateDescription}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel htmlFor='description'>
                          Description of food item:
                        </FormLabel>
                        <Textarea
                          {...field}
                          type='text'
                          id='description'
                          required
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
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
                          // value={availability}
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
                      <Button
                        type='submit'
                        isLoading={props.isSubmitting}
                        colorScheme='teal'
                        m={2}
                        onClick={props.handleSubmit}
                      >
                        Update Item
                      </Button>
                    </div>
                  </Container>
                </Form>
              )
            }}
          </Formik>
        </>
      )}
    </>
  )
}
