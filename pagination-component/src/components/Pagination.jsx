import { useState } from "react"

const DEFAULT_PAGE = 1
const PAGE_SIZE = 10
const Pagination = ({ data, renderRow, rowPerPage = PAGE_SIZE, onPageChange = () => { },loading,totalNoOfPages = null }) => {


  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE)
  const [pageSize, setPageSize] = useState(rowPerPage)
  //slicing the data according to the page size
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const totalPages = totalNoOfPages ?? Math.ceil(data.length / pageSize)
  const currentData = data.slice(startIndex, endIndex)

  const maxButtons = 5;
  let buttonStartIndex = currentPage - Math.floor(maxButtons / 2);
  let buttonEndIndex = currentPage + Math.floor(maxButtons / 2);
  if (buttonStartIndex < 1) {
    buttonStartIndex = 1
    buttonEndIndex = Math.min(totalPages, maxButtons)
  }
  if (buttonEndIndex > totalPages) {
    buttonEndIndex = totalPages
    buttonStartIndex = Math.max(1, totalPages - maxButtons + 1)
  }

  const pageNumberButtons = Array.from({ length: totalPages }, (_, i) => (i + 1))
  const pageNumbersToShow = pageNumberButtons.slice(buttonStartIndex - 1, buttonEndIndex)


  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber)
    onPageChange(pageNumber)
  }
  return (
    <div className="pagination-container">
      {loading ? <div>loading...</div> : <div className="pagination-content">
        {currentData.map((d, i) => {
          return renderRow(d, i)
        })}
      </div>}
      <div className="pagination-controls">
        <select onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
        {/* first button */}
        <button onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >First</button>
        {/* previous button */}
        <button onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >Previous</button>

        {/* page numbers */}

        {pageNumbersToShow.map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            style={currentPage === pageNumber ? { backgroundColor: 'blue', color: 'white' } : {}

            }
          >{pageNumber}</button>
        ))}
        {/* next button */}
        <button onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >Next</button>
        {/* last page button */}
        <button onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >Last</button>
      </div>
    </div>
  )
}

export default Pagination