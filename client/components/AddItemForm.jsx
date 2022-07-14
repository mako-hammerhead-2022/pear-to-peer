import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addItem } from '../apiClient/items'
import { Formik, Form, Field } from 'formik'
import {
  FormLabel,
  Input,
  Button,
  Container,
  Select,
  Textarea,
  FormControl,
} from '@chakra-ui/react'

export function AddItemForm() {
  const item = useSelector((state) => state.itemData)
  //const [itemForm, setItemForm] = useState([])

  // useEffect(
  //   (items) => {
  //     setItemForm(items)
  //   },
  //   [item]
  // )

  async function handleSubmit(formData) {
    console.log('submitting', formData)
    // const itemToAdd = {
    //   itemName: item.itemName,
    //   allergens: item.allergens,
    //   descripton: item.description,
    //   expiry: item.expiry,
    //   availability: item.availability,
    // }
    // await addNewItem(itemForm)
  }

  return (
    <Formik
      initialValues={{
        itemName: '',
        allergens: '',
        description: '',
        image: '',
        availability: 'yes',
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {(props) => {
        const { itemName, allergens, description, image, availability } =
          props.values
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
              {({ field }) => (
                <FormControl>
                  <FormLabel htmlFor='image'>Upload image:</FormLabel>
                  <Input
                    {...field}
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                    multiple
                    // onChange={handleFileChange}
                  />
                </FormControl>
              )}
            </Field>

            <FormLabel htmlFor='availability'>
              Is this item available?
            </FormLabel>
            <Field name='itemName'>
              {({ field }) => (
                <FormControl>
                  <Select
                    name='availability'
                    id='availability'
                    defaultValue={availability}
                    required
                  >
                    <option {...field} value='yes'>
                      Yes
                    </option>
                    <option {...field} value='no'>
                      No
                    </option>
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
