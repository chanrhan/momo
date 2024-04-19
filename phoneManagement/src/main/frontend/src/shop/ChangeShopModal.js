import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MenuModal} from "../modal/MenuModal";
import useModal from "../modal/useModal";
import {ModalType} from "../modal/ModalType";
import {ObjectUtils} from "../utils/objectUtil";
import {HttpStatusCode} from "axios";
import {userActions} from "../store/slices/userSlice";
import useApi from "../utils/useApi";

function ChangeShopModal(props){
    const dispatch = useDispatch();
    const modal = useModal();
    const {userApi, shopApi} = useApi();
    const [shopList,setShopList] = useState([]);

    useEffect(()=>{
        shopApi.getShopListByReps().then(({status, data})=>{
            if(status === 200 && !ObjectUtils.isEmpty(data)){
                setShopList(data);
            }
        })
    },[])

    const close = ()=>{
        modal.closeModal(ModalType.MENU.Change_Shop);
    }

    const handleCheck = async (e)=>{
        await userApi.updateCurrentShop(e.target.value).then(({status, data})=>{
            if(status === 200){
                alert("매장이 변경되었습니다")
                userApi.getUserInfo().then(({status, data})=>{
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