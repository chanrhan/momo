import User from "../../../css/user.module.css"
import {UserFormList} from "../../account/module/UserFormList";
import {UserFormItem} from "../../account/module/UserFormItem";
import {UserFormInput} from "../../account/module/UserFormInput";
import {cm, cmc} from "../../utils/cm";
import {forwardRef, useImperativeHandle, useMemo, useState} from "react";
import useValidateInputField from "../../hook/useValidateInputField";
import {SelectModal} from "../../common/modal/menu/SelectModal";
import {telRegex} from "../../utils/regex";

// 함수형 컴포넌트에서는 ref를 prop으로 받을 수 없음
// 따라서 forwardRef를 사용함
/**
* @deprecated
*/
export const UserCompanyItem_backup1 = forwardRef(({init, index, onDelete, onSelect, close}, ref)=>{
    const inputField = useValidateInputField([
        {
            key: 'provider',
            name: '통신사',
            value: 'SKT'
        },
        {
            key: 'shop_nm',
            name: '매장명'
        },
        {
            key: 'shop_tel',
            name: '매장 전화번호',
            regex: telRegex,
            msg: '전화번호 규격에 알맞게 입력해주세요'
        },
        {
            key: 'shop_addr',
            name: '매장 주소'
        }
    ]);

    useMemo(() => {
        if(init) {
            console.table(init)
            inputField.setValues(init)
        }
    }, []);


    const [error, setError] = useState(false)

    // ref 값 변경
    useImperativeHandle(ref, ()=>({
        getInput: ()=> {
            // if(!inputField.validateAll()){
            //     setError(true)
            //     return null;
            // }
            // setError(false)
            return inputField.input;
        }
    }))

    return (
        <li className={`${User.company_item} ${close && User.close} ${error && 'border_error'}`}>
            <UserFormList>
                <UserFormItem errorText={!close && inputField.error.shop_nm}>
                    <div className={cm(User.form_item_box,User.w70)}>
                        <UserFormInput inputField={inputField} subject='매장명' name='shop_nm' placeholder='매장명을 입력해주세요.' readOnly={close}/>
                    </div>
                    <div className={cm(User.form_item_box, User.w30)}>
                        <label htmlFor="shop_tp" className={User.form_label}>매장 구분</label>
                        <div className={User.form_inp}>
                            <div className={`select_box ${User.select_box}`}>
                                <input type="hidden" id="shop_tp"/>
                                <SelectModal name='provider' values={['SKT','KT','LG','판매점']} inputField={inputField}/>
                            </div>
                        </div>
                    </div>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.shop_addr}>
                    <UserFormInput inputField={inputField} subject='매장 주소' name='shop_addr' placeholder='주소를 검색해주세요.' search/>
                    <UserFormInput inputField={inputField} name='shop_addr_detail' placeholder='상세 주소를 입력해주세요.'/>
                </UserFormItem>
                <UserFormItem errorText={inputField.error.shop_tel}>
                    <UserFormInput inputField={inputField} subject='매장 전화번호' name='shop_tel' placeholder='- 없이 숫자만 입력해주세요.'/>
                </UserFormItem>
            </UserFormList>
            <div className={User.company_btn_box}>
                <button index={index} type="button" className={cm(User.button, User.company_del_btn)} onClick={onDelete}>삭제</button>
                <button index={index} type="button" className={cm(User.button, User.company_open_btn)} onClick={onSelect}>닫기</button>
            </div>
        </li>
    )
})