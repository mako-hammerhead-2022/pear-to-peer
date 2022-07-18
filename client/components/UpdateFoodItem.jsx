import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemById, clearCurrentItem } from '@/slices/currentItem'
import { Formik, Form, Field } from 'formik'
import {
  Heading,
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
} from '@chakra-ui/react'
import { patchItem } from '@/slices/currentItem'
import { useNavigate } from 'react-router-dom'

export default function UpdateFoodItem() {
  const { itemName, allergens, description, expiry, availability, imageUrl } =
    useSelector((state) => state.currentItem)

  const itemId = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchItemById(itemId.id))
    return () => {
      dispatch(clearCurrentItem())
    }
  }, [])

  async function handleUpdate(formData) {
    const itemToUpdate = {
      ...formData,
      itemName: formData.itemName,
      allergens: formData.allergens,
      description: formData.description,
      // expiry: formData.expiry,
      availability: formData.availability,
      // imageUrl: imageUrl,
      itemsId: itemId.id,
    }
    dispatch(patchItem(itemToUpdate))
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
              // console.log(values, 'submitted values')
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
                  {/* <Field name='expiry'>
                    {({ field }) => (
                      <FormControl isRequired>
                        <FormLabel htmlFor='expiry'>
                          Expires after (days):
                        </FormLabel>
                        <NumberInput id='expiry' min={1} max={14}>
                          <NumberInputField {...field} id='expiry' required />
                        </NumberInput>
                      </FormControl>
                    )}
                  </Field> */}
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
                  {/* <Field name='image'>
                    {() => (
                      <FormControl>
                        <FormLabel htmlFor='image'>Upload image:</FormLabel>
                        <Input
                          type='file'
                          name='image'
                          id='image'
                          accept='image/*'
                          onChange={(e) =>
                            props.setFieldValue(
                              'image',
                              e.currentTarget.files[0]
                            )
                          }
                        />
                      </FormControl>
                    )}
                  </Field> */}
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
