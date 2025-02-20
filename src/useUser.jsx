import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUser = () => {

    const { data: dbUser = [], isPending, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/users')
            return res.data
        }
    })
    if (isPending)
        <span className="loading loading-ring loading-lg"></span>
    return [dbUser, isPending, refetch]
};

export default useUser;