import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

export default function Comments({
  comment,
  owner: { email, _id: creatorId },
}) {
  const { _id: logUserId } = useContext(AuthContext);

  return (
    <li className="comment">
      <p>
        {email}: {comment}
      </p>
      {logUserId === creatorId ? (
        <div className="buttons">
          <a href="#" className="button">
            Delete
          </a>
        </div>
      ) : null}
    </li>
  );
}

