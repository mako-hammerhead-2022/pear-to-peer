import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

import UpdateProfileForm from './UpdateProfileForm'

export default function UpdateProfileModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { name, username, postcode } = useSelector(
    (state) => state.userData.data
  )

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
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bgGradient='linear(to-t, #7DA97A, #e5eee4)' />
        <ModalContent>
          <ModalHeader bg='#e5eee4' color='#1d6638'>
            Edit Profile
          </ModalHeader>
          <ModalCloseButton
            border='2px'
            color='#1D6638'
            borderColor={'#1D6638'}
            bgColor='#e5eee4'
            _hover={{ background: '#1D6638', color: '#e5eee4' }}
          />
          <ModalBody bg='#e5eee4'>
            <UpdateProfileForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
