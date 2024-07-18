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
    const inputField = useObjectInputField({
        category: 0,
        keyword: ''
    });

    useEffect(() => {
        getSaleByCategory()
    }, [inputField.input]);

    const getSaleByCategory = async ()=>{
        await saleApi.getSaleByCategory(inputField.input).then(({status,data})=>{
            if(status === 200 && data){
                console.table(data)
                setItems(data)
            }
        })
    }

    const refresh = ()=>{
        inputField.clearOf({
            category: 0,
            keyword: ''
        });
    }

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>고객관리</h2>
            </div>

            <div className={Layout.sub_tab}>
                <TabList name='category' inputField={inputField} theme={Layout} values={
                    ['중고폰','카드','결합','지원','고객약속']
                }/>
                {
                    inputField.getInput('category') === 4 && (
                        <button className={`btn_blue ${cm(Board.btn_medium, Board.btn)} btn_add`}>약속 추가</button>
                    )
                }
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                                <span className="switch">
                                    <input type="checkbox" id="switch1" className="switch_inp" checked/>
                                    <label htmlFor="switch1"><span>on/off</span></label>
                                </span>
                            <span className="switch_text">미완료 고객 보기</span>
                            <button type="button" className="btn_all" onClick={refresh}>전체 보기</button>
                        </div>
                        <div className={Board.board_head_group}>
                        <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em className={Board.em}>1,123</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>3</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input type="search" className={Board.input} title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button type="submit" className={Board.button}>검색</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="board_body">
                    <CategorySelector category={inputField.getInput('category')} data={items}/>
                    <div className="view_more">
                        <button type="button" className="view_more_btn">더 보기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CategorySelector({category, data}){
    switch (category){
        case 0:
            return <TaskUsedDeviceBoardTable data={data}/>
        case 1:
            return <TaskCardBoardTable data={data}/>
        case 2:
            return <TaskCombBoardTable data={data}/>
        case 3:
            return <TaskSupportBoardTable data={data}/>
        case 4:
            return <PromiseBoardTable data={data}/>
    }
    return null;
}