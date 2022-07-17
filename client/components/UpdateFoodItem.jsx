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
              // console.log(props.values, 'is props')
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
                        <Textarea
                          {...field}
                          type='text'
                          id='description'
                          required
                        />
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
