"use client"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...")
    }

    // Add pages in range
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("...")
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav
      className="flex gap-2 items-center justify-center text-base leading-none text-black whitespace-nowrap"
      aria-label="Pagination"
    >
      <button
        className={`flex gap-2 justify-center items-center px-3 py-2 rounded-lg transition-colors ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        aria-label="Previous page"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex gap-2 items-center">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 py-2 font-bold">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === page ? "bg-amber-500 text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className={`flex gap-2 justify-center items-center px-3 py-2 rounded-lg transition-colors ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        aria-label="Next page"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Próximo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </nav>
  )
}

export default Pagination

