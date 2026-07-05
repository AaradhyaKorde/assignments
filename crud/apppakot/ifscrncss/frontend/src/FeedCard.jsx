import { useState } from "react";

function FeedCard({ feed, refreshFeeds }) {
  const [commentText, setCommentText] = useState("");
  const [commentUser, setCommentUser] = useState("");

  // Like Feed
  const likeFeed = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/like`, {
      method: "PUT",
    });

    refreshFeeds();
  };

  // Dislike Feed
  const dislikeFeed = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/dislike`, {
      method: "PUT",
    });

    refreshFeeds();
  };

  // Delete Feed
  const deleteFeed = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}`, {
      method: "DELETE",
    });

    refreshFeeds();
  };

  // Add Comment
  const addComment = async () => {
    await fetch(`http://localhost:3000/feeds/${feed._id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: commentText,
        user: commentUser,
      }),
    });

    setCommentText("");
    setCommentUser("");

    refreshFeeds();
  };

  // Like Comment
  const likeComment = async (commentId) => {
    await fetch(
      `http://localhost:3000/feeds/${feed._id}/comments/${commentId}/like`,
      {
        method: "PUT",
      }
    );

    refreshFeeds();
  };

  // Dislike Comment
  const dislikeComment = async (commentId) => {
    await fetch(
      `http://localhost:3000/feeds/${feed._id}/comments/${commentId}/dislike`,
      {
        method: "PUT",
      }
    );

    refreshFeeds();
  };

  // Delete Comment
  const deleteComment = async (commentId) => {
    await fetch(
      `http://localhost:3000/feeds/${feed._id}/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

    refreshFeeds();
  };

  return (
    <div className="feed-card">
      <div className="feed-header">
        <h2>{feed.title}</h2>

        <div className="feed-actions">
          <button onClick={likeFeed}>
            👍 {feed.likes}
          </button>

          <button onClick={dislikeFeed}>
            👎 {feed.dislikes}
          </button>

          <button onClick={deleteFeed}>
            Delete
          </button>
        </div>
      </div>

      <p>{feed.body}</p>

      <div className="feed-meta">
        <p>Posted By: {feed.user}</p>

        <p>{new Date(feed.createdAt).toLocaleString()}</p>
      </div>

      <hr />

      <h3>Comments</h3>

      <div className="comment-form">
        <input
          type="text"
          placeholder="Comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <input
          type="text"
          placeholder="User"
          value={commentUser}
          onChange={(e) => setCommentUser(e.target.value)}
        />

        <button type="button" onClick={addComment}>
          Add Comment
        </button>
      </div>

      <div className="comment-list">
        {feed.comments.map((comment) => (
          <div
            key={comment._id}
            className="comment-card"
          >
            <p>
              <strong>{comment.user}</strong>
            </p>

            <p>{comment.comment}</p>

            <div className="comment-actions">
              <button
                onClick={() => likeComment(comment._id)}
              >
                👍 {comment.likes}
              </button>

              <button
                onClick={() => dislikeComment(comment._id)}
              >
                👎 {comment.dislikes}
              </button>

              <button
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedCard;