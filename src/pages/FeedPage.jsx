import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import './FeedPage.css';

export default function SummaryPage({searchTerm}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      console.error("Fetch error:", error);
      return;
    }
    setPosts(data);
  }
return (
  <div className="container">
    <h1>Music Posts</h1>
     <div className="filter-buttons">
    <button onClick={fetchPosts} disabled={loading}>
      {loading ? "Loading..." : "Refresh List"}
    </button>
    {errorMsg && <p className="error-message">Error: {errorMsg}</p>}
    {!loading && posts.length === 0 && <p>No Posts Found.</p>}
    <button onClick={() => setFilter("All")}>All</button>
    <button onClick={() => setFilter("Album")}>Albums</button>
    <button onClick={() => setFilter("Song")}>Songs</button>
    </div>

<ul className="posts">
  {posts
    .filter((c) => filter === "All" || c.type === filter) // album/song filter
    .filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) // search filter
    )
    .map((c) => (
      <li key={c.id}>
        <div className="reviewcard">
          <div className="imglink">
            <img src={c.image} alt={`${c.title} cover`} />
            <a href={c.link} target="_blank" rel="noopener noreferrer">
              Listen On Spotify
            </a>
          </div>
          <div className="reviewinfo">
            <div>
              <a className="toprow" href={`/post/${c.id}`}>
                {c.title}: {c.artist}
              </a>
              <p className="bottomrow">
                {c.type} - {c.rating}/10
              </p>
              <p className="date">
                {new Date(c.created_at).toLocaleDateString()}
              </p>
              <p className="review">Review: {c.review}</p>
            </div>
            <a
              className="edit"
              href={`/post/${c.id}/edit`}
              style={{ marginLeft: "1rem" }}
            >
              Edit
            </a>
          </div>
        </div>
      </li>
        ))}
</ul>

  </div>
);

}
