import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://dummyjson.com/quotes/random";

const FALLBACK_QUOTES = [
  {
    _id: "fallback-1",
    content: "The secret of getting ahead is getting started. Don't wait. The time will never be just right.",
    author: "Mark Twain",
  },
  {
    _id: "fallback-2",
    content: "Believe you can and you're halfway there. Nothing is impossible to a willing heart and a determined mind.",
    author: "Theodore Roosevelt",
  },
  {
    _id: "fallback-3",
    content: "It does not matter how slowly you go as long as you do not stop. Persistence is the key to success.",
    author: "Confucius",
  },
  {
    _id: "fallback-4",
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts in life.",
    author: "Winston Churchill",
  },
  {
    _id: "fallback-5",
    content: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
    author: "Steve Jobs",
  },
];

function App() {
  // Holds the current quote object (text + author)
  const [quote, setQuote] = useState(null);

  // true while we are waiting for the API response
  const [loading, setLoading] = useState(false);

  const [likedQuotes, setLikedQuotes] = useState([]);

  function getRandomFallback() {
    const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
    return FALLBACK_QUOTES[randomIndex];
  }

  // Fetch a new quote from the API; fall back to local quotes if API fails
  async function fetchQuote() {
    setLoading(true); // show loading state

    try {
      const response = await fetch(API_URL);

      // Check if the HTTP response was successful
      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      // dummyjson returns { id, quote, author } — normalize to { _id, content, author }
      if (data && data.quote) {
        setQuote({
          _id: String(data.id),  // use id as _id
          content: data.quote,   // rename quote → content
          author: data.author,
        });
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      // API failed (e.g. network error, service down) — use a local quote
      console.log("API failed, using fallback quote:", error.message);
      setQuote(getRandomFallback());
    } finally {
      // Always turn off loading, whether success or failure
      setLoading(false);
    }
  }

  // Fetch a quote automatically when the app first loads
  useEffect(function () {
    fetchQuote();
  }, []); // empty array = run once on mount

  // Toggle like for the currently displayed quote
  function toggleLike() {
    if (!quote) return;

    // Check if this quote is already in the liked list (match by _id)
    var alreadyLiked = likedQuotes.some(function (q) {
      return q._id === quote._id;
    });

    if (alreadyLiked) {
      // Remove from liked list
      unlikeQuote(quote._id);
    } else {
      // Add the full quote object so we can display it in the list
      setLikedQuotes([...likedQuotes, quote]);
    }
  }

  // Remove a quote from the liked list by its ID
  function unlikeQuote(id) {
    setLikedQuotes(likedQuotes.filter(function (q) {
      return q._id !== id;
    }));
  }

  // Check if the current quote is liked (used to show button state)
  var isCurrentLiked = quote
    ? likedQuotes.some(function (q) { return q._id === quote._id; })
    : false;

  return (
    <div className="app">
      <h1 className="title">Daily Motivation</h1>
      <p className="subtitle">A fresh quote to brighten your day ☀️</p>

      {/* Quote card — shows loading text or the actual quote */}
      <div className="card">
        {loading ? (
          <p className="loading-text">Loading quote...</p>
        ) : quote ? (
          <>
            {/* The quote text */}
            <p className="quote-text">"{quote.content}"</p>
            {/* The author */}
            <p className="quote-author">— {quote.author}</p>
          </>
        ) : (
          <p className="loading-text">Click "New Quote" to start.</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="buttons">
        {/* New Quote button — disabled while fetching */}
        <button
          className="btn"
          onClick={fetchQuote}
          disabled={loading}
        >
          {loading ? "Fetching..." : "New Quote"}
        </button>

        {/* Like button — disabled while loading or no quote available */}
        <button
          className={"btn like-btn" + (isCurrentLiked ? " liked" : "")}
          onClick={toggleLike}
          disabled={loading || !quote}
        >
          {isCurrentLiked ? "❤️ Liked" : "🤍 Like"}
        </button>
      </div>

      {/* Show total liked count */}
      <p className="liked-count">
        Total liked: <strong>{likedQuotes.length}</strong>
      </p>

      {/* Liked quotes list — only shown when at least one quote is liked */}
      {likedQuotes.length > 0 && (
        <div className="liked-list">
          <h2 className="liked-list-title">Liked Quotes</h2>

          {/* Loop over each liked quote and show it with an unlike button */}
          {likedQuotes.map(function (likedQuote) {
            return (
              <div key={likedQuote._id} className="liked-item">
                <div className="liked-item-text">
                  <p className="liked-quote-content">"{likedQuote.content}"</p>
                  <p className="liked-quote-author">— {likedQuote.author}</p>
                </div>
                {/* Unlike button — removes this quote from the list */}
                <button
                  className="btn unlike-btn"
                  onClick={function () { unlikeQuote(likedQuote._id); }}
                >
                  Unlike
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
