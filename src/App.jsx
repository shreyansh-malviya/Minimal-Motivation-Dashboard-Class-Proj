import { useState, useEffect } from "react";
import "./App.css";

// Components
import QuoteCard from "./components/QuoteCard";
import QuoteActions from "./components/QuoteActions";
import LikedList from "./components/LikedList";

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
  // Current quote shown in the card
  const [quote, setQuote] = useState(null);

  // true while waiting for the API response
  const [loading, setLoading] = useState(false);

  // Full quote objects the user has liked
  const [likedQuotes, setLikedQuotes] = useState([]);

  function getRandomFallback() {
    const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
    return FALLBACK_QUOTES[randomIndex];
  }

  // Fetch a quote from the API; use local fallback if API fails
  async function fetchQuote() {
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      // dummyjson returns { id, quote, author } — normalize field names
      if (data && data.quote) {
        setQuote({
          _id: String(data.id),
          content: data.quote,
          author: data.author,
        });
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.log("API failed, using fallback quote:", error.message);
      setQuote(getRandomFallback());
    } finally {
      setLoading(false);
    }
  }

  // Fetch a quote automatically on first render
  useEffect(function () {
    fetchQuote();
  }, []);

  // Add the current quote to the liked list
  function toggleLike() {
    if (!quote) return;

    var alreadyLiked = likedQuotes.some(function (q) {
      return q._id === quote._id;
    });

    if (alreadyLiked) {
      unlikeQuote(quote._id);
    } else {
      setLikedQuotes([...likedQuotes, quote]);
    }
  }

  // Remove a quote from the liked list by ID
  function unlikeQuote(id) {
    setLikedQuotes(likedQuotes.filter(function (q) {
      return q._id !== id;
    }));
  }

  // Is the currently displayed quote in the liked list?
  var isCurrentLiked = quote
    ? likedQuotes.some(function (q) { return q._id === quote._id; })
    : false;

  return (
    <div className="app">
      <h1 className="title">Daily Motivation</h1>
      <p className="subtitle">A fresh quote to brighten your day ☀️</p>

      {/* Card: shows the quote or loading state */}
      <QuoteCard quote={quote} loading={loading} />

      {/* Buttons: New Quote + Like */}
      <QuoteActions
        onNewQuote={fetchQuote}
        onToggleLike={toggleLike}
        loading={loading}
        isLiked={isCurrentLiked}
        hasQuote={!!quote}
      />

      {/* Liked count */}
      <p className="liked-count">
        Total liked: <strong>{likedQuotes.length}</strong>
      </p>

      {/* List of all liked quotes with unlike buttons */}
      <LikedList likedQuotes={likedQuotes} onUnlike={unlikeQuote} />
    </div>
  );
}

export default App;
