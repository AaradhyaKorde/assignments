import { useEffect, useRef, useState } from "react";
import FeedCard from "./FeedCard";

const API = "http://localhost:3000/feeds";
const LIMIT = 5;

function App() {
  const [feeds, setFeeds] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const page = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadMore = async (reset = false) => {
    if (loadingRef.current || (!reset && !hasMoreRef.current)) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      if (reset) {
        page.current = 1;
        hasMoreRef.current = true;
        setHasMore(true);
      }

      const res = await fetch(`${API}?page=${page.current}&limit=${LIMIT}`);
      const data = await res.json();

      setFeeds((prev) => (reset ? data : [...prev, ...data]));
      hasMoreRef.current = data.length === LIMIT;
      setHasMore(hasMoreRef.current);
      page.current += 1;
    } catch (err) {
      console.log(err);
    }

    loadingRef.current = false;
    setLoading(false);
  };

  const refreshFeeds = () => loadMore(true);

  const addFeed = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, user }),
    });

    setTitle("");
    setBody("");
    setUser("");
    refreshFeeds();
  };

  useEffect(() => {
    loadMore();

    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header>
        <h1>Feed App</h1>
        <p className="muted">Share posts and join the conversation</p>
      </header>

      <section className="card stack">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button type="button" className="primary" onClick={addFeed}>
          Post
        </button>
      </section>

      <section className="stack feeds">
        {feeds.map((feed) => (
          <FeedCard key={feed._id} feed={feed} refreshFeeds={refreshFeeds} />
        ))}
      </section>

      {loading && <p className="muted center">Loading...</p>}
      {!hasMore && feeds.length > 0 && (
        <p className="muted center">You're all caught up</p>
      )}
    </>
  );
}

export default App;
