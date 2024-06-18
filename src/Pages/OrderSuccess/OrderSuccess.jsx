import React,{ useEffect}from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import SuccessLottie from "../../lottie/order-reject.json"
import "./OrderSuccess.css"
function OrderSuccess() {

    const navigate = useNavigate()

    useEffect(()=>{

        const timer = setTimeout(()=>{
            navigate("/orders")
        },3000)

        return () => clearTimeout(timer)
    },[navigate])
  return (
    <div className='order-success'>

        <Lottie className='lottie' animationData={SuccessLottie}/>
    </div>
  )
}

export default OrderSuccess