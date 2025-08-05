import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import './EditPage.css';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [artist, setArtist] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getPost();
  }, []);

  async function getPost() {
    const { data } = await supabase.from("reviews").select("*").eq("id", id).single();
    setTitle(data.title);
    setType(data.type);
    setArtist(data.artist);
    setReview(data.review);
    setRating(data.rating);
    setLink(data.link);
    setImage(data.image);
  }

async function handleUpdate(e) {
  e.preventDefault();
  setLoading(true);
  const { error } = await supabase
    .from("reviews")
    .update({ title, type, artist, review, rating, link, image })
    .eq("id", id);
  setLoading(false);

  if (error) {
    alert("Update failed: " + error.message);
    return;
  }
  navigate("/");
}


  async function handleDelete() {
    await supabase.from("reviews").delete().eq("id", id);
    navigate("/");
  }

  return (
    <div className="containeredit">
      <h1>Edit Post</h1>
      <form onSubmit={handleUpdate}>
        <p>Title of Album/Song:</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <p>Artist Name:</p>
        <input value={artist} onChange={(e) => setArtist(e.target.value)} />
        <p>Album or Song?</p>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Album">Album</option>
          <option value="Song">Song</option>
        </select>
        <p>Rating:</p>
         <select value={rating} onChange={(e) => setRating(e.target.value)}>
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
        rows={5}           
        style={{ resize: "vertical" }} 
        />
        <p>Spotify Link to Album or Song: </p>
        <input value={link} onChange={(e) => setLink(e.target.value)} />
        <p>Album or Song Cover Image URL:</p>
        <input  value={image} onChange={(e) => setImage(e.target.value)} />
        <div>
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
        </div>
      </form>
    </div>
  );
}
