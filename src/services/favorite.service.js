import axios from "axios";

class FavoriteService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005"
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  addFavorite = (snippetId) => this.api.post("/api/favorites", { snippetId });
  getFavorites = () => this.api.get("/api/favorites");
  removeFavorite = (id) => this.api.delete(`/api/favorites/${id}`);
}

const favoriteService = new FavoriteService();
export default favoriteService;