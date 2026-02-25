// QuoteCard.jsx
// Shows the current quote (text + author), a loading message, or a prompt to start.
// Receives the quote object and loading flag as props from App.

function QuoteCard({ quote, loading }) {
    return (
        // Card container — bordered box with light background
        <div className="border border-gray-200 rounded-xl p-8 bg-gray-50 min-h-[120px] flex flex-col justify-center text-left">
            {loading ? (
                // While fetching, show a centered loading placeholder
                <p className="text-gray-400 text-sm text-center">Loading quote...</p>
            ) : quote ? (
                <>
                    {/* The quote body */}
                    <p className="text-gray-800 text-lg leading-relaxed mb-3">"{quote.content}"</p>
                    {/* The author */}
                    <p className="text-gray-500 text-sm italic">— {quote.author}</p>
                </>
            ) : (
                // Shown before the very first quote loads
                <p className="text-gray-400 text-sm text-center">Click "New Quote" to start.</p>
            )}
        </div>
    );
}

export default QuoteCard;
