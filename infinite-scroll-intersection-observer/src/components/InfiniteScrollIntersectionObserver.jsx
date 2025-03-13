import { useEffect, useRef, useState } from "react"
const InfiniteScrollIntersectionObserver = () => {
   const [data, setData] = useState([...new Array(60)])
   const [isLoading, setIsLoading] = useState(false)
   const arrayListRef = useRef([]) 
   function loadMore(){
    setIsLoading(true)
    setTimeout(()=>{
      setData((prev)=>[...prev,...new Array(20)])
     setIsLoading(false)
    },1000)
   }

  useEffect(()=>{
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting){
        observer.unobserve(entries[0].target)
        loadMore()
      }
     })
    const lastElement = arrayListRef.current[arrayListRef.current.length-1]
    observer.observe(lastElement)
    return ()=>{
      observer.unobserve(lastElement)
    }
  },[data.length])

    return (
    <div
    className="infinite-scroll-intersection-observer"
    >
        {data.map((row,index)=>(
            <div
            ref={(el)=>arrayListRef.current[index]=el}
            className="row" key={index}>
                {index + 1}    
            </div>
        ))}
       {isLoading && <div>Loading...</div>}
    </div>
  )
}

export default InfiniteScrollIntersectionObserver