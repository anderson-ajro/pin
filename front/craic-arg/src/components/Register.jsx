import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <p>Craic</p>

      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="Nombre de usuario" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input
          type="Contraseña"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="registerBtn" type="submit">
          Registro
        </button>
        {success && (
          <span className="success">Registro exitoso, podés ingresar a Craic</span>
        )}
        {error && <span className="failure">Auch, sucedio algo inesperado, por favor intentar nuevamente</span>}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
}
