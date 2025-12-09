import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
    it('renders the navbar', () => {
        render(<Navbar />)
        expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('displays the logo', () => {
        render(<Navbar />)
        expect(screen.getByText(/DAO/i)).toBeInTheDocument()
    })

    it('has navigation links', () => {
        render(<Navbar />)
        expect(screen.getByText(/Projects/i)).toBeInTheDocument()
        expect(screen.getByText(/Rounds/i)).toBeInTheDocument()
        expect(screen.getByText(/Governance/i)).toBeInTheDocument()
    })

    it('has wallet connect button', () => {
        render(<Navbar />)
        const connectButton = screen.getByRole('button', { name: /connect/i })
        expect(connectButton).toBeInTheDocument()
    })
})
