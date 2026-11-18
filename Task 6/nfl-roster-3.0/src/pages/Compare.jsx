
import { useSearchParams } from 'react-router-dom';
import {
  usePlayer,
  usePlayerOptions,
} from '../hooks/usePlayers';
import useDocumentTitle from '../hooks/useDocumentTitle';
import StatusMessage from '../components/StatusMessage';

// "better: true" means a bigger number gets highlighted in the comparison.
const rows = [
  { label: 'Team', get: (p) => p.team },
  { label: 'Position', get: (p) => p.position },
  { label: 'Jersey number', get: (p) => p.number },
  { label: 'Age', get: (p) => p.age },
  { label: 'College', get: (p) => p.college || 'Not listed' },
  { label: 'Years in the NFL', get: (p) => p.yearsPro, better: true },
  {
    label: 'Height',
    get: (p) => p.height,
    show: (v) => `${Math.floor(v / 12)}'${v % 12}"`,
    better: true,
  },
  {
    label: 'Weight',
    get: (p) => p.weight,
    show: (v) => `${v} lb`,
    better: true,
  },
];

function Compare() {
  useDocumentTitle('Compare');

  const [params, setParams] = useSearchParams();
  const a = params.get('a') ?? '';
  const b = params.get('b') ?? '';

  const options = usePlayerOptions();
  const playerA = usePlayer(a);
  const playerB = usePlayer(b);

  function setSlot(key, value) {
    const next = new URLSearchParams(params);

    if (value) next.set(key, value);
    else next.delete(key);

    setParams(next);
  }

  function swap() {
    const next = new URLSearchParams();

    if (b) next.set('a', b);
    if (a) next.set('b', a);

    setParams(next);
  }

  function picker(label, key, value) {
    return (
      <label>
        {label}
        <select
          value={value}
          onChange={(e) => setSlot(key, e.target.value)}
        >
          <option value="">Choose a player</option>
          {(options.data ?? []).map((o) => (
            <option key={o.id} value={o.id}>
              {o.name} ({o.position}, {o.team})
            </option>
          ))}
        </select>
      </label>
    );
  }

  let result;

  if ((a && playerA.isPending) || (b && playerB.isPending)) {
    result = <StatusMessage type="loading" message="Loading players..." />;
  } else if (
    (a && playerA.isError && playerA.error.status === 404) ||
    (b && playerB.isError && playerB.error.status === 404)
  ) {
    result = (
      <StatusMessage
        type="error"
        message="One of those players does not exist."
        actionLabel="Clear selection"
        onAction={() => setParams({})}
      />
    );
  } else if ((a && playerA.isError) || (b && playerB.isError)) {
    result = (
      <StatusMessage
        type="error"
        message={(a && playerA.isError ? playerA.error : playerB.error).message}
        actionLabel="Try again"
        onAction={() => {
          if (a) playerA.refetch();
          if (b) playerB.refetch();
        }}
      />
    );
  } else {
    const pa = a ? playerA.data : null;
    const pb = b ? playerB.data : null;

    if (!pa || !pb) {
      result = (
        <StatusMessage
          type="empty"
          message="Pick two players to compare them."
        />
      );
    } else {
      result = (
        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Stat</span>
                </th>
                <th scope="col">{pa.name}</th>
                <th scope="col">{pb.name}</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => {
                const va = row.get(pa);
                const vb = row.get(pb);
                const show = row.show || ((v) => v);
                const lead =
                  row.better && va !== vb ? (va > vb ? 'a' : 'b') : '';

                return (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td className={lead === 'a' ? 'lead' : ''}>
                      {show(va)}
                    </td>
                    <td className={lead === 'b' ? 'lead' : ''}>
                      {show(vb)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <>
      <div className="toolbar">
        <h1>Compare players</h1>
      </div>

      {options.isPending && (
        <StatusMessage type="loading" message="Loading player list..." />
      )}

      {options.isError && (
        <StatusMessage
          type="error"
          message={options.error.message}
          actionLabel="Try again"
          onAction={options.refetch}
        />
      )}

      {!options.isPending && !options.isError && (
        <div className="filters filters-short">
          {picker('Player A', 'a', a)}
          {picker('Player B', 'b', b)}

          <button
            className="btn btn-plain"
            onClick={swap}
            disabled={!a && !b}
          >
            Swap
          </button>
        </div>
      )}

      {result}
    </>
  );
}

export default Compare;
