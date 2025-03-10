import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import favoriteService from "../services/favorite.service";

function ShowSnippet ({title, code, language, tags,  _id}){
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await favoriteService.getFavorites();
        const favorite = response.data.find((fav) => fav.snippet._id === _id);
        if (favorite) {
          setIsFavorited(true);
          setFavoriteId(favorite._id);
        }
      } catch (error) {
        console.error(error.response?.data);
      }
    };
    checkFavorite();
  }, [_id]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorited) {
        await favoriteService.removeFavorite(favoriteId);
        setIsFavorited(false);
        setFavoriteId(null);
        setError("");
      } else {
        const response = await favoriteService.addFavorite(_id);
        setIsFavorited(true);
        setFavoriteId(response.data._id);
        setError("");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Favorite action failed");
    }
  };

  return (
    <div className="SnippetCard">
      <h2>{title}</h2>
      <pre>{code}</pre>
      <p>Language: {language}</p>
      <p>Tags: {tags ? tags.join(", ") : "None"}</p>
      <Link to={`/snippets/${_id}`}>View Details</Link>
      <button onClick={handleFavoriteToggle}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}