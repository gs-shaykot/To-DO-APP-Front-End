import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"; 
import useAxiosPublic from "./useAxiosPublic";

const useTodo = () => {
    const axiosPub = useAxiosPublic();
    const [tasks, setTasks] = useState([]); // Local state for faster updates

    const { data: AllTasks = [], isPending, refetch } = useQuery({
        queryKey: ['AllTasks'],
        queryFn: async () => {
            const res = await axiosPub.get('/addTask');
            return res.data
        },
    });

    return [AllTasks, isPending, refetch];
};

export default useTodo;
