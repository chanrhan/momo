import Board from "../../css/board.module.css"
import Layout from "../../css/layout.module.css"
import {TabList} from "../common/module/TabList";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../service/board/BoardTable";
import useValidateInputField from "../hook/useValidateInputField";
import {useEffect, useState} from "react";
import {DeviceTable} from "./module/DeviceTable";
import {CtPlanTable} from "./module/CtPlanTable";
import {InternetPlanTable} from "./module/InternetPlanTable";
import {ExsvcTable} from "./module/ExsvcTable";
import useApi from "../hook/useApi";
import {TvPlanTable} from "./module/TvPlanTable";
import {cm, cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {useNavigate} from "react-router-dom";
import {LMD} from "../common/LMD";
import {useBitArray} from "../hook/useBitArray";
import {MoreOptionLayer} from "../common/module/MoreOptionLayer";
import {SelectItem} from "../common/module/SelectLayer";

const PROVIDER = [
    true,true,true,true,true,true,false,false,false
]
const NAME = [
    '기기명','기기명','요금제명','요금제명','요금제','요금제명','부가서비스명','지원명','추가명','결합명'
]
const CODE = [
    true,true,false,false,false,false,false,false,false
]

export function MasterData(){
    const modal = useModal()
    const nav = useNavigate();
    const {gmdApi} = useApi();
    const [tab, setTab] = useState(0)
    const [keyword, setKeyword] = useState('')

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(20)

    const [checkMap, setCheckMap] = useState({

    })

    const [items, setItems] = useState(null)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        setCheckMap({})
    }, [tab]);

    useEffect(() => {
        getItems()
    }, [tab, keyword]);

    const getItems = async ()=>{
        const encodedKeyword = encodeURIComponent(keyword);
        await gmdApi.getData(tab, encodedKeyword).then(({status,data})=>{
            if(status === 200 && data){
                // console.table(data)
                if(data.total_cnt){
                    setTotalCount(data.total_cnt)
                }else{
                    setTotalCount(0)
                }
                if(data.list){
                    const parsed = JSON.parse(data.list)
                    setItems(parsed)
                }else{
                    setItems(null)
                    // setCheckMap({})
                }
            }
        })
    }

    const deleteCheckedData = async ()=>{
        const body = [];
        for(const i in checkMap){
            if(checkMap[i]){
                body.push(i)
            }
        }
        await gmdApi.deleteAll(tab, body).then(({status,data})=>{
            if(status === 200 && data){
                getItems()
            }
        })
    }

    const openBulkUploadModal =()=>{
        modal.openModal(ModalType.LAYER.Admin_Bulk_Upload, {
            type: tab
        })
    }

    const handleCheck = (id)=>{
        const copy = {...checkMap};
        copy[id] = checkMap[id] ? !checkMap[id] : true
        setCheckMap(copy);
    }

    return (
        <div className={Layout.sub}>
            <div className={Layout.sub_head}>
                <h2 className={Layout.sub_title}>동적 데이터 관리</h2>
                {/*<button type='button' className={cmc(Layout.sub_head_btn)} onClick={() => {*/}
                {/*    nav('/admin')*/}
                {/*}}>회원 관리*/}
                {/*</button>*/}
            </div>

            <div className={Layout.sub_tab}>
                <TabList name='user_st' value={tab} onChange={setTab} theme={Layout} values={
                    ['디바이스','세컨 디바이스','무선요금제','인터넷요금제','TV요금제','부가서비스','지원구분','추가구분','결합유형']
                }/>
            </div>

            <div className={`${Board.board} board_list`}>
                <div className={Board.board_head}>
                    <form>
                        <div className={Board.board_head_group}>
                            {/*<input type="text" className="inp date entered" placeholder="날짜 선택" value="최근 30일"/>*/}
                            {/*/!*입력시 entered 추가-->*!/*/}
                            {/*<button type="button" className="btn_all">전체 보기</button>*/}
                            <button onClick={openBulkUploadModal} type="button"
                                    className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>데이터 추가
                            </button>
                        </div>
                        <div className={Board.board_head_group}>
                            <div className={Board.board_count}>
                                <span className={Board.count_text}>전체 <em className={Board.em}>{totalCount}</em>건</span>
                                <span className={Board.count_text}><em
                                    className={Board.em}>{items ? items.length : 0}</em>건</span>
                            </div>

                            <div className={Board.board_search}>
                                <input className={Board.input} type="search" value={keyword} onChange={e => {
                                    setKeyword(e.target.value)
                                }} title="검색" id="board_search"
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button className={Board.button} type="button">검색</button>
                            </div>
                            <div className={`select_box ${cm(Board.board_btn_box)}`}>
                                <MoreOptionLayer cssModule={Board}>
                                    <SelectItem onClick={deleteCheckedData}>선택된 항목 삭제</SelectItem>
                                    {/*<SelectItem>검색 결과 다운로드</SelectItem>*/}
                                    {/*<SelectItem onClick={()=>{*/}
                                    {/*    nav("/service/sale/bulk-upload")*/}
                                    {/*}}>대량 업로드하기</SelectItem>*/}
                                </MoreOptionLayer>
                            </div>
                        </div>
                    </form>
                </div>

                <BoardTable>
                    <Bthead>
                        <Bth className="ta_c" checkbox></Bth>
                        {
                            PROVIDER[tab] && <Bth>통신사</Bth>
                        }
                        <Bth>{NAME[tab]}</Bth>
                        {
                            CODE[tab] && <Bth>모델명</Bth>
                        }
                        {/*<Bth>등록일자</Bth>*/}
                    </Bthead>
                    <Btbody br>
                        {
                        items && items.map((v,i)=> {
                                return <tr className={Board.tr} key={i} onClick={()=>{
                                    handleCheck(v.id)
                                }}>
                                    <Btd checkbox checked={checkMap[v.id] ?? false}/>
                                    {
                                       PROVIDER[tab] && <Btd>{LMD.provier[v.provider]}</Btd>
                                    }
                                    {
                                        NAME[tab] && <Btd>{v.name}</Btd>
                                    }
                                    {
                                        CODE[tab] &&  <Btd>{v.code}</Btd>
                                    }
                                </tr>
                            })
                        }
                    </Btbody>
                </BoardTable>
                {/*<BoardTableSelector tab={tab} items={items}/>*/}
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