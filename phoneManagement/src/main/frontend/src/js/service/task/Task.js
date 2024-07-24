import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm} from "../../utils/cm";
import {TaskUsedDeviceBoardTable} from "./module/TaskUsedDeviceBoardTable";
import {PromiseBoardTable} from "./PromiseBoardTable";
import {TabList} from "../../common/module/TabList";
import {useObjectInputField} from "../../hook/useObjectInputField";
import useApi from "../../hook/useApi";
import {useEffect, useState} from "react";
import {TaskCardBoardTable} from "./module/TaskCardBoardTable";
import {TaskCombBoardTable} from "./module/TaskCombBoardTable";
import {TaskSupportBoardTable} from "./module/TaskSupportBoardTable";

export function Task(){
    const {saleApi} = useApi();
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0)
    const [category, setCategory] = useState(0)
    const inputField = useObjectInputField({
        completed: false,
        keyword: '',
        order: null,
        asc: false
    });

    useEffect(() => {
        getSaleByCategory()
        // if(category !== 4){
        // }else{
        //     getPromise();
        // }
        getSaleTotalCountByCategory();
    }, [inputField.input]);

    useEffect(() => {
        refresh()
    }, [category]);

    const getSaleByCategory = async ()=>{
        await saleApi.getSaleByCategory({
            category: category,
            ...inputField.input
        }).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setItems(data)
            }
        })
    }

    // const getPromise = async ()=>{
    //     console.log('get promise')
    //     await saleApi.getPromise(inputField.input).then(({status,data})=>{
    //         console.log(`status: ${status} data: ${data}`)
    //         if(status === 200 && data){
    //             console.table(data)
    //             setItems(data)
    //         }
    //     })
    // }

    const getSaleTotalCountByCategory = async ()=>{
        await saleApi.getSaleTotalCountByCategory(category).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                setTotalCount(data)
            }
        })
    }

    const refresh = ()=>{
        inputField.clearOf({
            completed: false,
            keyword: '',
            order: null,
            asc: false
        });
    }

    const onChangeState = async (saleId, state, itemId)=>{
        // console.log(`change state: ${saleId} | ${state}`)
        await saleApi.changeSaleState({
            category: category,
            sale_id: saleId,
            item_id: itemId,
            state: state
        }).then(({status,data})=>{
            // console.log(`res: ${status} ${data}`)
            if(status === 200 && data){
                getSaleByCategory();
            }
        })
    }

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>고객관리</h2>
            </div>

            <div className={Layout.sub_tab}>
                <TabList value={category} onChange={setCategory} theme={Layout} values={
                    ['중고폰','카드','결합','지원','고객약속']
                }/>
                {
                    category === 4 && (
                        <button className={`btn_blue ${cm(Board.btn_medium, Board.btn)} btn_add`}>약속 추가</button>
                    )
                }
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                                <span className="switch">
                                    <input type="checkbox" name='completed' className="switch_inp" checked={inputField.get('completed')}/>
                                    <label htmlFor="completed" onClick={()=>{
                                        inputField.put('completed', !inputField.get('completed'))
                                    }}><span>on/off</span></label>
                                </span>
                            <span className="switch_text">미완료 고객 보기</span>
                            <button type="button" className="btn_all" onClick={refresh}>전체 보기</button>
                        </div>
                        <div className={Board.board_head_group}>
                        <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em className={Board.em}>{totalCount}</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>{items.length}</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input type="search" className={Board.input} title="검색" name='keyword' onChange={inputField.handleInput}
                                       value={inputField.get('keyword')}
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button type="submit" className={Board.button}>검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="board_body">
                    <CategorySelector category={category} items={items} onChangeState={onChangeState}/>
                    <div className="view_more">
                        <button type="button" className="view_more_btn">더 보기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CategorySelector({category, items, onChangeState}){
    switch (category){
        case 0:
            return <TaskUsedDeviceBoardTable items={items} onChangeState={onChangeState}/>
        case 1:
            return <TaskCardBoardTable items={items} onChangeState={onChangeState}/>
        case 2:
            return <TaskCombBoardTable items={items} onChangeState={onChangeState}/>
        case 3:
            return <TaskSupportBoardTable items={items} onChangeState={onChangeState}/>
        case 4:
            return <PromiseBoardTable items={items} onChangeState={onChangeState}/>
    }
    return null;
}