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
  FormErrorMessage,
  FormHelperText,
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
      allergens: formData.allergens,
      description: formData.description,
      image: imageUrl,
      expiry: formData.expiry,
      availability: formData.availability,
      userId: id,
    }
    dispatch(postNewItem({ item: itemToAdd, token }))
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
  function validateExpiry(value) {
    let error
    if (!value) {
      error =
        'Please enter in the number of days you want your post showing (up to 14 days).'
    } else if (value > 15) {
      error =
        'Please enter in the amount of days you want this post visible for (up to 14 days).'
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
  // function validateImage(value) {
  //   let error
  //   if (!value) {
  //     error =
  //       'Please attach an image of your beautiful food so we can admire it!'
  //   }
  //   return error
  // }

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
            <Field name='itemName' validate={validateItemName}>
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.itemName && form.touched.itemName}
                >
                  <FormLabel htmlFor='itemName'>Item Name:</FormLabel>
                  <Input {...field} type='text' id='itemName' />
                  <FormErrorMessage>{form.errors.itemName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='expiry' validate={validateExpiry}>
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.expiry && form.touched.expiry}
                >
                  <FormLabel htmlFor='expiry'>
                    Post expires after (days):
                  </FormLabel>
                  <NumberInput id='expiry' min={1} max={14}>
                    <NumberInputField {...field} id='expiry' required />
                    <FormErrorMessage>{form.errors.expiry}</FormErrorMessage>
                  </NumberInput>
                </FormControl>
              )}
            </Field>
            <Field name='allergens' validate={validateAllergens}>
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.allergens && form.touched.allergens}
                >
                  <FormLabel htmlFor='allergens'>Allergens:</FormLabel>
                  <Input {...field} type='text' id='allergens' required />
                  <FormErrorMessage>{form.errors.allergens}</FormErrorMessage>
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
                  <Textarea {...field} type='text' id='description' required />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='image'>
              {(form) => (
                <FormControl isRequired>
                  <FormLabel htmlFor='image'>Upload image:</FormLabel>
                  <Input
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                    onChange={(e) => {
                      props.setFieldValue('image', e.currentTarget.files[0])
                    }}
                  />

                  <FormHelperText>
                    Please include an image of your food. We love to see it!
                  </FormHelperText>
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
