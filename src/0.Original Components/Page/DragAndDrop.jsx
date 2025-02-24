import React from 'react';
import useTodo from './../Hooks/useTodo';
import { DragDropContext } from '@hello-pangea/dnd';
import TaskColumn from './../Components/TaskColumn';
import useAxiosPublic from '../hooks/useAxiosPublic';

const DragAndDrop = () => {
  const { tasks, setTasks, isPending, refetch } = useTodo();
  const axiosPub = useAxiosPublic();

  const updateTaskStatus = async (taskId, status, order) => {
    await axiosPub.put(`/addTask/${taskId}`, { status, order });
  };

  // Group tasks by status
  const groupedTasks = {
    Todo: [],
    "In Progress": [],
    Done: [],
  };
  tasks.forEach(task => groupedTasks[task.status]?.push(task));


  const onDragEnd = async (result) => {
    console.log(result)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {["Todo", "In Progress", "Done"].map(status => (
          <TaskColumn key={status} title={status} tasks={groupedTasks[status]} />
        ))}
      </div>
    </DragDropContext>
  );
};
export default DragAndDrop;