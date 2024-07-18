import Board from "../../../css/board.module.css"
import Layout from "../../../css/layout.module.css"
import {cm, cmc} from "../../utils/cm";
import {BoardTable, Btbody, Btd, Bth, Bthead} from "../board/BoardTable";
import {SaleTableData} from "./module/SaleTableData";
import useValidateInputField from "../../hook/useValidateInputField";
import {useEffect, useState} from "react";
import useApi from "../../hook/useApi";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import {useSelector} from "react-redux";
import {SaleFilterModal} from "./modal/SaleFilterModal";
import {MonthSelectModal} from "../../common/modal/menu/MonthSelectModal";
import {DateUtils} from "../../utils/DateUtils";
import {MoreOptionLayer} from "../../common/module/MoreOptionLayer";
import {SelectItem} from "../../common/module/SelectLayer";
import {all} from "axios";

export function Sale(){
    const modal = useModal();
    const {saleApi} = useApi();
    const inputField = useValidateInputField();
    const [totalCount, setTotalCount] = useState(0)
    const [asc, setAsc] = useState(new Array(10).fill(false))

    const user = useSelector(state=>state.userReducer)

    const [saleItems, setSaleItems] = useState([])
    const [allChecked, setAllChecked] = useState(false)
    const [checkedSale, setCheckedSale] = useState([])

    const getSale = async ()=>{
        await saleApi.getSaleAll(inputField.input).then(({status,data})=>{
            if(status === 200){
                // console.log(data)
                setSaleItems(data)
                setCheckedSale(new Array(data.length).fill(false))
            }
        })
    }
    const getSaleTotalCount = async ()=>{
        await saleApi.getSaleTotalCount().then(({status,data})=>{
            // console.log(`total count: ${status} ${data}`)
            if(status === 200 && !Number.isNaN(data)){
                setTotalCount(data)
            }
        })
    }


    useEffect(() => {
        getSale();
        getSaleTotalCount()
    }, [inputField.input]);

    // const getSaleCount = ()=>{
    //     return saleItems ? saleItems.length : 0;
    // }

    const addSale = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Detail, {
            user: user,
            onSubmit: refresh
        });
    }

    const openSaleDetail = (saleId)=>{
        modal.openModal(ModalType.LAYER.Sale_Detail, {
            sale_id: saleId,
            user: user,
            onSubmit: refresh
        });
    }

    const setMonth = (year, month)=>{
        inputField.put('keydate',DateUtils.formatYYMM(year,month))
    }

    const search = async ()=>{
        await getSale();
    }

    const refresh = async()=>{
        console.log('refresh')
        inputField.clear();
    }

    const setOrder = async (idx)=>{
        inputField.put('order',idx);
        const nextAsc = !asc[idx];
        console.log(`asc: ${nextAsc ? 1 : 0}`)
        inputField.put('asc',nextAsc);

        const copy = [...asc]
        copy[idx] = nextAsc
        setAsc(copy)
    }

    const checkAll = ()=>{
        setCheckedSale(new Array(checkedSale.length).fill(!allChecked))
        setAllChecked(!allChecked)
    }

    const checkSale = index=>{
        const copy = [...checkedSale]
        copy[index] = !copy[index]
        setCheckedSale(copy)
    }

    const deleteSale = async ()=>{
        const body = checkedSale.map((v,i)=>{
            if(v){
                return saleItems[i].sale_id;
            }
        }).filter(v=>v);

        if(body && body.length > 0){
            await saleApi.deleteSales(body).then(({status,data})=>{
                if(status === 200 && data){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: '판매일보가 삭제되었습니다.'
                    })
                    getSale();
                    getSaleTotalCount()
                }
            })
        }
    }


    const openFilterModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Filter, {
            top: '220px'
        })
    }

    const openColumnSelectModal = ()=>{

    }


    return (
        <div className={cm(Layout.sub)}>
            <div className={cm(Layout.sub_head)}>
                <h2 className={cm(Layout.sub_title)}>판매일보</h2>
            </div>

            <div className={cm(Board.board, "board_list")}>
                <div className={cm(Board.board_head)}>
                    <form>
                        <div className={cm(Board.board_head_group)} >
                            <MonthSelectModal name='keydate' inputField={inputField} onSelect={setMonth}/>
                            <button type="button" className="btn_all" onClick={refresh}>전체 보기</button>
                        </div>
                        <div className={cm(Board.board_head_group)}>
                            <div className={cm(Board.board_count)}>
                                <span className={cm(Board.count_text)}>전체 <em
                                    className={cm(Board.em)}>{totalCount}</em>건</span>
                                <span className={cm(Board.count_text)}><em className={cm(Board.em)}>{saleItems ? saleItems.length : 0}</em>건</span>
                            </div>

                            <button type="button" className={cm(Board.board_filter_btn)} onClick={openFilterModal}>필터</button>
                            {/*<SaleFilterModal/>*/}

                            <div className={cm(Board.board_search)}>
                                <input type="search" name='keyword' onChange={inputField.handleInput} value={inputField.getInput('keyword')} className={cm(Board.input)}
                                       placeholder="이름, 전화번호, 식별번호 검색"/>
                                <button type="button" className={cm(Board.button)} onClick={search}>검색</button>
                            </div>

                            <div className={cm(Board.board_btn_box)}>
                                <button type="button" className={cm(Board.board_btn, Board.board_filter)} onClick={openColumnSelectModal}>컬럼 선택</button>
                            </div>

                            <div className={`select_box ${cm(Board.board_btn_box)}`}>
                                <MoreOptionLayer cssModule={Board}>
                                    <SelectItem onClick={deleteSale}>판매일보 삭제</SelectItem>
                                    <SelectItem>검색 결과 다운로드</SelectItem>
                                </MoreOptionLayer>
                                {/*<button type="button" className={cm(Board.board_btn, Board.board_more)}>더보기</button>*/}
                            </div>

                            <button onClick={addSale} type="button" className={`btn_blue ${cmc(Board.btn, Board.btn_medium)}`}>판매일보 추가
                            </button>
                        </div>
                    </form>
                </div>

                <BoardTable caption='판매일보 테이블 - 선택, 메인 구분, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 모델명, 총 이익, 담당자, 예약 정보 제공'
                            colgroup={
                                <>
                                    <col style={{width: "42px"}}/>
                                    <col span="8"/>
                                    <col style={{width: "90px"}}/>
                                </>
                            }>
                    <Bthead>
                        <Bth name='check_all' onCheck={checkAll} checked={allChecked} checkbox/>
                        <Bth name='main_div'>메인 구분</Bth>
                        <Bth name='actv_dt' sort onClick={()=>{setOrder(0)}}>개통 날짜</Bth>
                        <Bth name='cust_nm'>이름</Bth>
                        <Bth name='cust_tel'>휴대폰 번호</Bth>
                        <Bth name='cust_cd'>식별 번호</Bth>
                        <Bth name='device_nm' sort onClick={()=>{setOrder(4)}}>모델명</Bth>
                        <Bth name='total_cms' sort onClick={()=>{setOrder(5)}}>총 이익</Bth>
                        <Bth name='seller_nm' sort onClick={()=>{setOrder(6)}}>담당자</Bth>
                        <Bth>예약</Bth>
                    </Bthead>
                    <Btbody br>
                        {
                            typeof saleItems === 'object' && saleItems.map((v,i)=>{
                                return <SaleTableData key={i} data={v} checked={checkedSale[i]} onCheck={()=>{
                                    checkSale(i)
                                }} onClick={()=>{
                                    openSaleDetail(v.sale_id)
                                }}/>
                            })
                        }
                    </Btbody>
                </BoardTable>

                <div className="view_more">
                    <button type="button" className="view_more_btn">더 보기</button>
                </div>
            </div>
        </div>
    )
}