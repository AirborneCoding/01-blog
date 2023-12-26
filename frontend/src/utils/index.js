import axios from "axios"
import toast from 'react-hot-toast';
import moment from "moment";
moment.locale('fr')

import { logout } from "../redux/slices/authSlice";

// export const developmentUrl = "http://localhost:5000/api/v1"
export const developmentUrl = import.meta.env.VITE_ORIGINE

export const customFetch = axios.create({
    baseURL: developmentUrl,
});

export const formatDate = (date) => {
    const formattedDate = moment(date).format('LL')
    return formattedDate
}


export function displayToast(message, type, place) {
    const toastConfig = {
        position: place || "top-center",
        reverseOrder: false
    };
    switch (type) {
        case "success":
            toast.success(message, toastConfig);
            break;
        case "warn":
            toast.warn(message);
            break;
        case "error":
            toast.error(message);
            break;
        default:
            toast.info(message);
            break;
    }
}

export function logoutUser() {
    return async (dispatch) => {
        dispatch(logout());
    };
}


export const categoriesImages = [
    {
        name: "Nature",
        img: "/nature.jpeg"
    },
    {
        name: "Technology",
        img: "/tech.jpeg"
    },
    {
        name: "Travel",
        img: "https://source.unsplash.com/xOBpdqH2Uao"
    },
    {
        name: "Food",
        img: "https://source.unsplash.com/ZBquC1f8SJ0"
    },
    {
        name: "Fashion",
        img: "https://source.unsplash.com/xOBpdqH2Uao"
    },
    {
        name: "Health",
        img: "/health.jpeg"
    },
    {
        name: "Fitness",
        img: "/fitness.webp"
    },
    {
        name: "Books",
        img: "https://source.unsplash.com/8n7ipHhI8CI"
    },
    {
        name: "Movies",
        img: "https://source.unsplash.com/iEEBWgY_6lA"
    },
    {
        name: "Music",
        img: "https://source.unsplash.com/xOBpdqH2Uao"
    },
    {
        name: "Sports",
        img: "/sports.jpeg"
    },
    {
        name: "Science & Research",
        img: "/science.webp"
    },
    {
        name: "Art",
        img: "/art.webp"
    },
    {
        name: "Photography",
        img: "https://source.unsplash.com/xOBpdqH2Uao"
    },
    {
        name: "Gaming",
        img: "https://source.unsplash.com/ZBquC1f8SJ0"
    },
    {
        name: "Business",
        img: "https://source.unsplash.com/8n7ipHhI8CI"
    },
    {
        name: "Education",
        img: "/education.webp"
    },
    {
        name: "Politics & Laws",
        img: "/politic.webp"
    },
    {
        name: "History",
        img: "https://source.unsplash.com/ZBquC1f8SJ0"
    },
    {
        name: "Adventure",
        img: "https://source.unsplash.com/8n7ipHhI8CI"
    },
];


