# Star Rating Component

A robust, accessible, and customizable React star rating component with comprehensive test coverage.

## Features

- ⭐ Customizable number of stars (1-infinity)
- 🖱️ Mouse hover and click interactions
- ⌨️ Keyboard accessibility (Enter/Space to select)
- 🎨 Multiple size options (small, medium, large)
- 🚫 Disabled state support
- 📞 Callback function for rating changes
- 🛡️ Error-proof with edge case handling
- 🧪 Comprehensive test coverage
- ♿ ARIA-compliant accessibility

## Usage

```tsx
import StarRating from './StarRating';

function App() {
  const handleRatingChange = (rating: number) => {
    console.log('User rated:', rating);
  };

  return (
    <StarRating 
      numberOfStars={5}
      initialRating={3}
      onRatingChange={handleRatingChange}
      size="medium"
      disabled={false}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `numberOfStars` | `number` | `5` | Number of stars to display |
| `initialRating` | `number` | `-1` | Initial rating (0-based, -1 = no rating) |
| `onRatingChange` | `(rating: number) => void` | - | Callback when rating changes |
| `disabled` | `boolean` | `false` | Disable interactions |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Star size |

## Edge Cases Handled

1. **Zero or negative stars**: Renders empty container safely
2. **Floating point numbers**: Automatically floors to integer
3. **Very large numbers**: Handles up to 1000+ stars efficiently
4. **Invalid initial ratings**: Clamps to valid range
5. **Keyboard navigation**: Full keyboard support with focus indicators
6. **Disabled state**: Prevents all interactions when disabled

## Test Coverage

The component includes 20 comprehensive test cases covering:

### Rendering Tests
- Default 5 stars rendering
- Custom number of stars
- Initial empty state

### Edge Cases
- Zero stars
- Negative numbers
- Large numbers (1000+ stars)
- Floating point numbers

### Mouse Interactions
- Hover highlighting
- Click selection
- Persistent selection
- Hover overrides

### CSS Classes
- Correct class application
- Golden star styling

### Accessibility
- Keyboard navigation
- ARIA attributes
- Focus management

### Component State
- Multiple rating changes
- State persistence

### Performance
- Efficient rendering with large numbers

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Accessibility Features

- **ARIA roles**: Uses `radiogroup` and `radio` roles
- **Keyboard support**: Enter/Space keys for selection
- **Focus indicators**: Clear focus outlines
- **Screen reader support**: Descriptive labels and states
- **Semantic HTML**: Proper semantic structure

## Styling

The component uses CSS classes that can be customized:

- `.card`: Main container
- `.star`: Individual star styling
- `.golden`: Filled/selected stars
- `.star-small`, `.star-large`: Size variants
- `.disabled`: Disabled state styling

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with appropriate polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Efficient rendering even with 1000+ stars
- Optimized event handlers
- Minimal re-renders
- CSS transitions for smooth interactions