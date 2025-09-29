import { useState } from 'react';
import './App.css'

interface StarRatingProps {
  numberOfStars?: number;
  onRatingChange?: (rating: number) => void;
  initialRating?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

function StarRating({
  numberOfStars = 5,
  onRatingChange,
  initialRating = -1,
  disabled = false,
  size = 'medium'
}: StarRatingProps) {
  // Validate and sanitize numberOfStars
  const validatedNumberOfStars = Math.max(0, Math.floor(numberOfStars));
  const validatedInitialRating = Math.min(Math.max(-1, Math.floor(initialRating)), validatedNumberOfStars - 1);

  const [selectedRating, setSelectedRating] = useState(validatedInitialRating);
  const [hoveredRating, setHoveredRating] = useState(-1);

  const handleMouseEnter = (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>, i: number) => {
    if (disabled) return;
    setHoveredRating(i);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setHoveredRating(-1);
  };

  const handleClick = (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>, i: number) => {
    if (disabled) return;
    setSelectedRating(i);
    onRatingChange?.(i + 1); // Rating is 1-based for external API
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, i: number) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const syntheticMouseEvent = {
        ...e,
        type: 'mousedown'
      } as unknown as React.MouseEvent<HTMLSpanElement, MouseEvent>;
      handleClick(syntheticMouseEvent, i);
    }
  };

  // Return empty div if no stars to render
  if (validatedNumberOfStars <= 0) {
    return <div className="card" data-testid="star-rating-empty"></div>;
  }

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'star-small';
      case 'large': return 'star-large';
      default: return '';
    }
  };

  return (
    <div
      className={`card ${disabled ? 'disabled' : ''}`}
      role="radiogroup"
      aria-label={`Star rating, ${validatedNumberOfStars} stars available`}
    >
      {new Array(validatedNumberOfStars).fill(1).map((_, i) => {
        const isActive = i <= (hoveredRating >= 0 ? hoveredRating : selectedRating);
        return (
          <span
            key={i}
            className={`star ${getSizeClass()} ${isActive ? 'golden' : ''}`}
            onMouseEnter={(e) => handleMouseEnter(e, i)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={(e) => handleClick(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            tabIndex={disabled ? -1 : 0}
            role="radio"
            aria-checked={i <= selectedRating}
            aria-label={`${i + 1} star${i === 0 ? '' : 's'}`}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            {isActive ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
}

export default StarRating

