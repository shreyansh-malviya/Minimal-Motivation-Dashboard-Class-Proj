// LikedList.jsx
// Shows all the liked quotes in a list, each with an "Unlike" button.
// Only renders if there is at least one liked quote.
// Receives the likedQuotes array and the onUnlike handler as props from App.

function LikedList({ likedQuotes, onUnlike }) {
    // Don't render anything if the list is empty
    if (likedQuotes.length === 0) return null;

    return (
        // Section separated from above by a top border
        <div className="mt-8 pt-6 border-t border-gray-200 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Liked Quotes</h2>

            {/* Loop over each liked quote and render a row */}
            {likedQuotes.map(function (likedQuote) {
                return (
                    // Each row: quote text on the left, Unlike button on the right
                    <div key={likedQuote._id} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100">

                        {/* Quote text and author */}
                        <div className="flex-1">
                            <p className="text-gray-700 text-sm leading-relaxed mb-1">"{likedQuote.content}"</p>
                            <p className="text-gray-400 text-xs italic">— {likedQuote.author}</p>
                        </div>

                        {/* Unlike button — calls onUnlike with the quote's ID */}
                        <button
                            onClick={function () { onUnlike(likedQuote._id); }}
                            className="flex-shrink-0 px-3 py-1.5 border border-red-300 text-red-500 text-xs rounded-md bg-white hover:bg-red-50 cursor-pointer"
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
