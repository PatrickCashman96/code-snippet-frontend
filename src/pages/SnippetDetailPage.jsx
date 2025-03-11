import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import snippetService from "../services/snippet.service";
import favoriteService from "../services/favorite.service";
import { AuthContext } from "../context/auth.context";

function SnippetDetailPage(){
  const { id } = useParams(); // Get snippet ID from URL
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const { user } = useContext(AuthContext); // Get logged-in user

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await snippetService.getSnippet(id);
        setSnippet(response.data);

        // Check if snippet is favorited
        const favResponse = await favoriteService.getFavorites();
        const favorite = favResponse.data.find((fav) => fav.snippet._id === id);
        if (favorite) {
          setIsFavorited(true);
          setFavoriteId(favorite._id);
        }
      } catch (error) {
        console.error("Error fetching snippet:", error);
      }
    };
    fetchSnippet();
  }, [id]);

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorited) {
        await favoriteService.removeFavorite(favoriteId);
        setIsFavorited(false);
        setFavoriteId(null);
      } else {
        const response = await favoriteService.addFavorite(id);
        setIsFavorited(true);
        setFavoriteId(response.data._id);
      }
    } catch (error) {
      console.error("Favorite action failed");
    }
  };

  const handleDelete = async () => {
    try {
      await snippetService.deleteSnippet(id);
      navigate("/snippets"); // Redirect to snippet list
    } catch (error) {
      console.error("Failed to delete snippet");
    }
  };

  if (!snippet) return <p>Loading...</p>;

  return (
    <div>
      <h2>title: {snippet.title}</h2>
      <pre>Snippet: {snippet.code}</pre>
      <p><strong>Language:</strong> {snippet.language}</p>
      <p><strong>Created By:</strong> {snippet.createdBy.name}</p>
      <p><strong>Created At:</strong> {new Date(snippet.createdAt).toLocaleString()}</p>

      <button onClick={handleFavoriteToggle}>
        {isFavorited ? "Unfavorite" : "Favorite"}
      </button>

      {/* Show Edit/Delete buttons only for the owner */}
      {user?._id === snippet.createdBy._id && (
        <div>
          <button onClick={() => navigate(`/snippets/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

    </div>
  );
};

export default SnippetDetailPage;