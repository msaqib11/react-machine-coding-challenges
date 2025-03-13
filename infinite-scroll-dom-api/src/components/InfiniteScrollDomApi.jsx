import { useState } from "react"
const threshold = 20
const InfiniteScrollDomApi = () => {
   const [data, setData] = useState([...new Array(40)])
   const [isLoading, setIsLoading] = useState(false)
   function handleScroll(e){
const scrollTop = e.target.scrollTop
      const clientHeight = e.target.clientHeight
      const scrollHeight = e.target.scrollHeight
      const remainingScroll = scrollHeight - (scrollTop + clientHeight)
      if(remainingScroll < threshold && !isLoading){
        loadMore()
      }
  }  
  function loadMore(){
    setIsLoading(true)
    setTimeout(()=>{
        setData((prev) => [...prev,...new Array(20)])
    setIsLoading(false)
    },1000)
  }
    return (
    <div
    onScroll={handleScroll}
    className="infinite-scroll-dom-api"
    >
        {data.map((row,index)=>(
            <div className="row" key={index}>
                {index + 1}    
            </div>
        ))}
    {isLoading && <div>Loading...</div>}
    </div>
  )
}

export default InfiniteScrollDomApi