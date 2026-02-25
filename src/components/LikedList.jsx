// LikedList.jsx
// Shows all the liked quotes in a list, each with an "Unlike" button.
// Only renders if there is at least one liked quote.
// Receives the likedQuotes array and the onUnlike handler as props from App.

function LikedList({ likedQuotes, onUnlike }) {
    // Don't render anything if the list is empty
    if (likedQuotes.length === 0) return null;

    return (
        <div className="liked-list">
            <h2 className="liked-list-title">Liked Quotes</h2>

            {/* Loop over each liked quote and render a row */}
            {likedQuotes.map(function (likedQuote) {
                return (
                    <div key={likedQuote._id} className="liked-item">
                        <div className="liked-item-text">
                            <p className="liked-quote-content">"{likedQuote.content}"</p>
                            <p className="liked-quote-author">— {likedQuote.author}</p>
                        </div>

                        {/* Unlike button — calls onUnlike with the quote's ID */}
                        <button
                            className="btn unlike-btn"
                            onClick={function () { onUnlike(likedQuote._id); }}
                        >
                            Unlike
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default LikedList;
