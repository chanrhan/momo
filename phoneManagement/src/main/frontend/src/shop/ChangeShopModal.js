import {ShadowModal} from "../modal/ShadowModal";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getShopListByReps} from "../api/ShopApi";
import {PopupModal} from "../modal/PopupModal";

function ChangeShopModal(props){
    const {accessToken} = useSelector(state=>state.authReducer)
    const [shopList,setShopList] = useState([]);

    useEffect(()=>{
        getShopListByReps(accessToken).then(({status, data})=>{
            if(status === 200){
                setShopList(data);
            }
        })
    },[])

    const submit = async ()=>{

    }

    return (
        <PopupModal width='20%' height='40%'>
            {
                shopList.map((value,index)=>{
                    return <div key={index}>
                        <h4>{value.shop_nm}</h4>
                    </div>
                })
            }
        </PopupModal>
    )
}


export default ChangeShopModal;