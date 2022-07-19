import { useAuth0 } from '@auth0/auth0-react'
import { Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'

import { postComment } from '@/slices/currentItem'

export default function AddCommentForm({ itemId }) {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()

  async function handleSubmit(formData) {
    const token = await getAccessTokenSilently()
    const newComment = {
      itemId,
      comment: formData.comment,
    }
    dispatch(postComment({ newComment, token }))
  }

  function validateComment(value) {
    let error
    if (!value) {
      error = `Please enter a comment.`
    }
    return error
  }

  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={(values, actions) => {
        handleSubmit(values)
        setTimeout(() => {
          actions.setSubmitting(false)
        }, 400)
        actions.resetForm()
      }}
    >
      {(props) => {
        return (
          <Form>
            <Field name='comment' validate={validateComment}>
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.comment && form.touched.comment}
                >
                  <Input
                    {...field}
                    mb={4}
                    type='text'
                    id='comment'
                    placeholder='Add a comment...'
                  />
                  <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mb={4}
              type='submit'
              isLoading={props.isSubmitting}
              onClick={props.handleSubmit}
              bgColor='#7da97a'
            >
              Add
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}
