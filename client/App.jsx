import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'

import { increment } from '@/slices/counterSlice'
import { fetchAllUsers } from './slices/usersSlice'

import Nav from './components/Nav'

// function App() {
//   const count = useSelector((state) => state.counter.value)
//   const dispatch = useDispatch()

//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <img src={logo} className='App-logo' alt='logo' />
//         <p>Hello Vite + React!</p>
//         <p>
//           <button type='button' onClick={() => dispatch(increment())}>
//             count is: {count}
//           </button>
//         </p>
//         <p>
//           Edit <code>App.jsx</code> and save to test HMR updates.
//         </p>
//         <p>
//           <a
//             className='App-link'
//             href='https://reactjs.org'
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             Learn React
//           </a>
//           {' | '}
//           <a
//             className='App-link'
//             href='https://vitejs.dev/guide/features.html'
//             target='_blank'
//             rel='noopener noreferrer'
//           >
//             Vite Docs
//           </a>
//         </p>
//       </header>
//     </div>
//   )
// }

function App() {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  if (!users) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Nav />
      <ul>
        {users.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
