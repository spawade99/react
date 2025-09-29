import { useState } from 'react';
import './App.css'

interface AppProps {
  numberOfStars?: number;
}

function App({ numberOfStars = 5 }: AppProps) {
  const [selectedRating, setSelectedRating] = useState(-1);
  const [hoveredRating, setHoveredRating] = useState(-1);

  const handleMouseEnter = (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>, i: number) => {
    setHoveredRating(i);
  };

  const handleMouseLeave = () => {
    setHoveredRating(-1);
  };

  const handleClick = (_e: React.MouseEvent<HTMLSpanElement, MouseEvent>, i: number) => {
    setSelectedRating(i);
  };

  return (
    <div className="card">
      {new Array(numberOfStars).fill(1).map((_, i) => (
        <span
          key={i}
          className={`star ${i <= (hoveredRating >= 0 ? hoveredRating : selectedRating) ? 'golden' : ''}`}
          onMouseEnter={(e) => handleMouseEnter(e, i)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={(e) => handleClick(e, i)}

        >
          {i <= (hoveredRating >= 0 ? hoveredRating : selectedRating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

export default App
