import Popup from "../../../../css/popup.module.css";
import {cm, cmc} from "../../../utils/cm";
import {useEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../../utils/objectUtil";
import {EditableAddButton} from "../../../common/module/EditableAddButton";
import useApi from "../../../hook/useApi";
import Dashboard from "../../../../css/dashboard.module.css";
import {DateUtils} from "../../../utils/DateUtils";

// promiseInputField : { checked: boolean, content: string }
export function TodoAddBox({list, year, month, day, onRefresh}){
    const {saleApi, todoApi} = useApi()
    const focusRef = useRef([])
    const [editContent, setEditContent] = useState('')

    const nextIndex = list ? list.length: -1;
    const [focusIndex, setFocusIndex] = useState(-1);

    const scrollRef = useRef(null)

    useEffect(() => {
        if(focusIndex !== -1){
            if(focusIndex < nextIndex){
                setEditContent(list[focusIndex].content ?? '');
            }
            focusRef.current[focusIndex].focus();
        }
    }, [focusIndex]);

    // useEffect(() => {
    //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    // }, [item.pm_list]);

    const checkTodo = async (todoId, checked)=>{
        const date = DateUtils.formatYYMMdd(year, month, day);
        await todoApi.updateTodoChecked({
            date: date,
            todo_id: todoId,
            checked: checked ? 1 : 0
        }).then(({status,data})=>{
            if(status === 200 && data){
                onRefresh();
            }
        })
    }

    const removeTodo = async (todoId)=>{
        const date = DateUtils.formatYYMMdd(year, month, day);
        await todoApi.deleteTodo({
            date: date,
            todo_id: todoId
        }).then(({status,data})=>{
            if(status === 200 && data){
                onRefresh();
            }
        })
    }

    const update = async (id)=>{
        setFocusIndex(-1)
        if(ObjectUtils.isEmpty(editContent)){
            return;
        }
        const date = DateUtils.formatYYMMdd(year, month, day);
        await todoApi.updateTodoContent({
            date: date,
            todo_id: id,
            content: editContent
        }).then(({status,data})=>{
            if(status === 200 && data){
                onRefresh();
            }
        })
    }

    const add = async(content)=>{
        setFocusIndex(-1)
        if(ObjectUtils.isEmpty(content)){
            return;
        }

        await todoApi.addTodo({
            date: DateUtils.formatYYMMdd(year, month, day),
            content: content
        }).then(({status,data})=>{
            if(status === 200 && data){
                onRefresh();
            }
        })
    }

    return (
        <>
            <div className={Dashboard.option_scroll} ref={scrollRef}>
                <ul className="option_list">
                    {
                        list && list.map((v, i) => {
                            return <li key={i} className={Dashboard.option_item} draggable={true}>
                                <div className={cm(Dashboard.radio_box)}>
                                    <input type="checkbox" className={Dashboard.check_inp} name="radio" id={`pr_${i}`}
                                           checked={v.checked} readOnly/>
                                    <label htmlFor={`pr_${i}`} className={Dashboard.check_label}
                                           onClick={() => {
                                               checkTodo(v.todo_id, !v.checked);
                                           }}></label>
                                    <input type="text" className={Dashboard.check_text}
                                           value={focusIndex === i ? editContent : v.content}
                                           onChange={e => {
                                               setEditContent(e.target.value);
                                           }}
                                           onClick={() => {
                                               setFocusIndex(i);
                                           }}
                                           ref={e => {
                                               focusRef.current[i] = e;
                                           }}
                                           onBlurCapture={() => {
                                               update(v.todo_id);
                                           }}
                                           onKeyDown={e => {
                                               if (e.key === 'Enter') {
                                                   update(v.todo_id)
                                               }
                                           }}
                                           readOnly={focusIndex !== i}/>
                                    <button type="button" className={cm(Dashboard.schedule_del)}
                                            onClick={() => {
                                                removeTodo(v.todo_id)
                                            }}>삭제
                                    </button>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className={Dashboard.option_add}>
                <EditableAddButton inpClassName={Dashboard.add_inp}
                                   btnClassName={Dashboard.add_btn2}
                                   value='할일 추가하기' onUpdate={v => {
                    add(v);
                }}/>
            </div>
        </>
    )
}