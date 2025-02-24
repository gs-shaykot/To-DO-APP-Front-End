const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result)
    if (!destination) {
        return;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return;
    }
    // Find & remove the dragged Task from array.
    const updatedTasks = [...tasks];
    const draggedItemIndex = updatedTasks.findIndex(
        (task) => task.id === draggableId
    );
    const draggedItem = updatedTasks[draggedItemIndex];
    updatedTasks.splice(draggedItemIndex, 1);


    const destinationColumnItems = updatedTasks.filter(
        (task) => task.status === destination.droppableId
    );
    
    const newIndex = destination.index;

    updatedTasks.splice(
        updatedTasks.findIndex((task, index) => updatedTasks.filter((task) => task.status === destination.droppableId)[newIndex] === task && task.status === destination.droppableId),
        0,
        { ...draggedItem, status: destination.droppableId }
    );

    setTasks(updatedTasks);
};