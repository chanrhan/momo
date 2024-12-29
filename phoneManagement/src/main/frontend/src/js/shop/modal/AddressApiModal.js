import {LayerModal} from "../../common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import Popup from "../../../css/popup.module.css";
import {cm, cmc} from "../../utils/cm";
import User from "../../../css/user.module.css";
import {UserFormItem} from "../../account/module/UserFormItem";
import {UserFormInput} from "../../account/module/UserFormInput";
import {LMD} from "../../common/LMD";
import {ObjectUtils} from "../../utils/objectUtil";
import {UserFormList} from "../../account/module/UserFormList";
import {useState} from "react";
import useApi from "../../hook/useApi";

export function AddressApiModal(props){
    const modal = useModal();
    const {shopApi} = useApi()
    const [items, setItems] = useState([])
    const [keyword, setKeyword] = useState('')
    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Address)
    }

    const search = ()=>{
        shopApi.getAddress(keyword).then(({status,data})=>{
            if(status === 200 && data){
                console.table(data)
                if(data.results.common.errorMessage !== "정상"){
                    setItems(null)
                }else{
                    setItems(data.results.juso)
                }
            }
        })
    }

    const onSelect = (value)=>{
        if(props.onSubmit){
            props.onSubmit(value)
        }
        close();
    }

    const submit = async ()=>{

    }
    return (
        <LayerModal {...props} top={0} maxWidth={650} maxHeight={800}>
            <div className={cm(Popup.user_form, User.user_form)}>
                <div className={Popup.popup_cont}>
                    <h2 className={cm(User.user_title, Popup.user_title)}>매장 주소 검색</h2>
                    {/*<p className={cm(Popup.form_text, User.form_text)}>주소를 검색해주세요</p>*/}

                    <UserFormList>
                        <UserFormItem>
                            <UserFormInput value={keyword}
                                           onChange={e=>{
                                               setKeyword(e.target.value)
                                           }}
                                           onSearch={search}
                                           onKeyDown={e=>{
                                               if(e.keyCode === 13){
                                                   search()
                                               }
                                           }}
                                           subject='주소 검색하기' search
                                           placeholder="도로명 또는 지번으로 검색해주세요."/>
                        </UserFormItem>
                        <div className={User.address_search}>
                            <ul className={User.address_list}>
                                {
                                    items && items.map((v,i)=> {
                                        return <li key={i} className={User.li} >
                                            <span className={User.address_text}>
                                                <span className={User.road_addr} onClick={()=>{
                                                    onSelect(v.roadAddr)
                                                }}>{v.roadAddr}</span>
                                                <span className={User.jibun_addr} onClick={()=>{
                                                    onSelect(v.jibunAddr)
                                                }}>{v.jibunAddr}</span>
                                            </span>
                                            <span className={User.zip_num}>[{v.zipNo}]</span>
                                            {/*<button type="button"*/}
                                            {/*        className={`btn btn_medium btn_line ${User.address_btn}`} onClick={()=>{*/}
                                            {/*    onSelect(v.shop_id);*/}
                                            {/*}}>선택*/}
                                            {/*</button>*/}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </UserFormList>
                </div>

                {/*<div className={Popup.popup_btn_box}>*/}
                {/*    <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>완료</button>*/}
                {/*</div>*/}
            </div>
            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>

        </LayerModal>
    )
}