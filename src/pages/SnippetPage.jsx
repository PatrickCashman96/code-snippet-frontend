import { useState, useEffect } from "react";
import snippetService from "../services/snippet.service";
import ShowSnippet from "../components/ShowSnippet";
function SnippetPage(){
  const [snippets, setSnippets] = useState([]);

  const getAllProjects = async () => {    
    try {
      const response = await snippetService.getAllSnippets();
      setSnippets(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllProjects();
  },[]);

  return(
    <div className="Snippet">
      Snippet
      {snippets.map(snippet =>{
        <ShowSnippet key={snippet._id} {...snippet} />
      })}
    </div>
  )
}

export default SnippetPage;