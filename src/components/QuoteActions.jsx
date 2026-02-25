// QuoteActions.jsx
// Renders the two action buttons: "New Quote" and "Like / Liked".
// All logic (fetchQuote, toggleLike) lives in App and is passed as props.

function QuoteActions({ onNewQuote, onToggleLike, loading, isLiked, hasQuote }) {
    return (
        <div className="buttons">
            {/* New Quote button — disabled while a fetch is in progress */}
            <button
                className="btn"
                onClick={onNewQuote}
                disabled={loading}
            >
                {loading ? "Fetching..." : "New Quote"}
            </button>

            {/* Like button — disabled while loading or before first quote appears */}
            <button
                className={"btn like-btn" + (isLiked ? " liked" : "")}
                onClick={onToggleLike}
                disabled={loading || !hasQuote}
            >
                {isLiked ? "❤️ Liked" : "🤍 Like"}
            </button>
        </div>
    );
}

export default QuoteActions;
