import React, { useEffect, useState } from 'react';
import { bookingViewApi } from '../services/allApis';
import { Button, Col, Row } from 'react-bootstrap';
// import { createRequestHeader } from '../utils/ReqHeader';

interface Booking {

    movieName: string;
    seatNumbers: string[];
}
function ViewMyBookings() {
    const [userBookings, setUserBookings] = useState<Booking[]>([]);
    const getUserBookings = async () => {


        const token = localStorage.getItem('token');
        // header creation
        const reqHeader = {
            "Content-Type": "application/json", // Corrected the typo
            "authorization": `Bearer ${token}`
        };
        // console.log(reqHeader);

        try {
            const result = await bookingViewApi(reqHeader);
            console.log(result);

            if (result.status === 200 && 'data' in result) {

                setUserBookings(result.data);

            }
        } catch (err) {
            console.error("Error fetching user Bookings:", err);
        }

    };

    useEffect(() => {
        getUserBookings();
    }, []);

    return (
        <>
            {userBookings?.length > 0 ?
                userBookings?.map((booking, index) => (
                    <div key={index} className='border mt-3 p-4 shadow'>
                        <Row>
                            <Col lg={6}>
                                <p>{booking?.movieName}</p>
                            </Col>
                            <Col lg={6} className='text-end'>
                                {booking?.seatNumbers.map((seat, idx) => (
                                    <span key={idx}>
                                        <Button className='text-end px-3' style={{ marginRight: 10 }}>{seat}</Button>
                                    </span>
                                ))}
                            </Col>
                        </Row>
                    </div>
                )) :
                <p className='text-primary mt-5 p-4'>No Bookings!</p>
            }
        </>
    );
}

export default ViewMyBookings;
