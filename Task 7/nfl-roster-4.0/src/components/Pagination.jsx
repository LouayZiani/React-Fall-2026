function Pagination({ page, totalPages, onPageChange }) {
  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="btn btn-plain" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button className="btn btn-plain" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}

export default Pagination;
