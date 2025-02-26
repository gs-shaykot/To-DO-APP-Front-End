import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const useLogs = () => {
    const axiosPub = useAxiosPublic();

    const { data: AllLogs = [], isPending, refetch } = useQuery({
        queryKey: ['AllLogs'],
        queryFn: async () => {
            const res = await axiosPub.get('/addTask');
            return res.data
        },
    });

    return [AllLogs, isPending, refetch];
};

export default useLogs;