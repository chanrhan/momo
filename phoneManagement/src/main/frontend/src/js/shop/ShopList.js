import {Link, useNavigate} from "react-router-dom";
import User from "../../css/user.module.css"
import {UserFormBox} from "../account/module/UserFormBox";
import {UserFormList} from "../account/module/UserFormList";
import {UserFormBtnBox} from "../account/module/UserFormBtnBox";
import {UserFormItem} from "../account/module/UserFormItem";
import {UserFormInput} from "../account/module/UserFormInput";
import useValidateInputField from "../hook/useValidateInputField";
import useApi from "../hook/useApi";
import {useEffect, useState} from "react";
import {LMD} from "../common/LMD";
import {ObjectUtils} from "../utils/objectUtil";

export function ShopList(){
    const {shopApi} = useApi();
    const [shopItems, setShopItems] = useState([])
    const nav = useNavigate()

    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        getShop();
    }, [keyword]);

    const select = async (shopId)=>{
        await shopApi.joinShop(shopId).then(({status,data})=>{
            if(status === 200 && data){
                nav('/service')
            }
        })
    }


    const getShop = async ()=>{
        await shopApi.getShop(keyword).then(({status,data})=>{
            if(status === 200){
                // console.table(data)
                setShopItems(data)
            }
        })
    }

    return (
        <main>
            <div>
                <UserFormBox title='매장 검색하기'>
                    <UserFormList>
                        <UserFormItem>
                            <UserFormInput value={keyword}
                                           onChange={e=>{
                                               setKeyword(e.target.value)
                                           }}
                                           subject='매장 검색' search
                                           placeholder="매장명 또는 회사명으로 검색해주세요."/>
                        </UserFormItem>
                        <div className={User.form_company_request}>
                            <ul className={User.request_list}>
                                {
                                    shopItems && shopItems.map((v,i)=> {
                                        let provider = LMD.provier[v.provider];
                                        if(ObjectUtils.isEmpty(provider)){
                                            provider = "판매점"
                                        }
                                        return <li key={i} className={User.li}>
                                            <span className={User.company_text}>
                                                <span className={User.corp_name}>{v.corp_nm}  |</span>
                                                <span className={User.provider_name}> {provider}</span>
                                                <span className={User.company_name}>
                                                    {v.shop_nm}
                                                </span>
                                                <span className={User.company_addr}>
                                                    {v.shop_addr}
                                                </span>

                                            </span>
                                            <button type="button"
                                                    disabled={v.approval_denied}
                                                    className={`btn btn_medium btn_line ${User.company_btn}`} onClick={()=>{
                                                        select(v.shop_id);
                                            }}>{v.approval_denied ? "승인 거절됨" : "승인 요청"}
                                            </button>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </UserFormList>
                    <Link to='/shop/brno' className={`btn btn_sky btn_add_icon ${User.btn}`}>
                        매장 추가
                        {/*<button type="button" >매장 추가</button>*/}
                    </Link>

                    <div className={User.form_btn_box}>
                        <Link to='/service' className='btn btn_grey'>
                            이전
                        </Link>
                    </div>

                    <p className={`${User.form_text} ta_c`}>매장이 등록되어있지 않다면 대표님에게 회사 등록을 요청해주세요.</p>
                </UserFormBox>
            </div>
        </main>
    )
}