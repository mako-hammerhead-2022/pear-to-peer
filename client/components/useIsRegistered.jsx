import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { fetchUserByAuth0Id } from '@/slices/userData'

export function useIsRegistered() {
  const dispatch = useDispatch()
  const [isRegistered, setIsRegistered] = useState(null)
  const { user } = useAuth0()
  const { loading, data: userData } = useSelector((state) => state.userData)

  useEffect(() => {
    console.log('isRegistered user useEffect ran, user is', user)
    if (user) {
      console.log(
        'dispatching fetchUserByAuth0Id from isRegistered, user is',
        user
      )
      dispatch(fetchUserByAuth0Id(user.sub))
    }
  }, [user])

  // useEffect(() => {
  //   if (
  //     (!userData.id ||
  //       !userData.name ||
  //       !userData.username ||
  //       !userData.postcode) &&
  //     !loading &&
  //     user
  //   ) {
  //     console.log('user data not here', userData)
  //     setIsRegistered(false)
  //   } else {
  //     console.log('user data is here :)', userData)
  //     setIsRegistered(true)
  //   }
  // }, [userData])

  useEffect(() => {
    console.log(
      'isRegistered userData useEffect firing, userData is',
      userData,
      'loading status is',
      loading
    )

    // if the extra userData from the db has loaded
    if (userData.id) {
      //// if all the data is there (they are a registered user)
      ////// set isRegistered to true
      setIsRegistered(true)
    } else if (!userData.id && loading === 'done' && userData.auth0Id != '') {
      //// else if there is missing data (they are not registered), loading is done and the auth0 data is present
      ////// set isRegistered to false
      console.log(
        'setting isRegistered to false with userData',
        userData,
        'and loading state',
        loading
      )
      setIsRegistered(false)
    } else if (loading === 'pending') {
      //for testing
      console.log(
        'isRegistered userData useEffect is fired with loading state',
        loading
      )
    }
  }, [userData])

  return isRegistered
}
