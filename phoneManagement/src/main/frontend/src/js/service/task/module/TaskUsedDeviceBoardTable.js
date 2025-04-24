import {BoardTable, Btbody, Btd, Bth, Bthead} from "../../board/BoardTable";
import {TaskTableData} from "./TaskTableData";
import {SelectBox} from "../../board/SelectBox";
import {ProfileTableColumn} from "../../sale/module/ProfileTableColumn";
import profileImg1 from "../../../../images/profile_img1.jpg";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import Board from "../../../../css/board.module.css"
import {LMD} from "../../../common/LMD";
import {useRef} from "react";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import useApi from "../../../hook/useApi";
import {NumberUtils} from "../../../utils/NumberUtils";

export function TaskUsedDeviceBoardTable({checkAll, allChecked, checkedSale, onCheck, profileImages, items, onChangeState, onSelectSale, notDone}){
    const modal = useModal()
    const tableRef = useRef()

    const changeState = (saleId, state, udId, udNm, cms)=>{
        if(state === 2) {
            modal.openModal(ModalType.LAYER.Used_Device_Cms, {
                ud_nm: udNm,
                cms: cms,
                onSubmit: (amount) => {
                    onChangeState({
                        sale_id: saleId,
                        ud_id: udId,
                        state: state,
                        amount: amount
                    });
                    // saleApi.updateUsedDeviceCms({
                    //     sale_id: saleId,
                    //     ud_id: udId,
                    //     amount: amount
                    // }).then(({status,data})=>{
                    //     if(status === 200 && data){
                    //
                    //     }
                    // })
                }
            })
            return;
        }
        onChangeState({
            sale_id: saleId,
            ud_id: udId,
            state: state
        });
    }

    return (
        <BoardTable caption='고객관리 테이블 - 선택, 진행 사항, 개통날짜, 이름, 휴대폰 번호, 식별 번호, 중고폰, 판매 금액, 총 이익, 담당자, 전송 정보 제공'
                    tableRef={tableRef}>
            <Bthead>
                <Bth checked={allChecked} onCheck={checkAll} checkbox/>
                <Bth>진행 사항</Bth>
                <Bth sort>개통날짜</Bth>
                <Bth>이름</Bth>
                <Bth className="ta_c">휴대폰 번호</Bth>
                <Bth className="ta_c">식별 번호</Bth>
                <Bth className="ta_c">중고폰</Bth>
                <Bth className="ta_c">판매 금액</Bth>
                <Bth className="ta_c">총 이익</Bth>
                <Bth className="ta_c" >담당자</Bth>
                {/*<Bth className="ta_c" >전송</Bth>*/}
            </Bthead>
            <Btbody br>
                {
                    items && items.map((v, i)=>{
                        return <tr key={i} onClick={()=>{
                            onSelectSale(v.sale_id)
                        }} className={Board.tr}>
                            <Btd name={`c_${v.sale_id}`} checked={checkedSale[i]} onCheck={()=>{
                                onCheck(i)
                            }} checkbox/>
                            <Btd stopPropagation>
                                <div className="select_box">
                                    <SelectIndexLayer value={LMD.ud_st[v.ud_st]} cssModule={Board}
                                                      onChange={state=>{
                                                          if(v.ud_st === state) {
                                                              return;
                                                          }
                                                          changeState(v.sale_id, state, v.ud_id, v.ud_nm, v.ud_cms);
                                                      }} values={LMD.ud_st}/>
                                </div>
                            </Btd>
                            <Btd>{v.actv_dt}</Btd>
                            <Btd className="ta_r">{v.cust_nm}</Btd>
                            <Btd className="ta_c">{v.cust_tel}</Btd>
                            <Btd className="ta_r">{v.cust_cd}</Btd>
                            <Btd className="ta_r">{v.ud_nm}</Btd>
                            <Btd className="ta_r">{NumberUtils.toPrice(v.ud_cms)}원</Btd>
                            <Btd className="ta_r">{NumberUtils.toPrice(v.total_cms)}원</Btd>
                            <ProfileTableColumn name={v.seller_nm} src={profileImages ? profileImages[i] : profileImg1}/>
                            {/*<Btd className="ta_c">*/}
                            {/*    <button type="button" className="btn_kakao">전송</button>*/}
                            {/*</Btd>*/}
                        </tr>
                    })
                }
            </Btbody>
        </BoardTable>
    )
}