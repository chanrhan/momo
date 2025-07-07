import {cm, cmc} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";
import profileImg1 from "../../../../images/profile_img1.jpg"
import {Btd} from "../../board/BoardTable";
import {ProfileTableColumn} from "./ProfileTableColumn";
import {ObjectUtils} from "../../../utils/objectUtil";
import {LMD} from "../../../common/LMD";
import {DateSelectModule} from "../../../common/modal/menu/DateSelectModule";
import Popup from "../../../../css/popup.module.css";
import useApi from "../../../hook/useApi";
import {DateUtils} from "../../../utils/DateUtils";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";


const PROPS_STATE = [
    {
        msg: '정말로 추방하시겠습니까?',
        btn_submit_name: '추방',
        bar_color: `#ff4747`,
        btn_color: `#ff4747`,
    },
    {
        msg: '정말로 승인하시겠습니까?',
        btn_submit_name: '승인',
        bar_color: `#4781ff`,
        btn_color: `#4781ff`,
    },
    {
        msg: '정말로 거절하시겠습니까?',
        btn_submit_name: '거절',
        bar_color: `#ff4747`,
        btn_color: `#ff4747`,
    }
]

export function StaffTableData({data, onUpdate}){
    const {userApi} = useApi();
    const state= data.approval_st;
    const modal = useModal()

    const openConfirmModal = (state)=>{
        modal.openModal(ModalType.MENU.Confirm, {
            msg: PROPS_STATE[state].msg,
            top: 100,
            btn_submit_name: PROPS_STATE[state].btn_submit_name,
            btn_color: PROPS_STATE[state].btn_color,
            // progress: {
            //   bar_color: PROPS_STATE[state].bar_color
            // },
            onSubmit: ()=>{
                updateApprovalState((state === 1) ? 1: 2)
            }
        })
    }

    const updateApprovalState = async (state)=>{
        await userApi.updateApprovalState({
            user_id: data.id,
            approval: state,
            shop_id: data.shop_id
        }).then(({status,data})=>{
            if(status === 200 && data){
                onUpdate();
            }
        })
    }

    const updateStartDate = async (year, month, day)=>{
        const date = DateUtils.formatYYMMdd(year, month, day);
        await userApi.updateStaffStartDate({
            user_id: data.id,
            start_dt: date
        }).then(({status,data})=>{
            if(status === 200 && data){
                onUpdate();
            }
        })
    }


    if(ObjectUtils.isEmpty(data)){
        return  null;
    }

    return (
        <tr className={Board.tr}>
            {/*<Btd checkbox name='check1'/>*/}
            {/*<Btd>{data.id}</Btd>*/}
            <ProfileTableColumn src={profileImg1} name={data.name}/>
            <Btd width={160}>{data.email}</Btd>
            <Btd>{data.tel}</Btd>
            {/*<Btd>{LMD.role[data.role]}</Btd>*/}
            <Btd>{data.last_login_dt}</Btd>
            <Btd>
                <DateSelectModule rootClassName={Popup.head_box}
                                  onSelect={updateStartDate}>
                    <input type="text" className={Board.td_date_inp}
                           value={data.start_dt}
                           placeholder='입사 날짜' readOnly/>
                </DateSelectModule>
            </Btd>
            <Btd>
                {
                    state !== 0 ?
                        <button type="button" className={`btn btn_grey btn_small btn_line ${Board.btn_approval}`} onClick={()=>{
                            openConfirmModal(0);
                        }}>
                            추방하기
                        </button>
                        :  (
                            <>
                                <button type="button" className="btn btn_blue btn_small btn_line btn_half" onClick={()=>{
                                    openConfirmModal(1);
                                }}>승인</button>
                                <button type="button" className="btn btn_red btn_small btn_line btn_half" onClick={()=>{
                                    openConfirmModal(2);
                                }}>거절</button>
                            </>
                        )
                }

            </Btd>
        </tr>
    )
}