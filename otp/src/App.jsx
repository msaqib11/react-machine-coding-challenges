import './App.css'
import OTPComponent from './components/otp-component'

function App() {
  function handleOTPComplete(otp) {
    console.log(otp)
  }
  return (
    <>
    <h2 style={{fontSize:'2rem'}}>OTP Component</h2>
     <OTPComponent count={4} onOTPComplete={handleOTPComplete} />
    </>
  )
}

export default App
