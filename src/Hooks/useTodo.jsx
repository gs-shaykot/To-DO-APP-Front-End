import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useTodo = () => {
    const axiosPub = useAxiosPublic();
    const { data: AllTasks = [], isPending, refetch } = useQuery({
        queryKey: ['AllTasks'],
        queryFn: async () => {
            const res = await axiosPub.get('/addTask');
            // Sort tasks by order
            return res.data.sort((a, b) => a.order - b.order);
        }
    });  
    return [AllTasks, isPending, refetch];
};

export default useTodo;
