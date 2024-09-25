import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as gameService from "../../services/gameService";

export default function Edit() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    maxLevel: 100,
    imageUrl: '',
    summary: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await gameService.edit(formData, gameId)
      navigate("/games"); 
    } catch (err) {
      console.log(err);
    }
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

 
  useEffect(() => {
    gameService.getOne(gameId).then((result) => {
      setFormData(result);
      setIsLoading(false);  
    });
  }, [gameId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="create-page" className="auth">
      <form id="create" onSubmit={handleSubmit}>
        <div className="container">
          <h1>Edit Game</h1>
          
          <label htmlFor="leg-title">Legendary title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter game title..."
          />
          
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter game category..."
          />
          
          <label htmlFor="levels">MaxLevel:</label>
          <input
            type="number"
            id="maxLevel"
            name="maxLevel"
            value={formData.maxLevel}
            onChange={handleChange}
            min={1}
            placeholder={1}
          />
          
          <label htmlFor="game-img">Image:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Upload a photo..."
          />
          
          <label htmlFor="summary">Summary:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            id="summary"
          />
          
          <input className="btn submit" type="submit" value="Edit Game" />
        </div>
      </form>
    </section>
  );
}
