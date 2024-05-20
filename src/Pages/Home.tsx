import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';
import './Home.css';
import { homeMovieApi } from '../services/allApis';
import { Movie } from '../utils/Movie.types'; // Assuming you have a Movie type defined





function Home() {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [homeMovies, sethomeMovies] = useState<Movie[]>([]);

    const gethomeMovies = async () => {
        try {
            const response = await homeMovieApi();

            // console.log(response);
            
            if ('data' in response && response.data) { // Check if response.data exists
                sethomeMovies(response.data);
            }
        } catch (error) {
            console.error('Error fetching home projects:', error);
            // Handle error if needed
        }
    }

    useEffect(() => {
        gethomeMovies();
        if(localStorage.getItem("currentId")){
            setLoggedIn(true);
        }
    }, []);

    // console.log(isLoggedIn);

    return (
        <div>
            <Row className='pt-5 pb-5'>
                <Col className='text-center p-5'>
                    <h1 className='text-warning mt-5'>MovieMix</h1>
                    <p className='mt-3 w-5 container'>The MovieMix app revolutionizes the way audiences experience
                        cinema by offering a seamless platform for browsing, booking, and enjoying their favorite films.
                        With its intuitive interface, users can effortlessly search for movies, select showtimes,
                        and reserve seats with just a few taps. From advanced ticketing options to personalized
                        recommendations, the app enhances the moviegoing experience for every cinephile.</p>
                        {isLoggedIn ?
                            <Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
                                <Button variant="primary">My Bookings</Button>
                            </Link> :
                            <Link to={'/login'} style={{ textDecoration: 'none' }}>
                                <Button variant="primary">Register/Login</Button>
                            </Link>
                        }
                </Col>
                <Col className='d-flex justify-content-center align-items-center'>
                    <img className='w-50 mt-5'
                        src="https://i.postimg.cc/d382fPh4/movie-947x1024.png" alt="" srcSet="" />
                </Col>
            </Row>
            <div className='m-2 p-5'>
                <h2 className='text-center text-primary'>Movies</h2>
                <Row>
                    {homeMovies.length > 0 ? homeMovies.map((movie: Movie, index: number) => (
                        <Col key={index} lg={4} md={6} sm={12} className="mb-3">
                            <Link to={`/seat/${movie._id}`} style={{ textDecoration: 'none' }}>
                                <MovieCard movie={movie} />
                            </Link>
                        </Col>
                    )) : <h2>No Movies</h2>}
                </Row>
            </div>
        </div>
    );
}

export default Home;