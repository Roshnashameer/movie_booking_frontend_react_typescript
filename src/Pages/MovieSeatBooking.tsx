import React, { useEffect, useState } from 'react';
import './MovieSeatBooking.css';
import { bookingApi, seatViewApi } from '../services/allApis';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MovieSeatBookingProps {

}


const MovieSeatBooking: React.FC<MovieSeatBookingProps> = () => {
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [reservedSeats, setReservedSeats] = useState<number[]>([]);
    const [uname, setUname] = useState<string>("");
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const fetchReservedSeatsData = async () => {
        if (id) {
            const token = localStorage.getItem('token');
            const reqHeader: HeadersInit = {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            };

            try {
                const result = await seatViewApi(reqHeader, id);


                if (result.status === 200 && 'data' in result) {
                    const flattenedSeats = result.data.flat();
                    setReservedSeats(flattenedSeats);
                }
            }
            catch (err) {
                console.error("Error fetching seats:", err);
            }
        }
    };

    useEffect(() => {
        const currentUserString = localStorage.getItem("currentUser");
        if (currentUserString) {
            const currentUser = JSON.parse(currentUserString);
            if (currentUser && typeof currentUser === "object" && "userName" in currentUser) {
                setUname(currentUser.userName);
                fetchReservedSeatsData();
            } else {
                // Handle invalid currentUser format
                console.error("Invalid currentUser format");
            }
        } else {
            alert("Please Login First");
            navigate("/login");
        }
    }, []);

    const handleSeatClick = (seatNumber: number) => {
        if (reservedSeats.includes(seatNumber)) {
            return; // Seat is already reserved
        }

        setSelectedSeats(prevSelectedSeats =>
            prevSelectedSeats.includes(seatNumber)
                ? prevSelectedSeats.filter(seat => seat !== seatNumber)
                : [...prevSelectedSeats, seatNumber]
        );
    };

    const handleConfirmSeats = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const reqHeader: HeadersInit = {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        };

        const seats = selectedSeats.map(seat => seat);
        try {
            const result = await bookingApi(reqHeader, { "seatNum": seats }, id);
            console.log(result);

            if (result.status === 200 && 'data' in result) {
                toast.success(result.data.msg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setReservedSeats(prevReservedSeats => [
                    ...prevReservedSeats,
                    ...selectedSeats,
                ]);
                setSelectedSeats([]); // Clear selected seats
            }
            else {
                
                if ('response' in result) {
                    // console.log((result.response?.data as { msg: string }).msg); // Cast to expected type
                    toast.info((result.response?.data as { msg: string }).msg, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });


                }

               
            }
        }
        catch (err) {
            console.error("Error fetching seats:", err);
        }
    };

    const renderSeats = () => {
        const rows: number[] = [10, 10, 15, 15, 20, 20]; // Number of seats per row
        const seats: JSX.Element[] = [];
        let seatNumber = 1;

        for (let row = 0; row < rows.length; row++) {
            const rowSeats: JSX.Element[] = [];
            for (let col = 1; col <= rows[row]; col++) {
                const seatId = seatNumber;
                const isReserved = reservedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                rowSeats.push(
                    <div
                        key={seatId}
                        className={`seat ${isReserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(seatId)}
                    >
                        {seatNumber}
                    </div>
                );
                seatNumber++;
            }
            seats.push(<div key={row} className="seat-row">{rowSeats}</div>);
        }
        return seats;
    };

    return (
        <div className="movie-seat-booking">
            <h1 style={{ color: 'orange' }}> Book your seats....</h1>
            <div className="screen">Screen</div>
            <div className="seats-container">{renderSeats()}</div>
            <div className="selected-seats">
                {selectedSeats.map(seat => (
                    <span className="seat" key={seat}>{seat}</span>
                ))}
            </div>
            <button onClick={handleConfirmSeats} className="confirm-button">Confirm Seats</button>
            <ToastContainer />
        </div>
    );
};

export default MovieSeatBooking;
