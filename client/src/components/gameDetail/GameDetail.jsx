import { useParams,useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import * as gameService from "../../services/gameService";
import { Link } from "react-router-dom";

import Comments from "../comments/Comments";
import CreateComment from "../comments/CreateComment";
import AuthContext from "../../context/AuthContext";

export default function GameDetail() {
  const { _id: logUserId, email } = useContext(AuthContext);
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const { gameId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    gameService
      .getOne(gameId)
      .then(setGame)
      .catch((error) => console.error("Failed to fetch game:", error));

    gameService
      .getComments(gameId)
      .then(setComments)
      .catch((error) => console.error("Failed to fetch comments:", error));
  }, [gameId]);

  const handleAddComment = (newComment) => {
    const commentWithOwner = {
      ...newComment,
      owner: {
        _id: logUserId,
        email,
      },
    };

    setComments((prevComments) => [...prevComments, commentWithOwner]);
  };

  if (!game) {
    return <p>Loading...</p>;
  }

  const deleteButtonClickHandler = async()=>{
    const hasConfirm = confirm(`Are you sure you want to delete ${game.title}`);
    if(hasConfirm){
      await gameService.deleteOne(gameId);
      navigate("/games");
    }
  }


  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={game.imageUrl} alt={game.title} />
          <h1>{game.title}</h1>
          <span className="levels">MaxLevel: {game.maxLevel}</span>
          <p className="type">{game.category}</p>
        </div>
        <p className="text">{game.summary}</p>
        <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comments key={comment._id} {...comment} />
              ))
            ) : (
              <p className="no-comment">No comments.</p>
            )}
            {game._ownerId === logUserId ? (
              <div className="buttons">
                <Link  to={`/edit/${game._id}`} className="button">
                  Edit
                </Link>
               <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
              </div>
            ) : null}
          </ul>
        </div>
      </div>
      <CreateComment gameId={gameId} onAddComment={handleAddComment} />
    </section>
  );
}
