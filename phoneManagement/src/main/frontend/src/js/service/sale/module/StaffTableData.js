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

export function StaffTableData({data, onUpdate}){
    const {userApi} = useApi();
    const state= data.approval_st;

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
            <Btd>{data.id}</Btd>
            <ProfileTableColumn src={profileImg1} name={data.name}/>
            <Btd width={160}>{data.email}</Btd>
            <Btd>{data.tel}</Btd>
            <Btd>{LMD.role[data.role]}</Btd>
            <Btd>{data.last_login_dt}</Btd>
            <Btd>
                <DateSelectModule rootClassName={Popup.head_box}
                                  onSelect={updateStartDate}>
                    <input type="text" className={Board.td_date_inp}
                           value={data.start_dt}
                           placeholder='개통 날짜' readOnly/>
                </DateSelectModule>
            </Btd>
            <Btd>
                {
                    state !== 0 ?
                        <button type="button" className={`btn ${state === 1 ? 'btn_blue':'btn_red'} btn_small btn_line`}>
                            {state === 1 ? '승인완료':'승인거절'}
                        </button>
                        :  (
                            <>
                                <button type="button" className="btn btn_grey btn_small btn_line" onClick={()=>{
                                    updateApprovalState(1);
                                }}>승인</button>
                                <button type="button" className="btn btn_red btn_small btn_line" onClick={()=>{
                                    updateApprovalState(2);
                                }}>거절</button>
                            </>
                        )
                }

            </Btd>
        </tr>
    )
}