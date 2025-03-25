import { useEffect, useState } from 'react'
import './App.css'
import Pagination from "./components/Pagination"


function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setData(Array.from({ length: 10 }, (_, i) => i + 1))
  }, [])
  function handleRenderRow(rowData, index) {
    return <div key={index}>{rowData}</div>
  }

  function handlePageChange(pageNumber) {
    setLoading(true)
    //Api call will be used here
    setTimeout(() => {
      setLoading(false)
      setData(Array.from({ length: 100 }, (_, i) => i * pageNumber + 1))
    }, 1000)

  }
  return (
    <>
      <Pagination data={data} renderRow={handleRenderRow} totalNoOfPages={10} loading={loading} onPageChange={handlePageChange} />
    </>
  )
}

export default App
