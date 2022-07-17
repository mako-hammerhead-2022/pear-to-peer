import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '@/slices/userData'

// eslint-disable-next-line no-unused-vars
export async function cacheUser(useAuth0) {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.userData)

  const { isAuthenticated, getAccessTokenSilently, user } = useAuth0()

  if (isAuthenticated && !currentUser?.token) {
    try {
      const userToSave = {
        auth0Id: user.sub,
        email: user.email,
        token: '',
      }

      userToSave.token = await getAccessTokenSilently()

      dispatch(setLoggedInUser({ userToSave }))
    } catch (err) {
      console.error(err)
    }
  }
}
