import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

// register
export const registerApi = async (body: any) => {
    return await commonApi('POST', `${BASE_URL}/signup`, body, "");
}

// login
export const loginApi = async (body: any) => {
    return await commonApi('POST', `${BASE_URL}/signin`, body, "");
}

// get all movies
export const homeMovieApi = async () => {
    return await commonApi('GET', `${BASE_URL}/movies`, "", "");
}

// create booking
export const bookingApi = async (headers: any, body: any, id: string | any) => {
    return await commonApi('POST', `${BASE_URL}/add-booking/${id}`, body, headers);
}

// view seat
export const seatViewApi = async (headers: any, id: string |any) => {
    return await commonApi('GET', `${BASE_URL}/seat/${id}`, "", headers);
}

// view user bookings
export const bookingViewApi = async (headers: any) => {
    return await commonApi('GET', `${BASE_URL}/view-bookings`, "", headers);
}
