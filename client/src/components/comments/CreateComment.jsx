import useForm from "../../components/hooks/useForm"; 
import * as gameService from "../../services/gameService";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const FormValues = {
  comment: "",
};

export default function CreateComment({ gameId, onAddComment }) {
  const { _id: logUserId, email } = useContext(AuthContext);

  const submitHandler = async (formData, resetForm) => {
    const commentWithId = { 
      ...formData, 
      gameId, 
      owner: { _id: logUserId, email } 
    };

    try {
      if (formData.comment === "") {
        alert("The field must be filled");
        return;
      } 
      if (!logUserId) {
        alert("To write a comment, you must be a logged-in user!");
        return;
      } else {
        const savedComment = await gameService.comment(commentWithId);
        onAddComment(savedComment);
        resetForm(); 
      }
    } catch (error) {
      
      console.error("Failed to add comment:", error);
    }
  };

  const { values, onChange, onSubmit, resetForm } = useForm(
    (formData) => submitHandler(formData, resetForm), 
    FormValues
  );

  return (
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" onSubmit={onSubmit}>
        <textarea
          name="comment"
          value={values.comment}
          onChange={onChange}
          placeholder="Comment......"
        />
        <input
          className="btn submit"
          type="submit"
          value="Add Comment"
        />
      </form>
    </article>
  );
}


