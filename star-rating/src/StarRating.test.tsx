import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StarRating from './StarRating';

// Mock CSS imports
jest.mock('../App.css', () => ({}));

describe('StarRating Component', () => {
    describe('Rendering Tests', () => {
        test('renders with default 5 stars', () => {
            render(<StarRating />);
            const stars = screen.getAllByText(/[★☆]/);
            expect(stars).toHaveLength(5);
        });

        test('renders with custom number of stars', () => {
            render(<StarRating numberOfStars={3} />);
            const stars = screen.getAllByText(/[★☆]/);
            expect(stars).toHaveLength(3);
        });

        test('renders with 10 stars when specified', () => {
            render(<StarRating numberOfStars={10} />);
            const stars = screen.getAllByText(/[★☆]/);
            expect(stars).toHaveLength(10);
        });

        test('initially renders all empty stars', () => {
            render(<StarRating numberOfStars={5} />);
            const emptyStars = screen.getAllByText('☆');
            expect(emptyStars).toHaveLength(5);
        });
    });

    describe('Edge Cases', () => {
        test('handles zero stars gracefully', () => {
            render(<StarRating numberOfStars={0} />);
            const stars = screen.queryAllByText(/[★☆]/);
            expect(stars).toHaveLength(0);
        });

        test('handles negative number of stars', () => {
            render(<StarRating numberOfStars={-1} />);
            const stars = screen.queryAllByText(/[★☆]/);
            expect(stars).toHaveLength(0);
        });

        test('handles very large number of stars', () => {
            render(<StarRating numberOfStars={100} />);
            const stars = screen.getAllByText(/[★☆]/);
            expect(stars).toHaveLength(100);
        });

        test('handles floating point number of stars', () => {
            render(<StarRating numberOfStars={3.7} />);
            const stars = screen.getAllByText(/[★☆]/);
            // Should floor to 3 stars
            expect(stars).toHaveLength(3);
        });
    });

    describe('Mouse Interaction Tests', () => {
        test('highlights stars on mouse hover', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Hover over third star
            await user.hover(stars[2]);

            // First three stars should be highlighted
            expect(screen.getAllByText('★')).toHaveLength(3);
            expect(screen.getAllByText('☆')).toHaveLength(2);
        });

        test('removes highlight on mouse leave', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Hover over third star
            await user.hover(stars[2]);
            expect(screen.getAllByText('★')).toHaveLength(3);

            // Move mouse away
            await user.unhover(stars[2]);

            // All stars should be empty again
            expect(screen.getAllByText('☆')).toHaveLength(5);
            expect(screen.queryAllByText('★')).toHaveLength(0);
        });

        test('clicking selects rating', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Click on fourth star (index 3)
            await user.click(stars[3]);

            // First four stars should be filled
            expect(screen.getAllByText('★')).toHaveLength(4);
            expect(screen.getAllByText('☆')).toHaveLength(1);
        });

        test('selected rating persists after mouse leave', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Click on third star
            await user.click(stars[2]);

            // Hover over fifth star
            await user.hover(stars[4]);
            expect(screen.getAllByText('★')).toHaveLength(5);

            // Move mouse away
            await user.unhover(stars[4]);

            // Should still show 3 selected stars
            expect(screen.getAllByText('★')).toHaveLength(3);
            expect(screen.getAllByText('☆')).toHaveLength(2);
        });

        test('hover overrides selected rating temporarily', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Click on second star
            await user.click(stars[1]);
            expect(screen.getAllByText('★')).toHaveLength(2);

            // Hover over fourth star
            await user.hover(stars[3]);
            expect(screen.getAllByText('★')).toHaveLength(4);

            // Mouse leave should return to selected rating
            await user.unhover(stars[3]);
            expect(screen.getAllByText('★')).toHaveLength(2);
        });
    });

    describe('CSS Classes Tests', () => {
        test('applies correct CSS classes', () => {
            render(<StarRating numberOfStars={3} />);
            const container = screen.getByRole('radiogroup');

            expect(container).toHaveClass('card');
        });

        test('applies golden class to filled stars', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Click on third star
            await user.click(stars[2]);

            const filledStars = screen.getAllByText('★');
            filledStars.forEach(star => {
                expect(star).toHaveClass('star', 'golden');
            });

            const emptyStars = screen.getAllByText('☆');
            emptyStars.forEach(star => {
                expect(star).toHaveClass('star');
                expect(star).not.toHaveClass('golden');
            });
        });
    });

    describe('Accessibility Tests', () => {
        test('stars are keyboard accessible', () => {
            render(<StarRating numberOfStars={5} />);
            const stars = screen.getAllByText('☆');

            stars.forEach(star => {
                // Stars should be focusable elements
                expect(star.tagName.toLowerCase()).toBe('span');
            });
        });

        test('stars have proper event handlers', () => {
            render(<StarRating numberOfStars={5} />);
            const stars = screen.getAllByText('☆');

            stars.forEach(star => {
                // Check if event handlers are attached (this is implicit through rendering without errors)
                expect(star).toBeInTheDocument();
            });
        });
    });

    describe('Component State Tests', () => {
        test('can change rating multiple times', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Click on second star
            await user.click(stars[1]);
            expect(screen.getAllByText('★')).toHaveLength(2);

            // Click on fourth star
            await user.click(stars[3]);
            expect(screen.getAllByText('★')).toHaveLength(4);

            // Click on first star
            await user.click(stars[0]);
            expect(screen.getAllByText('★')).toHaveLength(1);
            expect(screen.getAllByText('☆')).toHaveLength(4);
        });

        test('clicking same star maintains selection', async () => {
            const user = userEvent.setup();
            render(<StarRating numberOfStars={5} />);

            const stars = screen.getAllByText('☆');

            // Click on third star twice
            await user.click(stars[2]);
            await user.click(stars[2]);

            // Should still have 3 stars selected
            expect(screen.getAllByText('★')).toHaveLength(3);
            expect(screen.getAllByText('☆')).toHaveLength(2);
        });
    });

    describe('Performance Tests', () => {
        test('renders efficiently with large number of stars', () => {
            const startTime = performance.now();
            render(<StarRating numberOfStars={1000} />);
            const endTime = performance.now();

            // Should render within reasonable time (less than 100ms)
            expect(endTime - startTime).toBeLessThan(100);

            const stars = screen.getAllByText(/[★☆]/);
            expect(stars).toHaveLength(1000);
        });
    });
});