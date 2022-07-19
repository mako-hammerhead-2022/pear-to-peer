import {render, screen} from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AboutUs from '@/components/AboutUs'

describe('<AboutUs />', () => {
  it('shows a heading', () => {
    render(<AboutUs />, {wrapper: Router})
    expect(screen.getByRole('heading', {name: /About Us/i})).toBeInTheDocument()
  })
})