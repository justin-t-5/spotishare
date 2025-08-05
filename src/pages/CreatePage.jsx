import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import './CreatePage.css';

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [artist, setArtist] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase.from("reviews").insert([{ title,type, artist, rating, review, image, link }]);

    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
      console.error("Insert error:", error);
      return;
    }
    // Successfully added, navigate to summary page
    navigate("/");
  }

return (
  <div className="containercreate">
    <h1>Create Post</h1>
    <form onSubmit={handleSubmit}>
    <p>Title of Album/Song:</p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        disabled={loading}
      />
    <p>Artist Name:</p>  
        <input
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        required
        disabled={loading}
      />
     <p>Album or Song?</p>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        disabled={loading}
      >
        <option value="">Select Role</option>
        <option value="Album">Album</option>
        <option value="Song">Song</option>
      </select>
      <p>Rating:</p>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        disabled={loading}>
          <option value= {0}>0</option>
          <option value= {1}>1</option>
          <option value= {2}>2</option>
          <option value= {3}>3</option>
          <option value= {4}>4</option>  
          <option value= {5}>5</option>
          <option value= {6}>6</option>
          <option value= {7}>7</option>
          <option value= {8}>8</option>
          <option value= {9}>9</option>
          <option value= {10}>10</option>     
      </select>
      <p>Review:</p>
       <textarea
  value={review}
  onChange={(e) => setReview(e.target.value)}
  required
  disabled={loading}
  rows={5}           // controls height
  style={{ resize: "vertical" }}  // optional, allow vertical resize only
/>

      <p>Spotify Link to Album or Song:</p>
    <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
        disabled={loading}
      />
      <p>Album or Song Cover Image URL:</p>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        disabled={loading}
      />
      <div>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Post"}
      </button>
      </div>
    </form>
    {errorMsg && <p className="error-message">{errorMsg}</p>}
  </div>
);

}