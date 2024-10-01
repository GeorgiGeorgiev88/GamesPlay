import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import * as gameServise from "../../services/gameService";

export default function Comments({
  comment,
  commnetId,
  owner: { email, _id: creatorId },
  onDeleteComment,
}) {
  const { _id: logUserId } = useContext(AuthContext);

  const deleteSubmitHandler = async () => {
    const hasConfirm = confirm(`Are you sure? Your comment "${comment}" will be deleted permanently.`);
    if (hasConfirm) {
      await gameServise.removeComment(commnetId);
      onDeleteComment(commnetId); 
    }
  };

  return (
    <li className="comment">
      <p>
        {email}: {comment}
      </p>
      {logUserId === creatorId ? (
        <div className="buttons">
          <button className="button" onClick={deleteSubmitHandler}>Delete</button>
        </div>
      ) : null}
    </li>
  );
}
