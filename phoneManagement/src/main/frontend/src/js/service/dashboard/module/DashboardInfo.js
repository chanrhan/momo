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
import {SelectModal} from "../../../common/modal/menu/SelectModal";
import useValidateInputField from "../../../hook/useValidateInputField";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import {ElementUtils} from "../../../utils/ElementUtils";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {SelectOptionInputLayer} from "../../../common/module/SelectOptionInputLayer";

export function DashboardInfo({}){
    const inputField = useValidateInputField();
    const modal = useModal();
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
            // console.table(userInfo)
            inputField.put('nickname',userInfo.nickname)
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


    // const openShopSelectModal = (e)=>{
    //     const pos = ElementUtils.getAbsolutePos(e, 1.1)
    //     modal.openModal(ModalType.MENU.Select, {
    //         name: 'shop',
    //         inputField: inputField,
    //         theme: Dashboard,
    //         top: `${pos.top}px`,
    //         left: `${pos.left}px`,
    //         values: shopItems && shopItems.map((v,_)=>{
    //                 return v.item_nm;
    //             })
    //     })
    // }


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
                        <SelectIndexLayer cssModules={Dashboard} inputField={inputField} values={getShopItems()} name='shop_nm'/>
                    </div>

                    <div className={cmc(Dashboard.select_box)}>
                        <input type="hidden" id=""/>

                        <SelectOptionInputLayer cssModules={Dashboard} inputField={inputField} values={['대표','점장']} name='nickname'/>
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