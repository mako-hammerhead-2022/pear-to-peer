import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { fetchUserByAuth0Id } from '@/slices/userData'

export function useIsRegistered() {
  const dispatch = useDispatch()
  const [isRegistered, setIsRegistered] = useState(null)
  const { user } = useAuth0()
  const userData = useSelector((state) => state.userData)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserByAuth0Id(user.sub))
    }
  }, [user])

  useEffect(() => {
    if (
      !userData.id ||
      !userData.name ||
      !userData.username ||
      !userData.postcode
    ) {
      console.log('user data not here', userData)
      setIsRegistered(false)
    } else {
      console.log('user data is here :)', userData)
      setIsRegistered(true)
    }
  }, [userData])

  return isRegistered
}
