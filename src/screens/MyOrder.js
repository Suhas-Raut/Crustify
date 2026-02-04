import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/auth/myOrderData", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({
            email: localStorage.getItem("userEmail")
        })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className="row">
                {orderData?.orderData?.order_data
                    ?.slice(0)
                    .reverse()
                    .map((order, index) => (
                    <div key={index}>
                        {order.map((item, idx) => {
                        if (item.Order_date) {
                            return (
                            <div key={idx} className="m-auto mt-5">
                                <h5>{item.Order_date}</h5>
                                <hr />
                            </div>
                            );
                        }

                        return (
                            <div key={idx} className="col-12 col-md-6 col-lg-3">
                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                <img
                                src={item.img}
                                className="card-img-top"
                                alt={item.name}
                                style={{ height: "120px", objectFit: "fill" }}
                                />
                                <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="container w-100 p-0" style={{ height: "38px" }}>
                                    <span className="m-1">{item.qty}</span>
                                    <span className="m-1">{item.size}</span>
                                    <div className="d-inline ms-2 fs-5">
                                    ₹{item.price}/-
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    ))}
                </div>



            </div>

            <Footer />
        </div>
    )
}
