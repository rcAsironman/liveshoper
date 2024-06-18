import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import OrderRejec from "../../lottie/order-success.json"
import "./OrderReject.css"

function OrderReject() {

    const navigate = useNavigate();

    useEffect(()=>{

        const timer = setTimeout(()=>{
            navigate("/")
        },3000)

        return ()=> clearTimeout(timer)
    },[navigate])
  return (
    <div className='order-reject'>

<Lottie className='lottie' animationData={OrderRejec}/>
    </div>
  )
}

export default OrderReject