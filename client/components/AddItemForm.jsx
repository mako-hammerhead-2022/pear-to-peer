import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getImageUrl } from '../apiClient/items'
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
import { postNewItem } from '../slices/itemSlice'

export function AddItemForm() {
  const dispatch = useDispatch()
  const item = useSelector((state) => state.itemData)

  async function handleSubmit(formData) {
    console.log('formData', formData)
    console.log('file', formData.image)

    const imageUrl = await getImageUrl(formData.image)

    console.log('imageUrl', imageUrl)
    const itemToAdd = {
      itemName: formData.itemName,
      allergens: JSON.stringify([formData.allergens]),
      description: formData.description,
      image: imageUrl,
      expiry: formData.expiry,
      availability: formData.availability,
    }
    dispatch(postNewItem(itemToAdd))
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
                <Button
                  type='submit'
                  isLoading={props.isSubmitting}
                  colorScheme='teal'
                  m={2}
                  onClick={props.handleSubmit}
                >
                  Add Item
                </Button>
              </div>
            </Container>
          </Form>
        )
      }}
    </Formik>
  )
}

// addItem.defaultProps = {
//   onSubmit: () => {},
// }

export default addItem
