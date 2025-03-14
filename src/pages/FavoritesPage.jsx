import { useState, useEffect } from "react";
import favoriteService from "../services/favorite.service";
import ShowSnippet from "../components/ShowSnippet";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const response = await favoriteService.getFavorites();
      setFavorites(response.data);
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="FavoritesPage">
      <h1>Favorite Snippets</h1>
      <div>
        {favorites.length === 0 ? (
          <p>No favorite snippets yet.</p>
        ) : (
          favorites.map((favorite) => (
            <ShowSnippet key={favorite._id} {...favorite.snippet} />
          ))
        )}
      </div>
      
    </div>
  );
}

export default FavoritesPage;