import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useTodo = () => {
    const axiosPub = useAxiosPublic()
    const { data: AllTasks = [], isPending, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPub.get('/addTask')
            return res.data
        }
    })
    if (isPending)
        <span className="loading loading-ring loading-lg"></span>
    return [AllTasks, isPending, refetch]
};

export default useTodo;
