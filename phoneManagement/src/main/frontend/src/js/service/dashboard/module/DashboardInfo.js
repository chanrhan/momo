import {cm, cmc} from "../../../utils/cm";
import Dashboard from "../../../../css/dashboard.module.css";
import ProfileImg1 from "../../../../images/profile_img1.jpg"
import {DashboardSchedule} from "./DashboardSchedule";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {userReducer, userSlice} from "../../../store/slices/userSlice";
import {useEffect, useState} from "react";
import useApi from "../../../hook/useApi";
import {SelectItem, SelectLayer} from "../../../common/module/SelectLayer";
import {SelectOptionLayer} from "../../../common/module/SelectOptionLayer";
import useInputField from "../../../hook/useInputField";

export function DashboardInfo({}){
    const inputField = useInputField();
    const userInfo = useSelector(state=>state.userReducer)
    const [profileImg, setProfileImg] = useState(null)
    const [shops, setShops] = useState(null)
    const {userApi, shopApi} = useApi();

    const [actives, setActives] = useState(new Array(2).fill(false))

    const [shopItems, setShopItems] = useState(null);

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
            }
        })
    }

    useEffect(()=> {
        getPfp();
        getShopAll();
    },[])


    const toggleActive = (e)=>{
        const idx = e.target.getAttribute('index');
        // console.log(`idx: ${idx}`)
        const copy = [...actives]
        copy[idx] = !copy[idx]
        setActives(copy)
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
                        <input type="hidden" id=""/>
                        {/*<button type="button" className={cmc(Dashboard.select_btn)} index={0} onClick={toggleActive}>울타리 평촌역점</button>*/}
                        {
                            shopItems && <SelectOptionLayer name='shop_id'
                                                            className={Dashboard.select_btn}
                                                            inputField={inputField}
                                                            values={shopItems.map((v,_)=>{
                                                                return v.item_nm;
                                                            }
                            )}/>
                        }
                    </div>
                    <div className={cmc(Dashboard.select_box)}>
                        <input type="hidden" id=""/>
                        <SelectOptionLayer name='role'
                                           inputField={inputField}
                                           className={Dashboard.select_btn}
                                           values={['대표','점장','직원']}/>
                    </div>
                </div>

                <Link to='/shop/register'>
                    <button type="button" className={cm(Dashboard.company_add)} >매장 추가하기</button>
                </Link>
            </div>
            <DashboardSchedule/>
        </div>
    )
}