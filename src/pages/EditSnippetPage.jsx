import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import snippetService from "../services/snippet.service";

function EditSnippetPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    code: "",
    language: "",
    tags: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await snippetService.getSnippet(id);
        const { title, code, language, tags } = response.data;
        setForm({ title, code, language, tags: tags.join(", ") });
      } catch (error) {
        console.error("Failed to fetch snippet:", error);
      }
    };

    fetchSnippet();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { 
      title: form.title,
      code: form.code,
      language: form.language,
      tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [],
    };

    try {
      await snippetService.updateSnippet(id, requestBody);
      navigate("/my-snippets");
    } catch (error) {
      setError(error.response?.data?.error || "Failed to update snippet");
    }
  };

  return (
    <div className="EditSnippet">
      <h3>Edit Snippet</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} required />

        <label>Code:</label>
        <textarea name="code" value={form.code} onChange={handleChange} required />

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
        <input type="text" name="tags" value={form.tags} onChange={handleChange} placeholder="ML, AI, Frontend..." />

        <button type="submit">Update Snippet</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default EditSnippetPage;
