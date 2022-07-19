import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  clearCurrentItem,
  fetchItemById,
  patchItem,
} from '@/slices/currentItem'

export default function UpdateFoodItem(props) {
  console.log(props, 'updateItemProps')
  const { itemName, allergens, description, expiry, availability, imageUrl } =
    useSelector((state) => state.currentItem)

  const dispatch = useDispatch()
  const [updatedItem, setUpdatedItem] = useState({})
  const [shouldUpdate, setShouldUpdate] = useState(false)

  useEffect(() => {
    dispatch(fetchItemById(props.id))
    return () => {
      dispatch(clearCurrentItem())
    }
  }, [])

  async function handleUpdate(formData) {
    setShouldUpdate(true)
    setUpdatedItem({
      ...formData,
      itemName: formData.itemName,
      allergens: formData.allergens,
      description: formData.description,
      availability: formData.availability,
      itemsId: props.id,
    })
    // dispatch(patchItem(itemToUpdate))
  }
  console.log(updatedItem, 'itu')

  useEffect(() => {
    if (shouldUpdate) {
      dispatch(patchItem(updatedItem))
    }
  }, [updatedItem])

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
