import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Header() {
  const { email, accessToken } = useContext(AuthContext);

  const isAuthenticated = !!accessToken;

  return (
    <header>
      {/* Navigation */}
      <h1>
        <Link className="home" to="/">
          GamesPlay
        </Link>
      </h1>
      <nav>
        <Link to="/games">All games</Link>

        {isAuthenticated ? (
          <div id="user">
            <Link to="/create">Create Game</Link>
            <Link to="/logout">Logout</Link>
            <p className="helloUsername">| Hello  {email}</p>
          </div>
        ) : (
          <div id="guest">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
