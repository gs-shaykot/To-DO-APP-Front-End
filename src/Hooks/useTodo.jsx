import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useTodo = () => {
    const axiosPub = useAxiosPublic();
    const { data: AllTasks = [], isPending, refetch } = useQuery({
        queryKey: ['AllTasks'],
        queryFn: async () => {
            const res = await axiosPub.get('/addTask');
            return res.data.sort((a, b) => a.order - b.order);
        }
    });
    return [AllTasks, isPending, refetch];
};

export { useTodo };