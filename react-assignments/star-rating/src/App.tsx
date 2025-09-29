import StarRating from './StarRating';

function App() {
    const handleRatingChange = (rating: number) => {
        console.log('Rating changed to:', rating);
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1>Star Rating Component Examples</h1>

            <div style={{ marginBottom: '2rem' }}>
                <h2>Basic Usage</h2>
                <StarRating />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h2>Custom Number of Stars</h2>
                <StarRating numberOfStars={3} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h2>With Callback</h2>
                <StarRating
                    numberOfStars={5}
                    onRatingChange={handleRatingChange}
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h2>With Initial Rating</h2>
                <StarRating
                    numberOfStars={5}
                    initialRating={2}
                    onRatingChange={handleRatingChange}
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h2>Different Sizes</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div>
                        <p>Small:</p>
                        <StarRating size="small" numberOfStars={5} />
                    </div>
                    <div>
                        <p>Medium:</p>
                        <StarRating size="medium" numberOfStars={5} />
                    </div>
                    <div>
                        <p>Large:</p>
                        <StarRating size="large" numberOfStars={5} />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h2>Disabled State</h2>
                <StarRating
                    numberOfStars={5}
                    initialRating={3}
                    disabled={true}
                />
            </div>
        </div>
    );
}

export default App;