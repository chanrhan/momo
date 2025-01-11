import {useState} from "react";

export function useDragAndDrop(list, dragClassName){

    const [draggingIndex, setDraggingIndex] = useState(null);
    const [items, setItems] = useState([...list.children]);

    const handleDragStart = (index) => {
        setDraggingIndex(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault(); // Allow drop
        if (index !== draggingIndex) {
            const updatedItems = [...items];
            const draggedItem = updatedItems.splice(draggingIndex, 1)[0];
            updatedItems.splice(index, 0, draggedItem);
            setItems(updatedItems);
            setDraggingIndex(index);
        }
    };

    return {
        handleDragStart,
        handleDragOver
    }
}