import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({ title: '404 — Page introuvable' });

  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Nice try, mais c'est pas ici que ça se passe</p>
      <Link to="/">← Retour à l'accueil</Link>
    </div>
  );
}
