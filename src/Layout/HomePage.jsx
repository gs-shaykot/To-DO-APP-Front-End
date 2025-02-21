import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../Provider/ThemeProvider';
import Todo from '../Components/Todo/Todo';
import { closestCorners, DndContext } from '@dnd-kit/core';
import InProgress from './../Components/InProgress/InProgress';
import Done from './../Components/Done/Done';
import useTodo from './../Hooks/useTodo';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const HomePage = () => {
    const { theme } = useContext(ThemeContext);
    const [AllTasks, isPending, refetch] = useTodo();
    const [tasks, setTasks] = useState(AllTasks || []);

    useEffect(() => {
        setTasks(AllTasks);
    }, [AllTasks]);
    console.log(tasks)
    const handleDragEnd = (e) => {
        const { active, over } = e;

        if (active.id !== over.id) {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);

            const newTasks = arrayMove(tasks, oldIndex, newIndex);
            setTasks(newTasks);

            // Update the order in the backend
            updateTaskOrder(newTasks);
        }
    };

    const updateTaskOrder = async (newTasks) => {
        try {
            await axiosPub.put('/updateTaskOrder', { tasks: newTasks });
            refetch();
        } catch (error) {
            console.error('Failed to update task order:', error);
        }
    };

    return (
        <div className={`${theme === 'light' ? 'bg-[#111827] text-white' : 'bg-[#f0f0f0] text-black'} h-auto pt-24 pb-10 overflow-hidden`}>
            <div className='grid grid-cols-3 gap-5 container mx-auto'>
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                    <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                        <Todo tasks={tasks} refetch={refetch} />
                        <InProgress />
                        <Done />
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};

export default HomePage;
