import {
  Button,
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

import UpdateItem from '@/components/UpdateItem'

export default function UpdateItemModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { itemsId, itemName, imageUrl } = props.data

  return (
    <>
      <Button onClick={onOpen} colorScheme='teal'>
        ItemModal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgGradient='linear(to-t, #7DA97A, #e5eee4)' />
        <ModalContent>
          <ModalHeader bg='#e5eee4' color='#1d6638'>
            Edit {itemName}
          </ModalHeader>
          <ModalCloseButton bg='#7da97a' />
          <ModalBody bg='#e5eee4'>
            <Image src={imageUrl} />
            <UpdateItem id={itemsId} />
          </ModalBody>

          <ModalFooter bg='#e5eee4'>
            <Button bg='#7da97a' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
