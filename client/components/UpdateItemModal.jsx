import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
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
      <Button
        onClick={onOpen}
        border='2px'
        color='#1D6638'
        borderColor={'#1D6638'}
        bgColor='#e5eee4'
        _hover={{ background: '#1D6638', color: '#e5eee4' }}
      >
        Edit Item
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgGradient='linear(to-t, #7DA97A, #e5eee4)' />
        <ModalContent>
          <ModalHeader bg='#e5eee4' color='#1d6638'>
            Edit {itemName}
          </ModalHeader>
          <ModalCloseButton
            border='2px'
            color='#1D6638'
            borderColor={'#1D6638'}
            bgColor='#e5eee4'
            _hover={{ background: '#1D6638', color: '#e5eee4' }}
          />
          <ModalBody bg='#e5eee4'>
            <Center>
              <Image
                maxH={500}
                borderRadius={'lg'}
                mb={4}
                src={imageUrl}
                alt={itemName}
              />
            </Center>
            <UpdateItem id={itemsId} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
