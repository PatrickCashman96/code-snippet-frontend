import { Link } from "react-router-dom";

function ShowSnippet ({title, snippet, description, likes, user, _id}){
  return(
    <div className="Snippets list">
      <h2>{title}</h2>
      <h3>From: {user}</h3>
      <p>{snippet}</p>
      <p>{description}</p>
      <p>Likes: {likes}</p>
    </div>
  )
}

export default ShowSnippet