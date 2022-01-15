import { Cancel } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <p>Craic</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="nombre de usuario" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="Contraseña"
          ref={passwordRef}
        />
        <button className="loginBtn" type="submit">
          Iniciar Sesión
        </button>
        {error && <span className="failure">Datos incorrectos</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
