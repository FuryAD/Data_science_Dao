import { render, screen } from '@testing-library/react'
import ProjectGrid from '@/components/ProjectGrid'

describe('ProjectGrid', () => {
    it('renders the project grid', () => {
        render(<ProjectGrid />)
        expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument()
    })

    it('displays project cards', () => {
        render(<ProjectGrid />)
        const cards = screen.getAllByRole('article')
        expect(cards.length).toBeGreaterThan(0)
    })

    it('shows project titles', () => {
        render(<ProjectGrid />)
        // Should have at least one project title
        const headings = screen.getAllByRole('heading', { level: 3 })
        expect(headings.length).toBeGreaterThan(0)
    })

    it('displays donation buttons', () => {
        render(<ProjectGrid />)
        const donateButtons = screen.getAllByRole('button', { name: /donate/i })
        expect(donateButtons.length).toBeGreaterThan(0)
    })
})
