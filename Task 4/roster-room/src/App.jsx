import { useState, useEffect } from "react";
import {
  getItemsList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "./api/fakeApi.js";
import PlayerDetails from "./components/PlayerDetails.jsx";
import PlayerForm from "./components/PlayerForm.jsx";
import DevPanel from "./components/DevPanel.jsx";
import { PAGE_SIZE, STATUS_LABEL } from "./constants.js";
import logo from "./assets/nba.png";

const stamp = (msg) => (prev) =>
  [`${new Date().toLocaleTimeString()}  ${msg}`, ...prev].slice(0, 14);

export default function App() {
  const [items, setItems] = useState([]);
  const [listStatus, setListStatus] = useState("loading");
  const [listError, setListError] = useState("");
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailStatus, setDetailStatus] = useState("idle");
  const [detailError, setDetailError] = useState("");
  const [detailKey, setDetailKey] = useState(0);

  const [busy, setBusy] = useState({});
  const [form, setForm] = useState(null);
  const [notice, setNotice] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    let ignore = false;
    setListStatus("loading");
    setLog(stamp(`REQUEST  list  page ${page}, "${search}", ${sort}`));

    const query = `?${new URLSearchParams({ search, sort, page, limit: PAGE_SIZE })}`;

    getItemsList(query)
      .then((res) => {
        if (ignore) {
          setLog(stamp(`DROPPED  list  stale response (page ${page}, "${search}")`));
          return;
        }
        if (res.totalPages > 0 && res.page > res.totalPages) {
          setPage(res.totalPages);
          return;
        }
        setItems(res.data);
        setTotal(res.total);
        setTotalPages(Math.max(res.totalPages, 1));
        setListStatus("success");
        setLog(stamp(`OK       list  applied (${res.data.length} rows)`));
      })
      .catch((err) => {
        if (ignore) return;
        setListError(err.message);
        setListStatus("error");
        setLog(stamp(`FAILED   list  ${err.message}`));
      });

    return () => {
      ignore = true;
    };
  }, [search, sort, page, reloadKey]);

  useEffect(() => {
    if (selectedId === null) {
      setDetail(null);
      setDetailStatus("idle");
      return;
    }

    let ignore = false;
    setDetail(null);
    setDetailError("");
    setDetailStatus("loading");
    setLog(stamp(`REQUEST  #${selectedId}  scouting report`));

    getItem(selectedId)
      .then((player) => {
        if (ignore) {
          setLog(stamp(`DROPPED  #${selectedId}  outdated report`));
          return;
        }
        setDetail(player);
        setDetailStatus("success");
        setLog(stamp(`OK       #${selectedId}  report shown`));
      })
      .catch((err) => {
        if (ignore) return;
        setDetailError(err.message);
        setDetailStatus("error");
        setLog(stamp(`FAILED   #${selectedId}  ${err.message}`));
      });

    return () => {
      ignore = true;
    };
  }, [selectedId, detailKey]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 4500);
    return () => clearTimeout(timer);
  }, [notice]);

  const notify = (type, text) => setNotice({ type, text });
  const markBusy = (id, label) => setBusy((prev) => ({ ...prev, [id]: label }));
  const clearBusy = (id) =>
    setBusy((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  function applyUpdated(updated) {
    setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setDetail((cur) => (cur && cur.id === updated.id ? updated : cur));
  }

  async function changeStatus(playerId, nextStatus) {
    if (busy[playerId]) return;
    markBusy(playerId, "updating");
    try {
      const updated = await updateItem(playerId, { status: nextStatus });
      applyUpdated(updated);
      notify("success", `${updated.name} is now ${STATUS_LABEL[nextStatus].toLowerCase()}.`);
    } catch (err) {
      notify("error", `Couldn't update player #${playerId}: ${err.message}`);
    } finally {
      clearBusy(playerId);
    }
  }

  async function removePlayer(playerId) {
    if (busy[playerId]) return;
    markBusy(playerId, "removing");
    try {
      await deleteItem(playerId);
      setItems((prev) => prev.filter((p) => p.id !== playerId));
      setSelectedId((cur) => (cur === playerId ? null : cur));
      setReloadKey((k) => k + 1);
      notify("success", `Player #${playerId} removed from the roster.`);
    } catch (err) {
      notify("error", `Couldn't remove player #${playerId}: ${err.message}`);
    } finally {
      clearBusy(playerId);
    }
  }

  async function savePlayer(values) {
    if (form.mode === "edit") {
      const id = form.player.id;
      if (busy[id]) throw new Error("This player is busy, try again in a moment.");
      markBusy(id, "saving");
      try {
        const updated = await updateItem(id, values);
        applyUpdated(updated);
        setForm(null);
        notify("success", `${updated.name} saved.`);
      } finally {
        clearBusy(id);
      }
      return;
    }

    const { name, description, ...rest } = values;
    const created = await createItem({ name, description });
    try {
      await updateItem(created.id, rest);
      notify("success", `${name} signed to the roster.`);
    } catch {
      notify("error", `${name} was created, but the extra fields failed to save. Open Edit to finish the profile.`);
    }
    setForm(null);
    setPage(1);
    setSelectedId(created.id);
    setReloadKey((k) => k + 1);
  }

  const showDetail = detailStatus === "success" && detail && detail.id === selectedId;

  return (
    <div className="app">
      <header className="top">
        <div className="brand">
          <img className="logo" src={logo} alt="NBA" />
          <div>
            <h1>NBA roster</h1>
          </div>
        </div>
        <div className="counter">
          <strong>{total}</strong> players on file
        </div>
      </header>

      {notice && (
        <div className={`toast ${notice.type}`} role="status">
          {notice.text}
          <button onClick={() => setNotice(null)}>Dismiss</button>
        </div>
      )}

      <main className="layout">
        <section className="panel">
          <div className="toolbar">
            <input
              type="search"
              placeholder="Search players"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
              <option value="name">Name A to Z</option>
              <option value="name-desc">Name Z to A</option>
            </select>
            <button onClick={() => setReloadKey((k) => k + 1)} disabled={listStatus === "loading"}>
              Reload
            </button>
            <button className="primary" onClick={() => setForm({ mode: "create" })}>
              Sign player
            </button>
          </div>

          {listStatus === "loading" && (
            <div aria-busy="true">
              {[0, 1, 2, 3].map((n) => (
                <div key={n} className="skeleton row-skeleton" />
              ))}
            </div>
          )}

          {listStatus === "error" && (
            <div className="state error-state">
              <p>Couldn't load the roster: {listError}</p>
              <button onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
            </div>
          )}

          {listStatus === "success" && items.length === 0 && (
            <div className="state">
              <p>
                {search
                  ? `No player matches “${search}”.`
                  : "Nobody on the roster yet."}
              </p>
              {!search && (
                <button className="primary" onClick={() => setForm({ mode: "create" })}>
                  Sign the first player
                </button>
              )}
            </div>
          )}

          {listStatus === "success" && items.length > 0 && (
            <ul className="players">
              {items.map((p) => (
                <li key={p.id}>
                  <button
                    className={`player ${p.id === selectedId ? "active" : ""}`}
                    onClick={() => setSelectedId(p.id)}
                  >
                    <span className="player-head">
                      <span className="player-name">{p.name}</span>
                      {busy[p.id] ? (
                        <span className="badge busy">{busy[p.id]}</span>
                      ) : (
                        <span className={`badge ${p.status}`}>
                          {STATUS_LABEL[p.status] ?? "Unknown"}
                        </span>
                      )}
                    </span>
                    <span className="player-desc">{p.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {listStatus === "success" && totalPages > 1 && (
            <div className="pager">
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
              <span>Page {page} / {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          )}
        </section>

        <aside className="panel detail" aria-live="polite">
          {selectedId === null && (
            <div className="state">
              <p>Pick a player to open the full scouting report.</p>
            </div>
          )}

          {selectedId !== null && detailStatus === "loading" && (
            <div aria-busy="true">
              <p className="muted">Loading scouting report for player #{selectedId}</p>
              <div className="skeleton title-skeleton" />
              <div className="skeleton row-skeleton" />
              <div className="skeleton row-skeleton" />
            </div>
          )}

          {selectedId !== null && detailStatus === "error" && (
            <div className="state error-state">
              <p>Report failed to load: {detailError}</p>
              <button onClick={() => setDetailKey((k) => k + 1)}>Retry</button>
            </div>
          )}

          {showDetail && (
            <PlayerDetails
              key={detail.id}
              player={detail}
              busyLabel={busy[detail.id]}
              onStatus={(next) => changeStatus(detail.id, next)}
              onEdit={() => setForm({ mode: "edit", player: detail })}
              onDelete={() => removePlayer(detail.id)}
              onRefresh={() => setDetailKey((k) => k + 1)}
            />
          )}
        </aside>
      </main>

      <DevPanel log={log} />

      {form && (
        <PlayerForm
          mode={form.mode}
          player={form.player}
          onSubmit={savePlayer}
          onClose={() => setForm(null)}
        />
      )}
    </div>
  );
}
