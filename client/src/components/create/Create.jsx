import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as gameService from "../../services/gameService";

const FormValue = {
  title: "",
  category: "",
  maxLevel: "",
  imageUrl: "",
  summary: "",
};

export default function Create() {
  const [formState, setFormState] = useState(FormValue);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await gameService.create(formState);
      setFormState(FormValue);
      navigate("/games");

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Create Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Enter game title..."
          />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formState.category}
            onChange={handleChange}
            placeholder="Enter game category..."
          />
          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            value={formState.maxLevel}
            onChange={handleChange}
            min={1}
            placeholder={1}
          />
          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={handleChange}
            placeholder="Upload a photo..."
          />
          <label htmlFor="summary">Summary:</label>
          <textarea
            name="summary"
            value={formState.summary}
            onChange={handleChange}
            id="summary"
          />
          <input className="btn submit" type="submit" value="Create Game" />
        </div>
      </form>
    </section>
  );
}
