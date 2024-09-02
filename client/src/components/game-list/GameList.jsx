import { useState, useEffect } from "react";
import * as gameService from "../../services/gameService";

import SingleGameCard from "./SingleGame";

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameService.getAll().then((data) => setGames(data));
  }, []);


  return (
    <section id="catalog-page">
      <h1>All Games</h1>

      {games.map((game) => (
        <SingleGameCard key={game._id} {...game} />
      ))}

      {games.length === 0 && <h3 className="no-articles">No articles yet</h3>}
    </section>
  );
}
