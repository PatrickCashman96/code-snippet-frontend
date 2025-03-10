import { useState } from "react";
import snippetService from "../services/snippet.service";

function AddSnippet(props){
  const [form, setForm] = useState({
    title:"",
    code:"",
    language:"",
    tags:"",
  });
  
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
      tags: form.tags
    };
    
    try {
      await snippetService.createSnippet(requestBody);
      props.refreshSnippets();
      setForm({ title: "", code: "", language: "", tags: "" });
    } catch (error) {
      console.log(error.response?.data.error || error);
    }
  };


  return (
    <div className="SignupPage">
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
        />

        <button type="submit">Add Snippet</button>
      </form>
    </div>
  );
}

export default AddSnippet;