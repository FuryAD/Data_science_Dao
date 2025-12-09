import { render, screen } from '@testing-library/react'
import Home from '../app/page'

describe('Home Page', () => {
    it('renders hero heading', () => {
        render(<Home />)
        const heading = screen.getByText(/Quadratic Funding/i)
        expect(heading).toBeInTheDocument()
    })

    it('renders connect wallet button', () => {
        render(<Home />)
        const button = screen.getByRole('button', { name: /Connect Wallet/i })
        expect(button).toBeInTheDocument()
    })
})
