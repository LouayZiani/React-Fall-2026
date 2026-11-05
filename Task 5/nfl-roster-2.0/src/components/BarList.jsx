import { Link } from 'react-router-dom';

//thebreakdown here is shown as horizontal bars. anything with a "to" becomes link
function BarList({ title, items }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <section className="breakdown">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label} className="bar-row">
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
            <span className="bar" aria-hidden="true">
              <span style={{ width: `${(item.count / max) * 100}%` }} />
            </span>
            <span className="bar-count">{item.count}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BarList;
