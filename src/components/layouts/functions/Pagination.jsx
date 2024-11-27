export default function Pagination({ page, totalPage, setPage }) {
  const handlePageChange = (newPage) => {
    window.scrollTo(0, 0);
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const delta = 2;
    const range = [];
    // Generate range of page numbers
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPage - 1, page + delta);
      i++
    ) {
      range.push(i);
    }
    // Add ellipsis if not in range
    if (page - delta > 2) {
      range.unshift("...");
    }
    if (page + delta < totalPage - 1) {
      range.push("...");
    }
    // Add first and last page number
    range.unshift(1);
    if (totalPage > 1) {
      range.push(totalPage);
    }
    // Render buttons
    range.forEach((i, idx) => {
      if (i === "...") {
        buttons.push(
          <button
            key={idx}
            className="px-4 h-full text-gray-700 bg-white border border-gray-400 hover:bg-gray-100 hover:text-gray-700"
            disabled
          >
            ...
          </button>
        );
      } else {
        buttons.push(
          <button
            key={idx}
            onClick={() => handlePageChange(i)}
            className={`px-4 h-full text-gray-700 bg-white border border-gray-400 hover:bg-gray-100 hover:text-gray-700 ${
              i === page ? "font-bold" : ""
            }`}
          >
            {i}
          </button>
        );
      }
    });
    // Return buttons
    return buttons;
  };

  return (
    <div className="mt-4 flex justify-end">
      <ul className="flex -space-x-px h-10">
        <button
          onClick={() => handlePageChange(page - 1)}
          className="px-4 h-full text-gray-700 bg-white border border-gray-400 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          disabled={page === 1}
        >
          Previous
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(page + 1)}
          className="px-4 h-full text-gray-700 bg-white border border-gray-400 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          disabled={page === totalPage}
        >
          Next
        </button>
      </ul>
    </div>
  );
}
