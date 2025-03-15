import { useState } from "react"

const GridLights = () => {
    const config = [
        [1, 0, 1,0],
        [0, 1, 0,1],
        [1, 0, 1,0]
    ]
    const [stack, setStack] = useState(new Map())
    const [isRollbackended, setIsRollbackended] = useState(false)

    function handleclick(rowIndex, colIndex) {
        return () => {
            const newStack = structuredClone(stack)
            const key = `${rowIndex}-${colIndex}`
            if (newStack.has(key) || !config[rowIndex][colIndex]) {
                return
            } else {
               if(!isRollbackended){
                   newStack.set(key, 1)
               }
            }
            setStack(newStack)

            const selectedLights = config.flat().reduce((acc, curr) => {
                return acc + curr
            }, 0)  //to get the length of config with the 1(on) light

            
            if (selectedLights === newStack.size) {
                startRollback()
            }
        }
    }

    function startRollback(){
        setIsRollbackended(true)
       const intervalId = setInterval(function(){
        setStack(function(prev){
            const lastKey = Array.from(prev.keys()).pop()
            const newStack = structuredClone(prev)
            newStack.delete(lastKey)
            if(!newStack.size){
                clearInterval(intervalId)
                setIsRollbackended(false)
            }
            return newStack
        })
       }, 1000)
    }

    return (
        <div className="grid-container">
            {config.map((row, rowIndex) => {
                return <div className="grid-row" key={rowIndex}>{row.map((col, colIndex) => {
                    let offColor = ''
                    if (col === 0) {
                        offColor = 'off'
                    }
                    const key = `${rowIndex}-${colIndex}`
                    if (stack.has(key)) {
                        offColor += 'on'
                    }
                    return <div
                        onClick={handleclick(rowIndex, colIndex)}
                        className={`grid-col ${offColor}`} key={colIndex}></div>
                })}</div>
            })}
        </div>
    )
}

export default GridLights