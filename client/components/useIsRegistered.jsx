import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUserByAuth0Id } from '@/slices/userData'

export function useIsRegistered() {
  const dispatch = useDispatch()
  const [isRegistered, setIsRegistered] = useState(null)
  const { user } = useAuth0()
  const { loading, data: userData } = useSelector((state) => state.userData)

  useEffect(() => {
    if (user) {
      dispatch(fetchUserByAuth0Id(user.sub))
    }
  }, [user])

  useEffect(() => {
    // if the extra userData from the db has loaded
    if (userData.id) {
      //// if all the data is there (they are a registered user)
      ////// set isRegistered to true
      setIsRegistered(true)
    } else if (!userData.id && loading === 'done' && userData.auth0Id != '') {
      //// else if there is missing data (they are not registered), loading is done and the auth0 data is present
      ////// set isRegistered to false
      setIsRegistered(false)
    }
  }, [userData])

  return isRegistered
}
