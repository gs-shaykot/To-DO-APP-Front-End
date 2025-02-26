import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useUser = () => {
    const axiosPub = useAxiosPublic()
    const { data: dbUser = [], isPending, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPub.get('/users')
            return res.data
        }
    })
    return [dbUser, isPending, refetch]
};

export default useUser;