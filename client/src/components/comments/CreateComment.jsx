import { useState } from "react";
import * as gameService from "../../services/gameService";

const FormValues = {
  comment: "",
};

export default function CreateComment({ gameId, onAddComment }) {
  const [comment, setComment] = useState(FormValues);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setComment((prevComm) => ({ ...prevComm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentWithId = { ...comment, gameId };
   
    try {
      if ( comment.comment === "") {
        alert("The fild must be fill");
        return;
      } else {
        const savedComment = await gameService.comment(commentWithId);
        onAddComment(savedComment);
        setComment(FormValues);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" onSubmit={handleSubmit}>
        {/* <input
          className="userNameInput"
          name="userName"
          value={comment.userName}
          onChange={changeHandler}
          placeholder="Username......"
        /> */}
        <textarea
          name="comment"
          value={comment.comment}
          onChange={changeHandler}
          placeholder="Comment......"
        />
        <input
          className="btn submit"
          type="submit"
          defaultValue="Add Comment"
        />
      </form>
    </article>
  );
}
