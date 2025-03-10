import { useState, useEffect } from "react";
import snippetService from "../services/snippet.service";
import ShowSnippet from "../components/ShowSnippet";
import AddSnippet from "../components/AddSnippet";

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

  return(
    <div className="Snippet">
      Snippet
      <AddSnippet refreshSnippets={getAllSnippets} />
      {snippets.map(snippet =>(
        <ShowSnippet key={snippet._id} {...snippet} />
      ))}
    </div>
  )
}

export default SnippetPage;