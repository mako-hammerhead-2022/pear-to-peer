import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from '@/components/Header'

describe('<Header />', () => {
  it('shows the header', () => {
    render(<Header />, { wrapper: Router })
    expect(
      screen.getByRole('heading', { name: /Pear-to-Peer/i })
    ).toBeInTheDocument()
  })
})
