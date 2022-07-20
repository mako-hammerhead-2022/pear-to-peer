import { useAuth0 } from '@auth0/auth0-react'
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearCurrentItem,
  fetchItemById,
  patchItem,
} from '@/slices/currentItem'

export default function UpdateItem(props) {
  const { getAccessTokenSilently } = useAuth0()
  const { itemName, allergens, description, expiry, availability, imageUrl } =
    useSelector((state) => state.currentItem)

  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    dispatch(fetchItemById(props.id))
    return () => {
      dispatch(clearCurrentItem())
    }
  }, [])

  async function handleUpdate(formData) {
    const token = await getAccessTokenSilently()

    const updatedItem = {
      ...formData,
      itemName: formData.itemName,
      allergens: formData.allergens,
      description: formData.description,
      availability: formData.availability,
      itemsId: props.id,
    }

    dispatch(patchItem({ item: updatedItem, token }))
    toast({
      title: 'Item Updated',
      description: 'Your item has been updated!',
      status: 'success',
      duration: 5000,

      isClosable: true,
    })
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
      error = `Please enter in any allergens separated by a comma (,). If no allergens please enter 'None'.`
    }
    return error
  }
  function validateDescription(value) {
    let error
    if (!value) {
      error = 'Please enter a description of your item (up to 250 characters).'
    } else if (value.length > 601) {
      error = `We love that you're passionate about your food, but you've gone above the character limit! Please describe your item in 600 characters or less`
    }
    return error
  }

  return (
    <>
      {itemName && (
        <>
          <Formik
            initialValues={{
              itemsId: props.Id,
              itemName: itemName,
              expiry: expiry,
              allergens: allergens,
              description: description,
              availability: availability,
              imageUrl: imageUrl,
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
                  <Field name='itemName' validate={validateItemName}>
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.itemName && form.touched.itemName
                        }
                      >
                        <FormLabel
                          mt={3}
                          color='#1D6638'
                          fontWeight={'bold'}
                          htmlFor='itemName'
                        >
                          Item Name:
                        </FormLabel>
                        <Input
                          borderColor='#1D6638'
                          {...field}
                          type='text'
                          id='itemName'
                          required
                        />
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
                        <FormLabel
                          mt={3}
                          color='#1D6638'
                          fontWeight={'bold'}
                          htmlFor='allergens'
                        >
                          Allergens:
                        </FormLabel>
                        <Input
                          borderColor='#1D6638'
                          {...field}
                          type='text'
                          id='allergens'
                          required
                        />
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
                        <FormLabel
                          mt={3}
                          color='#1D6638'
                          fontWeight={'bold'}
                          htmlFor='description'
                        >
                          Description of food item:
                        </FormLabel>
                        <Textarea
                          borderColor='#1D6638'
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

                  <FormLabel
                    mt={3}
                    color='#1D6638'
                    fontWeight={'bold'}
                    htmlFor='availability'
                  >
                    Is this item available?
                  </FormLabel>
                  <Field name='availability'>
                    {({ field }) => (
                      <FormControl>
                        <Select
                          borderColor='#1D6638'
                          {...field}
                          name='availability'
                          id='availability'
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
                        border='2px'
                        color='#1D6638'
                        borderColor={'#1D6638'}
                        bgColor='#e5eee4'
                        _hover={{ background: '#1D6638', color: '#e5eee4' }}
                        m={4}
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
