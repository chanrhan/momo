import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getShopListByReps} from "../api/ShopApi";
import {MenuModal} from "../modal/MenuModal";
import useModal from "../modal/useModal";
import {ModalType} from "../modal/ModalType";
import {ObjectUtils} from "../utils/objectUtil";
import {updateCurrentShop} from "../api/UserApi";
import {getUserInfo} from "../api/AccountApi";
import {HttpStatusCode} from "axios";
import {userActions} from "../store/slices/userSlice";

function ChangeShopModal(props){
    const dispatch = useDispatch();
    const modal = useModal();
    const {accessToken} = useSelector(state=>state.authReducer)
    const [shopList,setShopList] = useState([]);

    useEffect(()=>{
        getShopListByReps(accessToken).then(({status, data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                setShopList(data);
            }
        })
    },[])

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Change_Shop);
    }

    const handleCheck = e=>{
        updateCurrentShop(e.target.value, accessToken).then(({status, data})=>{
            if(status === 200){
                alert("매장이 변경되었습니다")
                getUserInfo(accessToken).then(({status, data})=>{
                    if(status === HttpStatusCode.Ok){
                        dispatch(userActions.setUserInfo(data));
                        close();
                    }
                })

            }
        })
    }


    return (
        <MenuModal x={props.e.clientX} y={props.e.clientY} width='20%' height='30%' close={close}>
            {
                shopList.map((value,index)=>{
                    return <div key={index} className='d-flex flex-row justify-content-center'>
                        <h4>{value.shop_nm}</h4>
                        <input type="radio" name='shop_item' value={value.shop_id} onChange={handleCheck}/>
                    </div>
                })
            }
        </MenuModal>
    )
}


export default ChangeShopModal;