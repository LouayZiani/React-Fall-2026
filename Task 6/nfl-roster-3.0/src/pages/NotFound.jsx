import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

function NotFound() {
  useDocumentTitle('404');
  return (
    <section className="not-found">
      <h1 className="sr-only">Page not found</h1>
      <img className="not-found-gif" src={`${import.meta.env.BASE_URL}404.gif`} alt="404, page not found" />
      <div className="detail-actions">
        <Link className="btn" to="/">Back to home</Link>
      </div>
    </section>
  );
}

export default NotFound;
