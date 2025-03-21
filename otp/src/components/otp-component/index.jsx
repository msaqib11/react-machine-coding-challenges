import React, { useRef, useState } from 'react'

const OTPComponent = ({ count,onOTPComplete }) => {
    const [otps, setOtps] = useState(new Array(count).fill(""))
    const refList = useRef([])
    function handleKeyUp(index) {
        return (e) => {
            const key = e.key

            const oldOtps = [...otps]

            if (key === "ArrowRight") {
                moveArrowToRight(index, oldOtps)
            }

            if (key === "ArrowLeft") {
                moveArrowToLeft(index)
            }

            //shift focus to previous input if available 
            if (key === 'Backspace') {
                oldOtps[index] = ""
                moveArrowToLeft(index)
                setOtps(oldOtps)
                return
            }
            if (isNaN(key)) {
                return
            }
            oldOtps[index] = key
            setOtps(oldOtps)

            moveArrowToRight(index)
            const otpToSend = oldOtps.join("")
            if( otpToSend.length=== count){
                onOTPComplete(otpToSend)
            }
        }
    }

    function moveArrowToRight(index, oldOtps) {
        //send focus to next input if available
        if (refList.current[index + 1]) {
            if (oldOtps) {
                const trimmedArray = otps.slice(index)
                //finding the index of empty input
                const emptyIndex = trimmedArray.indexOf("")
                refList.current[emptyIndex]?.focus()
            } else {
                refList.current[index + 1]?.focus()
            }

        }
    }
    function moveArrowToLeft(index) {
        //send focus to previous input if available
        if (refList.current[index - 1]) {
            refList.current[index - 1]?.focus()
            return
        }
    }
    //caret position
    function handleClick(index) {
        return (e) => {
            e.target.setSelectionRange(1, 1)
        }
    }

    function handlePaste(index) {
        return (e) => {
            const pastedText = e.clipboardData.getData('text').slice(0, 4)
            if (!isNaN(pastedText)) {
                setOtps(pastedText.split(""))
            }
        }
    }
    return (
        <div className='otp-container'>
            {new Array(count).fill("").map((_, index) => {
                return <input type='text' key={index}
                    value={otps[index] ?? ""}
                    autoComplete='one-time-code' //to autofill otp in mobile browser
                    inputMode='numeric' //to open numeric keyboard in mobile
                    onClick={handleClick(index)}
                    onKeyUp={handleKeyUp(index)}
                    onPaste={handlePaste(index)}
                    onChange={(e)=>{
                        const selectedOtp = e.target.value 
                        if(selectedOtp.length===count){
                            if (!isNaN(selectedOtp)) {
                                setOtps(selectedOtp.split(""))
                            }
                        }
                    }}
                    ref={(el) => refList.current[index] = el}
                />
            })}
        </div>
    )
}

export default OTPComponent