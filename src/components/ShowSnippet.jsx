import { Link } from "react-router-dom";

function ShowSnippet ({title, code, language, tags,  _id}){
  return(
    <div className="SnippetCard">
      <h2>{title}</h2>
      <p>{code}</p>
      <p>Language: {language}</p>
      <p>tags: {tags ? tags.join(", ") : "None"}</p>
    </div>
  );
}

export default ShowSnippet