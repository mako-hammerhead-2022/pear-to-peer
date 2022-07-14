import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addItem } from '../apiClient/items'
import { Formik, Form } from 'formik'

export function AddItemForm() {
  const item = useSelector((state) => state.itemData)
  const [itemForm, setItemForm] = useState([])

  useEffect(
    (items) => {
      setItemForm(items)
    },
    [item]
  )

  async function handleClick() {
    const itemToAdd = {
      itemName: item.itemName,
      allergens: item.allergens,
      descripton: item.description,
      expiry: item.expiry,
      availability: item.availability,
    }
    await addNewItem(itemForm)
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        onSubmit(values)
        handleSubmit()
      }}
    >
      {(props) => (
        <Form>
          <FormLabel htmlFor='itemName'>Item Name:</FormLabel>
          <Input
            type='text'
            id='itemName'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <FormLabel htmlFor='allergens'>Allergens:</FormLabel>
          <Input
            type='text'
            id='allergens'
            value={allergens}
            onChange={(e) => setAllergens(e.target.value)}
            required
          />
          <FormLabel htmlFor='description'>Description of food item:</FormLabel>
          <Textarea
            name='description'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></Textarea>
          <FormLabel htmlFor='image'>Upload image:</FormLabel>
          <Input
            type='file'
            name='image'
            id='image'
            accept='image/*'
            multiple
            // onChange={handleFileChange}
          />
          <FormLabel htmlFor='availability'>Is this item available?</FormLabel>
          <Select
            name='availability'
            id='availability'
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
          >
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </Select>

          <Container centerContent>
            <div>
              <Button
                type='submit'
                isLoading={props.isSubmitting}
                colorScheme='teal'
                m={2}
                onClick={props.handleClick}
              >
                Add Item
              </Button>
            </div>
          </Container>
        </Form>
      )}
    </Formik>
  )
}

addItem.defaultProps = {
  onSubmit: () => {},
}

export default addItem
