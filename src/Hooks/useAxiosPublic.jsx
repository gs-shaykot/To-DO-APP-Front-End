import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://todo-six-kappa-51.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;