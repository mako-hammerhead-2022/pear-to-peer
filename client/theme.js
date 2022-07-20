import '@fontsource/pacifico'
import '@fontsource/heebo'
import '@fontsource/prompt'

import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    headerFont: 'pacifico',
    heading: 'prompt',
    body: 'prompt',
  },
})

export default theme
