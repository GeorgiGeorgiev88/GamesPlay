import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import * as gameService from "../../services/gameService";

import Comments from "../comments/Comments";
import CreateComment from "../comments/CreateComment";
import AuthContext from "../../context/AuthContext";

export default function GameDetail() {
  const { _id: logUserId, email } = useContext(AuthContext); 
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const { gameId } = useParams();

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
          </ul>
        </div>
      </div>
      <CreateComment gameId={gameId} onAddComment={handleAddComment} />
    </section>
  );
}
