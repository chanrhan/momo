import {useObjectArrayInputField} from "./useObjectArrayInputField";
import {useRef, useState} from "react";
import {ObjectUtils} from "../utils/objectUtil";

export function useDraggableInputField(init, arr, dragListRef, onDragOver){
    const inputField = useObjectArrayInputField(init, arr)

    const [draggingIndex, setDraggingIndex] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggingIndex(index);

        if (dragListRef && dragListRef.current[index]) {
            e.dataTransfer.setDragImage(dragListRef.current[index], 0, 0);
        }
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e, index) => {
        e.preventDefault(); // Allow drop
        if(onDragOver){
            if(!onDragOver(index, inputField)){
                return false;
            }
        }
        if (index !== draggingIndex) {
            const updatedItems = [...inputField.input];
            const draggedItem = updatedItems.splice(draggingIndex, 1)[0];
            updatedItems.splice(index, 0, draggedItem);
            inputField.setInput(updatedItems);
            setDraggingIndex(index);
            return true;
        }

        return false;
    };

    return {
        ...inputField,
        handleDragStart,
        handleDragOver
    }
}