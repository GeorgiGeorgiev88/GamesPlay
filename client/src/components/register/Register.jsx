import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useForm from "../hooks/useForm";

const RegisterKeys = {
  Email: "email",
  Password: "password",
  ConfirmPassword: "confirmPassword",
};

export default function Register() {
  const { registerSubmitHandler } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    [RegisterKeys.Email]: "",
    [RegisterKeys.Password]: "",
    [RegisterKeys.ConfirmPassword]: "",
  });

  return (
    <section id="register-page" className="content auth">
      <form id="register" onSubmit={onSubmit}>
        <div className="container">
          <div className="brand-logo" />
          <h1>Register</h1>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            value={values[RegisterKeys.Email]}
            placeholder="name@email.com"
          />
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            id="register-password"
            onChange={onChange}
            value={values[RegisterKeys.Password]}
          />
          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name={RegisterKeys.ConfirmPassword}
            id="confirm-password"
            onChange={onChange}
            value={values[RegisterKeys.ConfirmPassword]}
          />
          <input className="btn submit" type="submit" defaultValue="Register" />
          <p className="field">
            <span>
              If you already have profile click <Link to="/login">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
