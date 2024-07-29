import Board from "../../css/board.module.css"
import Layout from "../../css/layout.module.css"
import {TabList} from "../common/module/TabList";
import {BoardTable, Btbody, Bth, Bthead} from "../service/board/BoardTable";
import {AdminTableData} from "./module/AdminTableData";
import useValidateInputField from "../hook/useValidateInputField";
import {useEffect, useState} from "react";
import {DeviceTable} from "./module/DeviceTable";
import {CtPlanTable} from "./module/CtPlanTable";
import {InternetPlanTable} from "./module/InternetPlanTable";
import {ExsvcTable} from "./module/ExsvcTable";
import useApi from "../hook/useApi";
import {TvPlanTable} from "./module/TvPlanTable";
import {cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";

export function MasterData(){
    const modal = useModal()
    const {gmdApi} = useApi();
    const [tab, setTab] = useState(0)
    const [keywowrd, setKeyword] = useState('')

    const [items, setItems] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        getItems()
    }, [tab]);

    const getItems = async ()=>{
        let rst = null
        switch (tab){
            case 0:
                rst = await gmdApi.getDevice(keywowrd);
                break;
            case 1:
                rst = await gmdApi.getCtPlan(keywowrd);
                break;
            case 2:
                rst = await gmdApi.getInternetPlan(keywowrd);
                break;
            case 3:
                rst = await gmdApi.getTvPlan(keywowrd);
                break;
            case 4:
                rst = await gmdApi.getExtraService(keywowrd);
                break;
        }
        if(rst !== null){
            // console.table(rst)
            if(rst.status === 200 && rst.data){
                setItems(rst.data)
            }
        }
    }

    const addSale =()=>{
        modal.openModal(ModalType.LAYER.Bulk_Upload)
    }

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>동적 목록 관리</h2>
            </div>

            <div className={Layout.sub_tab}>
                <TabList name='user_st' value={tab} onChange={setTab} theme={Layout} values={
                    ['핸드폰','무선요금제','인터넷요금제','TV요금제','부가서비스']
                }/>
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                            {/*<input type="text" className="inp date entered" placeholder="날짜 선택" value="최근 30일"/>*/}
                            {/*/!*입력시 entered 추가-->*!/*/}
                            {/*<button type="button" className="btn_all">전체 보기</button>*/}
                            <button onClick={addSale} type="button"
                                    className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>데이터 추가
                            </button>
                        </div>
                        <div className={Board.board_head_group}>
                            <div className={Board.board_count}>
                            <span className={Board.count_text}>전체 <em className={Board.em}>{totalCount}</em>건</span>
                                <span className={Board.count_text}><em className={Board.em}>3</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input className={Board.input} type="search" title="검색" id="board_search" placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button className={Board.button} type="submit">검색</button>
                            </div>

                        </div>
                    </form>
                </div>

                <BoardTableSelector tab={tab} items={items}/>
            </div>
        </div>
    )
}

function BoardTableSelector({tab, items}){
    switch (tab){
        case 0:
            return <DeviceTable data={items}/>
        case 1:
            return <CtPlanTable data={items}/>
        case 2:
            return <InternetPlanTable data={items}/>
        case 3:
            return <TvPlanTable data={items}/>
        case 4:
            return <ExsvcTable data={items}/>
    }
    return null
}