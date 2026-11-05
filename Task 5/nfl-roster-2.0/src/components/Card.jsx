import { Link } from 'react-router-dom';

//clickablecard
function Card({ to, className = '', children }) {
  return (
    <li>
      <Link className={`card ${className}`} to={to}>
        {children}
      </Link>
    </li>
  );
}

export default Card;
