import '@fontsource/pacifico'
import '@fontsource/heebo'
import '@fontsource/prompt'

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
    heading: 'prompt',
    body: 'prompt',
  },
})

export default theme
