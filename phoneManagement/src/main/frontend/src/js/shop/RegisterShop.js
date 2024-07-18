import User from "../../css/user.module.css"
import {UserFormBox} from "../account/module/UserFormBox";
import {UserCompanyItem} from "./module/UserCompanyItem";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import useApi from "../hook/useApi";
import {useSelector} from "react-redux";
import {shopItemReducer} from "../store/slices/shopItemSlice";
import useValidateInputField from "../hook/useValidateInputField";
import {bpNoRegex, telRegex} from "../utils/regex";
import {ComponentStepper} from "../utils/ComponentStepper";
import useModal from "../hook/useModal";
import {ObjectUtils} from "../utils/objectUtil";
import {ModalType} from "../common/modal/ModalType";
import {UserFormList} from "../account/module/UserFormList";
import {UserFormItem} from "../account/module/UserFormItem";
import {UserFormInput} from "../account/module/UserFormInput";
import {cmc} from "../utils/cm";

// 일단 보류
export function RegisterShop(){
    const {shopApi} = useApi();
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
        },
        {
            key: 'br_nm',
            name: '상호명',
            // msg: '상호명을 입력해주세요'
        },
        {
            key: 'br_no',
            name: '사업자번호',
            regex: bpNoRegex,
            msg: '사업자번호를 정확하게 입력해주세요',
        }
    ]);





    return (
        <ComponentStepper inputField={inputField} components={[
            RegisterShopStep1,
            RegisterShopStep2,
        ]}/>
    )
}

function RegisterShopStep1({inputField, prev, next}){
    const modal = useModal();
    const {userApi, shopApi} = useApi();
    const [bpNoChecked, setBpNoChecked] = useState(false)

    const checkBrNoStatus = async ()=>{
        if(inputField.validateOne('br_no')){
            await userApi.checkBrNoStatus(inputField.getInput('br_no')).then(({status,data})=>{
                if(status === 200){
                    let msg = null;
                    // console.table(data)
                    if(data === true){
                        msg = '사업자번호 인증에 성공하였습니다.'
                        setBpNoChecked(true)
                    }
                    // else if(!ObjectUtils.isEmpty(data.id)){
                    //     msg = '동일한 사업자번호로 가입된 계정이 존재합니다.'
                    // }
                    else{
                        msg = '존재하지 않는 사업자번호입니다.'
                    }
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: msg
                    })
                }
            })
        }
    }

    const submit = async()=>{
        if(!bpNoChecked){
            inputField.handleError('br_no','사업자번호를 인증해야 합니다.');
            return;
        }
        if(inputField.validateOne('br_nm')){
            next();
        }
    }

    return (
        <main>
            <div>
                <UserFormBox title='사업자 등록하기'>
                    <UserFormList>
                        <UserFormItem errorText={inputField.error.br_nm}>
                            <UserFormInput name='br_nm' inputField={inputField} subject='사업자 등록' placeholder='상호명을 입력하세요.'/>
                        </UserFormItem>
                        <UserFormItem style={{marginTop: 10}} errorText={inputField.error.br_no}>
                            <UserFormInput name='br_no' inputField={inputField} placeholder='-을 제외한 사업자등록번호 10자리를 입력하세요.'>
                                <button type="button" className={User.form_btn} onClick={checkBrNoStatus}>인증하기</button>
                            </UserFormInput>
                        </UserFormItem>
                    </UserFormList>

                    <div className={User.form_btn_box}>
                        <Link className={`btn_grey ${User.w30} ${cmc(User.btn)}`} to='/shop/list'>이전</Link>
                        <button type="button" className={`btn_blue ${User.w70} ${cmc(User.btn)}`} onClick={submit}>다음</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}


function RegisterShopStep2({inputField}){
    const {shopApi} = useApi();
    const nav = useNavigate()

    const submit = async ()=>{
        if(inputField.validateAll()){
            await shopApi.addShop({
                ...inputField.input,
                'shop_addr': inputField.getInput('shop_addr') + ' ' + inputField.getInput('shop_addr_detail')
            }).then(({status,data})=>{
                console.log(`${status} ${data}`)
                if(status === 200 && data){
                    nav('/service')
                }
            })
        }
    }
    return (
        <main>
            <div >
                <UserFormBox title='매장 등록하기'>
                    <div className={User.form_company}>
                        <ul className={User.company_list}>
                            <UserCompanyItem inputField={inputField}/>
                        </ul>

                        {/*<button type="button" className={`btn btn_sky btn_add_icon ${User.btn}`} onClick={addShopItem}>매장 추가</button>*/}
                    </div>

                    <div className={User.form_btn_box}>
                        <Link className={`btn btn_grey ${User.btn} ${User.w30}`} to=''>이전</Link>
                        <button type="button" className={`btn btn_blue ${User.btn}`} onClick={submit}>등록완료</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}