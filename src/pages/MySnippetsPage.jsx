import { useState, useEffect, useContext } from "react";
import snippetService from "../services/snippet.service";
import ShowSnippet from "../components/ShowSnippet";
import AddSnippet from "../components/AddSnippet";
import { AuthContext } from "../context/auth.context";

function MySnippetsPage(){
  const [snippets, setSnippets] = useState([]);
  const {user} = useContext(AuthContext)
  
  const getAllSnippets = async() =>{
    try{
      const response = await snippetService.getAllSnippets();
      setSnippets(response.data);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    getAllSnippets();
  },[]);

  console.log(snippets);

  return(
    <div className="Page">
      <AddSnippet refreshSnippets = {getAllSnippets}/>
      {snippets.map(snippet => {
        if(user._id === snippet.createdBy._id){
          return <ShowSnippet key={snippet._id} {...snippet} refreshSnippets={getAllSnippets}/>
        }  
      })}
    </div>
  )

}


export default MySnippetsPage;