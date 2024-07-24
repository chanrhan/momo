import {cm, cmc} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import ProfileImg1 from "../../../../images/profile_img1.jpg"
import {DashboardSchedule} from "./DashboardSchedule";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import useValidateInputField from "../../../hook/useValidateInputField";
import useModal from "../../../hook/useModal";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {ChangeNicknameLayer} from "../../../common/module/ChangeNicknameLayer";
import {useObjectInputField} from "../../../hook/useObjectInputField";
import {ModalType} from "../../../common/modal/ModalType";

export function DashboardInfo({}){
    const modal = useModal();

    const inputField = useObjectInputField();
    const [nickname, setNickname] = useState(null)
    const userInfo = useSelector(state=>state.userReducer)
    const [profileImg, setProfileImg] = useState(null)
    const {userApi, shopApi} = useApi();

    const [shopItems, setShopItems] = useState([]);

    const getPfp = async ()=>{
        await userApi.getProfilePicture(userInfo.id).then((data)=>{
            setProfileImg(data)
        })
    }

    const getShopAll = async ()=>{
        await shopApi.getShopAll().then(({status,data})=>{
            if(status === 200){
                console.log(data)
                setShopItems(data)
                // inputField.put('shop_nm',0)
            }
        })
    }

    useEffect(() => {
        if(userInfo){
            setNickname(userInfo.nickname)
        }
    }, [userInfo]);

    useEffect(()=> {
        getPfp();
        getShopAll();
    },[])

    const getShopItems = ()=>{
        return shopItems ? shopItems.map((v,i)=>{
            return v.shop_nm
        }) : null;
    }

    const updateNickname = (v)=>{
        setNickname(v);
        console.log(`update: ${v}`)
        userApi.updateNickname(v).then(({status,data})=>{
            if(status === 200 && data){
                modal.openModal(ModalType.SNACKBAR.Info, {
                    msg: '호칭이 변경되었습니다'
                })
            }
        })
    }

    return (
        <div className={cm(Dashboard.dashboard_info, Dashboard.div)}>
            <div className={cm(Dashboard.info_company, Dashboard.div)}>
                <div className={cm(Dashboard.company_profile)}>
                        <span className={cm(Dashboard.profile_img)}><img src={ProfileImg1}
                                                           alt="프로필 이미지"/></span>
                    <span className={cm(Dashboard.profile_name)}>{userInfo.name}<button type="button"
                                                              className={cm(Dashboard.profile_edit)}>수정</button></span>
                    <button type="button" className={`btn btn_blue btn_medium ${Dashboard.profile_btn}`}>초대하기</button>
                </div>

                <div className={cm(Dashboard.company_select)}>
                    <div className={cmc(Dashboard.select_box)}>
                        {/*<input type="hidden" id=""/>*/}
                        <SelectIndexLayer cssModules={Dashboard} inputField={inputField} values={getShopItems()} name='shop_nm'/>
                    </div>

                    <div className={cmc(Dashboard.select_box)}>
                        {/*<input type="hidden" id=""/>*/}
                        <ChangeNicknameLayer value={nickname} values={['대표','점장']}
                                             onChange={updateNickname}/>
                    </div>
                </div>

                <Link to='/shop/register'>
                    <button type="button" className={cm(Dashboard.company_add)}>매장 추가하기</button>
                </Link>
            </div>
            <DashboardSchedule/>
        </div>
    )
}