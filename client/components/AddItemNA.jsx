import React, { useEffect, useState } from 'react'
import { addItem } from '../apiClient/items'
import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

import { useAuth0 } from '@auth0/auth0-react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Textarea,
  Select,
  useDisclosure,
  FormControl,
  Container,
  Center,
} from '@chakra-ui/react'

export default function AddItem() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Click me plz open</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor='green.300'>
          <ModalHeader>This is a header modaleyhehooo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>sup</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

// export function AddItem({ onSubmit = () => {}, onSuccess = () => {} }) {
//   const item = useSelector((state) => state.itemData)

//   // const [form, setForm] = useState({
//   //   id: '',
//   //   userId: '',
//   // })

//   const [itemName, setItemName] = useState('')
//   const [allergens, setAllergens] = useState('')
//   const [description, setDescription] = useState('')
//   const [imageUrl, setImageUrl] = useState('')
//   const [expiry, setExpiry] = useState('')
//   const [availability, setAvailability] = useState('Yes')

//   const { isOpen, onOpen, onClose } = useDisclosure()

//   const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()

//   // const handleFileChange = (e) => {
//   //   setSelectedFiles(e.target.files)
//   // }

//   const handleSubmit = async () => {
//     const token = await getAccessTokenSilently()

//     // const urls = []
//     // for (let file of selectedFiles) {
//     //   const imageUrl = await api.getImageUrl(file, token)
//     //   urls.push(imageUrl)
//     // }
//     // const addItem = api

//     const formData = {
//       userId: user.sub,
//       itemName: item.itemName,
//       allergens: item.allergens,
//       descripton: item.description,
//       imageUrl: JSON.stringify(urls),
//       expiry: item.expiry,
//       availability: item.availability,
//     }

//     await addItem(formData, token)

//     setItemName('')
//     setAllergens('')
//     setDescription('')
//     setImageUrl(null)
//     setExpiry('')
//     setAvailability('')

//     onClose()
//     onSuccess()
//   }
//   return (
//     <>
//       {/* {isAuthenticated && (
//           <Center>
//             <Button onClick={onOpen} colorScheme='teal'>
//               + Add Item
//             </Button>
//           </Center>
//         )} */}
//       <Center>
//         <Button onClick={onOpen} colorScheme='teal'>
//           + Add Item
//         </Button>
//       </Center>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add Food Item</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Formik
//               initialValues={{}}
//               onSubmit={(values) => {
//                 onSubmit(values)
//                 handleSubmit()
//               }}
//             >
//               {(props) => (
//                 <Form>
//                   <FormControl>
//                     <FormLabel htmlFor='itemName'>Item Name:</FormLabel>
//                     <Input
//                       type='text'
//                       id='itemName'
//                       value={itemName}
//                       onChange={(e) => setItemName(e.target.value)}
//                       required
//                     />
//                     <FormLabel htmlFor='allergens'>Allergens:</FormLabel>
//                     <Input
//                       type='text'
//                       id='allergens'
//                       value={allergens}
//                       onChange={(e) => setAllergens(e.target.value)}
//                       required
//                     />
//                     <FormLabel htmlFor='description'>
//                       Description of food item:
//                     </FormLabel>
//                     <Textarea
//                       name='description'
//                       id='description'
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       required
//                     ></Textarea>
//                     <FormLabel htmlFor='image'>Upload image:</FormLabel>
//                     <Input
//                       type='file'
//                       name='image'
//                       id='image'
//                       accept='image/*'
//                       multiple
//                       // onChange={handleFileChange}
//                     />
//                     <FormLabel htmlFor='availability'>
//                       Is this item available?
//                     </FormLabel>
//                     <Select
//                       name='availability'
//                       id='availability'
//                       value={availability}
//                       onChange={(e) => setAvailability(e.target.value)}
//                       required
//                     >
//                       <option value='yes'>Yes</option>
//                       <option value='no'>No</option>
//                     </Select>
//                   </FormControl>
//                   <Container centerContent>
//                     <div>
//                       <Button
//                         type='submit'
//                         isLoading={props.isSubmitting}
//                         colorScheme='teal'
//                         m={2}
//                       >
//                         Add Item
//                       </Button>
//                       <Button onClick={onClose} m={2}>
//                         Cancel
//                       </Button>
//                     </div>
//                   </Container>
//                 </Form>
//               )}
//             </Formik>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }

// AddItem.defaultProps = {
//   onSubmit: () => {},
// }
// export default AddItem
