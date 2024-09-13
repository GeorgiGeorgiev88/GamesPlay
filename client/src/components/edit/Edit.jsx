import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useForm from "../../components/hooks/useForm";
import * as gameService from "../../services/gameService";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    category: '',
    maxLevel: 100,
    imageUrl: '',
    summary: ''
  });

 
  const handleSubmit = async (formData) => {
    try {
     
      await gameService.edit(gameId, formData);
      navigate("/games");
    } catch (err) {
      console.log(err);
    }
  };


  const { values, onChange, onSubmit, resetForm } = useForm(handleSubmit, initialValues);


  useEffect(() => {
    gameService.getOne(gameId).then((result) => {
      setInitialValues(result); 
      resetForm(result);      
    });
    
  }, [gameId]);

 
  if (!initialValues.title) {
    return <div>Loading...</div>;
  }

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={onSubmit}>
        <div className="container">
          <h1>Edit Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={onChange}
            placeholder="Enter game title..."
          />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={values.category}
            onChange={onChange}
            placeholder="Enter game category..."
          />
          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            value={values.maxLevel}
            onChange={onChange}
            min={1}
            placeholder={1}
          />
          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={values.imageUrl}
            onChange={onChange}
            placeholder="Upload a photo..."
          />
          <label htmlFor="summary">Summary:</label>
          <textarea
            name="summary"
            value={values.summary}
            onChange={onChange}
            id="summary"
          />
          <input className="btn submit" type="submit" value="Edit Game" />
        </div>
      </form>
    </section>
  );
}








