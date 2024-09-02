import { useState, useEffect } from "react";
import * as gameService from "../../services/gameService";
import { Link } from "react-router-dom";

export default function Home() {
  const [games, setGames] = useState([]);
  const [lastGame, setLastGame] = useState([]);



  // console.log(`all games -> ${games}`);
  // console.log(`last games -> ${lastGame}`);

  useEffect(() => {
    gameService.getAll().then((data) => setGames(data));
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      setLastGame(games[games.length - 1]);
    }
  }, [games]);

  const lastGameId = lastGame._id

  return (
    <section id="welcome-world">
      <div className="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
      </div>
      <img src="./images/four_slider_img01.png" alt="hero" />
      <div id="home-page">
        <h1>Last Added Game</h1>

        {games.length > 0 ? (
          <div className="game">
            <div className="image-wrap">
              <img src={lastGame.imageUrl} />
            </div>
            <h3>{lastGame.title}</h3>
            {/* <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
              </div> */}
            <div className="data-buttons">
              <Link to={`/games/${lastGameId}`} className="btn details-btn">
                Details
              </Link>
            </div>
          </div>
        ) : (
          <p className="no-articles">No games yet</p>
        )}
      </div>
    </section>
  );
}
