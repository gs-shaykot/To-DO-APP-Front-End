import React, { useContext, useEffect, useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, PointerSensor, TouchSensor, KeyboardSensor } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';   
import { useTodo } from '../Hooks/useTodo';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Todo from './../Components/Todo/Todo';
import InProgress from './../Components/InProgress/InProgress';
import Done from './../Components/Done/Done';
import { ThemeContext } from '../Provider/ThemeProvider';

const HomePage = () => {
    const { theme } = useContext(ThemeContext);
    const [AllTasks, isPending, refetch] = useTodo();
    const [tasks, setTasks] = useState(AllTasks || []);
    const axiosPub = useAxiosPublic();

    useEffect(() => {
        setTasks(AllTasks);
    }, [AllTasks]);

    const handleDragEnd = (e) => {
        const { active, over } = e;
        if (!over || active.id === over.id) return;

        const oldIndex = tasks.findIndex(task => task.id === active.id);
        const newIndex = tasks.findIndex(task => task.id === over.id);
        const newTasks = arrayMove(tasks, oldIndex, newIndex);
        setTasks(newTasks);
        updateTaskOrder(newTasks);
    };

    const updateTaskOrder = async (newTasks) => {
        try {
            await axiosPub.put('/updateTaskOrder', { tasks: newTasks });
            await refetch();
        } catch (error) {
            console.error('Failed to update task order:', error);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 3,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div className={`${theme === 'light' ? 'bg-[#111827] text-white' : 'bg-[#f0f0f0] text-black'} h-auto pt-24 pb-10 overflow-hidden`}>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container mx-auto'>
                <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
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