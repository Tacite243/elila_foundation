"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginPopupProps {
  onClose: () => void; // Fonction pour fermer la popup
}

const LoginPopup = ({ onClose }: LoginPopupProps) => {
  const [isRegister, setIsRegister] = useState(false); // État pour basculer entre login et register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // État pour les erreurs
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = isRegister ? "/api/auth/register" : "/api/auth/login";
      const { data } = await axios.post(url, { email, password });
      if (!isRegister) {
        document.cookie = `token=${data.token}; path=/`; // Sauvegarde du token
        router.push("/admin"); // Redirection après connexion
      }
      alert(data.message || "Succès");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Une erreur est survenue");
      } else {
        setError("Une erreur inconnue est survenue");
      }
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        {/* Bouton de fermeture */}
        <button className="close-button" onClick={onClose} aria-label="Fermer">
          &times;
        </button>

        <h2 className="title-with-underline">
          {isRegister ? "Créer un compte" : "Connexion"}
          <span className="underline">
            <span></span>
          </span>
        </h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">
            {isRegister ? "Créer un compte" : "Se connecter"}
          </button>
        </form>
        <p>
          {isRegister
            ? "Déjà un compte ?"
            : "Vous n'avez pas de compte ?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Se connecter" : "Créer un compte"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
