// QuoteActions.jsx
// Renders the two action buttons: "New Quote" and "Like / Liked".
// All logic (fetchQuote, toggleLike) lives in App and is passed as props.

function QuoteActions({ onNewQuote, onToggleLike, loading, isLiked, hasQuote }) {
    return (
        // Row of buttons, centered with a gap
        <div className="mt-6 flex gap-3 justify-center">

            {/* New Quote button — disabled while a fetch is in progress */}
            <button
                onClick={onNewQuote}
                disabled={loading}
                className="px-5 py-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm cursor-pointer hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {loading ? "Fetching..." : "New Quote"}
            </button>

            {/* Like button — changes style when the current quote is liked */}
            <button
                onClick={onToggleLike}
                disabled={loading || !hasQuote}
                className={`px-5 py-2 border rounded-md text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
          ${isLiked
                        ? "border-red-400 text-red-500 bg-red-50 hover:bg-red-100"
                        : "border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
                    }`}
            >
                {isLiked ? "❤️ Liked" : "🤍 Like"}
            </button>
        </div>
    );
}

export default QuoteActions;
