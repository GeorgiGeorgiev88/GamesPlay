import useForm from "../../components/hooks/useForm"; 
import * as gameService from "../../services/gameService";

const FormValues = {
  comment: "",
};

export default function CreateComment({ gameId, onAddComment }) {
  const submitHandler = async (formData) => {
    const commentWithId = { ...formData, gameId };

    try {
      if (formData.comment === "") {
        alert("The field must be filled");
        return;
      } else {
        const savedComment = await gameService.comment(commentWithId);
        onAddComment(savedComment);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const { values, onChange, onSubmit } = useForm(submitHandler, FormValues);

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
          defaultValue="Add Comment"
        />
      </form>
    </article>
  );
}

