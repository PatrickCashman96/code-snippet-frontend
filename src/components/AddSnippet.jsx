import { useState } from "react";
import snippetService from "../services/snippet.service";
import { useNavigate } from "react-router-dom";

function AddSnippet(props){
  const [form, setForm] = useState({
    title:"",
    code:"",
    language:"",
    tags:"",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleChange  = (e) =>{
    const{name,value} = e.target;
    setForm(prev => ({...prev,[name]:value}));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const requestBody = { 
      title: form.title,
      code: form.code,
      language: form.language,
      tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [], // Convert to array
    };
    
    try {
      await snippetService.createSnippet(requestBody);
      props.refreshSnippets();
      setForm({ title: "", code: "", language: "", tags: "" });
    } catch (error) {
      setError(error.response?.data.error || "Failed to add snippet");
    }
  };


  return (
    <div className="LoginPage">
      <h3>Add Snippet</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Code:</label>
        <textarea
          name="code"
          value={form.code}
          onChange={handleChange}
          required
        />

        <label>Language:</label>
        <select name="language" value={form.language} onChange={handleChange} required>
          <option value="">Select a language</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="Rust">Rust</option>
          <option value="C++">C++</option>
          <option value="C#">C#</option>
          <option value="C">C</option>
          <option value="Go">Go</option>
          <option value="PHP">PHP</option>
        </select>

        <label>Tags:</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder= "ML, AI, Frontend, Backend, BI.."
        />

        <button type="submit">Add Snippet</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default AddSnippet;