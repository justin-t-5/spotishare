import { Routes, Route, Link } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import { useState } from "react";
import './App.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <nav>
        <h1>spotishare</h1>
          <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="nav-search"
        />
        <div>
          <Link to="/">Feed</Link> <Link to="/create">Upload</Link>
        </div>
       
      </nav>

      <Routes>
        <Route path="/" element={<FeedPage searchTerm={searchTerm} />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/post/:id" element={<DetailPage />} />
        <Route path="/post/:id/edit" element={<EditPage />} />
      </Routes>
    </div>
  );
}
