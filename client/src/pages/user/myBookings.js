import React ,{useState, useEffect}from "react"
import { Link ,useParams} from "react-router-dom"
import axios from "axios"
import "../styles/myBooking.css"
import UserHeader from "./userHeader"
import { useCar } from "../../context-api/carContaxt"
import toast from "react-hot-toast"
export default function MyBookings() {

    const [orderHeader, carData] = useCar()
   const params = useParams();
    const [value, setValue] = useState([])
    const getBookingProduct = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_PORT}/get-booking`)
            console.log(res.data.products)
            setValue(res.data.products)
            console.log(value)
        }
        catch (err) {
            toast.error(err)
        }
    }

    useEffect(() => {
        getBookingProduct();
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData()
          productData.append("name", name);
          productData.append("type", type);
          productData.append("model", model);
          productData.append("mileage", mileage);
          productData.append("pricePerKm", pricePerKm);
          productData.append("availableFrom", availableFrom);
          productData.append("availableTill", availableTill);
          productData.append("description", description);
          productData.append("photo", photo);
          productData.append("carDetails", carDetails);
          productData.append("details", details);
    
          const res = await axios.put(`${process.env.REACT_APP_PORT}/update-product/${params.id}`, productData,
            {
              headers: {
                Authorization: `${auth?.token}`
              }
            })
    
          if (res.data.success) {
            toast.success("product created successfully");
            navigate("/admin-homepage");
          }
          else {
            toast.error(res.data?.message)
          }
        }
        catch (err) {
          console.log(err)
          toast.error("something went wrong");
        }
      }
    
      const handleDelete = async () => {
        try {
          const res = await axios.delete(`${process.env.REACT_APP_PORT}/delete-product/${params.id}`,
            {
              headers: {
                Authorization: `${auth?.token}`
              }
            })
          if (res.data.success) {
            toast.success(res.data.message);
            navigate("/admin-homepage")
          }
        }
        catch (err) {
          toast.error("something went wrong")
        }
      }


    return <>
    
        <div id="outer">
            <UserHeader/>
            <p>My Booking </p>
            {
                value.map(v=>(
            
            <div className="bookings">
                <div id="myimg" className="smallerDiv" >
                    <img src={`${process.env.REACT_APP_PORT}/get-photo/${v.bookingId}`} width="250px" alt="img" />
                </div>

                <div id="car" className="smallerDiv">
                    <h6 >Name: {v.name}</h6>
                    <h6>HR 22N 6595</h6>
                    <h6>Details:{v.details} </h6>
                    <h6>Car Details:{v.carDetails}</h6>
                </div>

                <div className="smallerDiv">
                    <div><span id="booking-label">Origin:{v.origin} </span></div>
                    <div><span id="booking-label">Destination:{v.destination} </span></div>
                    <div> <span id="booking-label">Start Date:{v.startDate}</span></div>
                    <div><span id="booking-label">Start Date:{v.endDate} </span></div>
                </div>
                <div className="smallerDiv">
                    <img src="" alt="map is unable to render" id="Abcdefghijklmn" />
                </div>

                <div className="smallerDiv">
                    <h6> <span id="booking-label">Booking ID</span>:{v.bookingId}</h6>
                    <h6> <span id="booking-label">Booking Date</span>:{v.bookingDate}</h6>
                    <h6> <span id="booking-label" >Booking Time</span>:{v.bookingTime}</h6>
                </div>
                <div className="smallerDiv" >
                    <div className="buttons">
                        <Link to="user-bookingconfirm" id="edit-booking-button"><button>Edit</button></Link>
                        <button id="cancel-booking-button">Cancel</button>
                    </div>
                </div>
            </div>
            ))
            }
        </div>
    </>

}
