import { useState } from "react";

function FeedCard({ feed, refreshFeeds }) {
  const [commentText, setCommentText] = useState("");
  const [commentUser, setCommentUser] = useState("");
  const [showComments, setShowComments] = useState(false);

  const likeFeed = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/like`, { method: "PUT" });
    refreshFeeds();
  };

  const dislikeFeed = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/dislike`, { method: "PUT" });
    refreshFeeds();
  };

  const deleteFeed = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}`, { method: "DELETE" });
    refreshFeeds();
  };

  const addComment = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: commentText, user: commentUser }),
    });
    setCommentText("");
    setCommentUser("");
    refreshFeeds();
  };

  const likeComment = async (commentId) => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/comments/${commentId}/like`, {
      method: "PUT",
    });
    refreshFeeds();
  };

  const dislikeComment = async (commentId) => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/comments/${commentId}/dislike`, {
      method: "PUT",
    });
    refreshFeeds();
  };

  const deleteComment = async (commentId) => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/comments/${commentId}`, {
      method: "DELETE",
    });
    refreshFeeds();
  };

  return (
    <article className="card stack">
      <div className="row">
        <h2>{feed.title}</h2>
        <div className="row">
          <button type="button" onClick={likeFeed}>👍 {feed.likes}</button>
          <button type="button" onClick={dislikeFeed}>👎 {feed.dislikes}</button>
          <button type="button" onClick={deleteFeed}>Delete</button>
        </div>
      </div>

      <p>{feed.body}</p>

      <div className="row muted">
        <span>Posted by {feed.user}</span>
        <span>{new Date(feed.createdAt).toLocaleString()}</span>
      </div>

      <section className="comments divider">
        <button
          type="button"
          className={showComments ? "open" : ""}
          onClick={() => setShowComments((open) => !open)}
        >
          <span>Comments ({feed.comments.length})</span>
          <span>▼</span>
        </button>

        {showComments && (
          <div className="stack">
            <input
              type="text"
              placeholder="Write a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your name"
              value={commentUser}
              onChange={(e) => setCommentUser(e.target.value)}
            />
            <button type="button" onClick={addComment}>Comment</button>

            {feed.comments.length === 0 ? (
              <p className="muted">No comments yet.</p>
            ) : (
              feed.comments.map((comment) => (
                <div key={comment._id} className="card">
                  <p><strong>{comment.user}</strong></p>
                  <p>{comment.comment}</p>
                  <div className="row">
                    <button type="button" onClick={() => likeComment(comment._id)}>
                      Like {comment.likes}
                    </button>
                    <button type="button" onClick={() => dislikeComment(comment._id)}>
                      Dislike {comment.dislikes}
                    </button>
                    <button type="button" onClick={() => deleteComment(comment._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </article>
  );
}

export default FeedCard;
