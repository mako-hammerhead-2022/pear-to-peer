import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

import UpdateItem from '@/components/UpdateItemForm'

export default function UpdateItemModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { itemsId, itemName, imageUrl } = props.data

  return (
    <>
      <Button onClick={onOpen} bgColor='#7da97a'>
        Edit Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgGradient='linear(to-t, #7DA97A, #e5eee4)' />
        <ModalContent>
          <ModalHeader bg='#e5eee4' color='#1d6638'>
            Edit {itemName}
          </ModalHeader>
          <ModalCloseButton bg='#7da97a' />
          <ModalBody bg='#e5eee4'>
            <Center>
              <Image borderRadius={'lg'} mb={4} src={imageUrl} alt={itemName} />
            </Center>
            <UpdateItem id={itemsId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
