import axios from "axios";

class SnippetService{
  constructor(){
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
    });

    this.api.interceptors.request.use(config=>{
      const storedToken = localStorage.getItem("authToken");

      if(storedToken){
        config.headers = {Authorization: `Bearer ${storedToken}`};
      }
      return config;
    });
  }
  
  createSnippet = requestBody=>{
    return this.api.post("api/snippets",requestBody);
  };

  getAllSnippets = ()=>{
    return this.api.get("api/snippets");
  };

  getSnippet = id=>{
    return this.api.get(`api/snippets/${id}`);
  };

  updateSnippet =  (id, requestBody) => {
    return this.api.put(`api/snippets/${id}`,requestBody);
  };

  deleteSnippet = id => {
    return this.api.delete(`api/snippets/${id}`);
  };
}

const snippetService = new SnippetService();
export default snippetService;