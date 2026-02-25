// QuoteCard.jsx
// Shows the current quote (text + author), a loading message, or a prompt to start.
// Receives the quote object and loading flag as props from App.

function QuoteCard({ quote, loading }) {
    return (
        <div className="card">
            {loading ? (
                // While fetching, show a loading placeholder
                <p className="loading-text">Loading quote...</p>
            ) : quote ? (
                <>
                    {/* The quote body */}
                    <p className="quote-text">"{quote.content}"</p>
                    {/* The author */}
                    <p className="quote-author">— {quote.author}</p>
                </>
            ) : (
                // Shown before the very first quote loads
                <p className="loading-text">Click "New Quote" to start.</p>
            )}
        </div>
    );
}

export default QuoteCard;
