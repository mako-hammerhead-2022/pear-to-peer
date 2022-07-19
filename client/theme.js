import '@fontsource/pacifico'
import '@fontsource/heebo'

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  // components: {
  //   Link: {
  //     sizes: {
  //       xl: {
  //         fontSize: 'lg',
  //       },
  //     },
  //   },
  // },
  fonts: {
    headerFont: 'pacifico',
    heading: 'heebo',
    body: 'heebo',
  },
})

export default theme
