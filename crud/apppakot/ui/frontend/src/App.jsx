import { useEffect, useState } from "react";
import FeedCard from "./FeedCard";

function App() {
  const [feeds, setFeeds] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function refreshFeeds() {
    const res = await fetch("http://localhost:3000/feeds?page=1&limit=5");
    const data = await res.json();
    setFeeds(data);
    setPage(2);
    setHasMore(data.length === 5);
  }

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);

    const res = await fetch(
      "http://localhost:3000/feeds?page=" + page + "&limit=5"
    );
    const data = await res.json();

    setFeeds((prev) => [...prev, ...data]);
    setPage(page + 1);

    if (data.length < 5) setHasMore(false);

    setLoading(false);
  }

  async function addFeed() {
    await fetch("http://localhost:3000/feeds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, user }),
    });

    setTitle("");
    setBody("");
    setUser("");
    refreshFeeds();
  }

  useEffect(() => {
    refreshFeeds();
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        loadMore();
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, loading, hasMore]);

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
