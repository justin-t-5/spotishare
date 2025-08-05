import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import './DetailPage.css';

export default function DetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  async function fetchPost() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", id)
      .single();
    setPost(data);
  }

  async function fetchComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", id)
      .order("created_at", { ascending: true });
    setComments(data);
  }

  async function handleUpvote() {
    const { data, error } = await supabase
      .from("reviews")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id)
      .select()
      .single();

    if (!error) setPost(data);
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: id, content: newComment }]);

    if (!error) {
      setNewComment("");
      fetchComments();
    }
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div className="detail">
             <h1>{post.title}</h1>
      <div className="detailInfo">
      <div>
          {post.image && (
        <img src={post.image} alt={`${post.title} cover`} />
      )}
      </div>
      <div>
      <p>Artist: {post.artist}</p>
      <p>Type: {post.type}</p>
      <p>Rating: {post.rating}/10</p>
      <p>Review: {post.review}</p>
      <p>Upvotes: {post.upvotes || 0}</p>
      </div>
      </div>
      <div className="detailButtons">
      {post.link && (
        <p>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            Listen on Spotify
          </a>
        </p>
      )}
      <button onClick={handleUpvote}>Upvote</button>
      <Link className="editpost" to={`/post/${id}/edit`}>Edit Post</Link>
    </div>
      {/* Comments Section */}
      <div className="comments-section">
        <h3>Comments</h3>
          <form onSubmit={handleAddComment}>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
        <ul>
          {comments.map((c) => (
            <li key={c.id}>{c.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
