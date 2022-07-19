import {render, screen} from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import NotFound from '@/components/NotFound'

describe('<NotFound />', () => {
  it('shows 404', () => {
    render(<NotFound />, {wrapper: Router})
    expect(screen.getByRole('heading', {name: /404/})).toBeInTheDocument()
  })
})
