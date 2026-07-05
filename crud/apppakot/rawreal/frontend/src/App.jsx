import {useEffect, useState} from "react";
import "./App.css";

function App(){
    const [feeds, setFeeds] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [user, setUser] = useState("");
    const [commentText, setCommentText] = useState("");
    const [commentUser, setCommentUser] = useState("");

    const getFeeds = async () => {
        const response = await fetch("http://localhost:3000/feeds");
        const data = await response.json();
        setFeeds(data);
    }
    const addFeed = async () => {
        const response = await fetch ("http://localhost:3000/feeds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, body, user})
        })
        const data = await response.json();
        setTitle("");
        setBody("");
        setUser("");
        getFeeds();
    }

    const likeFeed = async (id) => {  
        await fetch (`http://localhost:3000/feeds/${id}/like`, {
        method: "PUT"
    });
    getFeeds();
}
   const dislikeFeed = async (id) => {  
        await fetch (`http://localhost:3000/feeds/${id}/dislike`, {
        method: "PUT"
   });
    getFeeds();
}

const deleteFeed = async (id) => {
    await fetch (`http://localhost:3000/feeds/${id}`, {
        method: "DELETE"
    });
    getFeeds();
}

const addComment = async (id) => {
    await fetch (`http://localhost:3000/feeds/${id}/comment`, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            comment: commentText,
            user: commentUser
        })
    })

    setCommentText("");
    setCommentUser("");

    getFeeds();
}

const likeComment = async (feedId, commentId) => {  
        await fetch (`http://localhost:3000/feeds/${feedId}/comments/${commentId}/like`, {
        method: "PUT"
    });
    getFeeds();
}
   const dislikeComment = async (feedId, commentId) => {  
        await fetch (`http://localhost:3000/feeds/${feedId}/comments/${commentId}/dislike`, {
        method: "PUT"
   });
    getFeeds();
}

const deleteComment = async (feedId, commentId) => {  
        await fetch (`http://localhost:3000/feeds/${feedId}/comments/${commentId}`, {
        method: "DELETE"
   });
    getFeeds();
}


    useEffect (()=> {
        getFeeds();
    },[]);


    return (
        <div className="app">
            <h1>Feeds</h1>

            <form className="feed-form">
                <div className="feed-form-fields">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
                    <input type="text" placeholder="User" value={user} onChange={(e) => setUser(e.target.value)} />
                </div>
                <button type="submit" onClick={addFeed}>Add Feed</button>
            </form>

            <div className="feed-list">
            {feeds.map((feed)=>(
                <div key={feed._id} className="feed-card">
                    <div className="feed-header">
                        <h2>{feed.title}</h2>
                        <div className="feed-actions">
                            <button onClick={ () => likeFeed(feed._id)}> {feed.likes} Like</button>
                            <button onClick={ () => dislikeFeed(feed._id)}> {feed.dislikes} Dislike</button>
                            <button onClick={ () => deleteFeed(feed._id)}>Delete</button>
                        </div>
                    </div>
                    <p>{feed.body}</p>
                    <div className="feed-meta">
                        <p>Posted by: {feed.user}</p>
                        <p>{new Date(feed.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="comments-section">
                        <h3>Comments</h3>
                        <form className="comment-form">
                            <div className="comment-form-fields">
                                <input type="text" placeholder="Comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                                <input type="text" placeholder="User" value={commentUser} onChange={(e) => setCommentUser(e.target.value)} />
                            </div>
                            <button type="submit" onClick={() => addComment(feed._id)}>Add Comment</button>
                        </form>
                        <div className="comment-list">
                        {feed.comments.map((comment)=>(
                            <div key={comment._id} className="comment-card">
                                <p>{comment.user}</p>
                                <p>{comment.comment}</p>
                                <div className="comment-actions">
                                    <button onClick={ () => likeComment(feed._id, comment._id)}> {comment.likes} Like</button>
                                    <button onClick={ () => dislikeComment(feed._id, comment._id)}> {comment.dislikes} Dislike</button>
                                    <button onClick={ () => deleteComment(feed._id, comment._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
)}

export default App;