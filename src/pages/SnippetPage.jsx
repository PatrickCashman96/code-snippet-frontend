import { useState, useEffect } from "react";
import snippetService from "../services/snippet.service";
import ShowSnippet from "../components/ShowSnippet";

function SnippetPage(){
  const [snippets, setSnippets] = useState([]);

  const getAllSnippets = async () => {    
    try {
      const response = await snippetService.getAllSnippets();
      setSnippets(response.data);  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllSnippets();
    
  },[]);

  console.log(snippets)
  return(
    <div className="Snippet">
      <h1>Snippets</h1>
      {snippets.map(snippet =>(
        <ShowSnippet key={snippet._id} {...snippet}/>
      ))}
    </div>
  )
}

export default SnippetPage;