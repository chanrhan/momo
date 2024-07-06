import User from "../../css/user.module.css"
import {UserFormBox} from "./module/UserFormBox";
import {UserFormList} from "./module/UserFormList";
import {Link, useNavigate} from "react-router-dom";
import {UserFormItem} from "./module/UserFormItem";
import {UserFormInput} from "./module/UserFormInput";
import useInputField from "../hook/useInputField";
import {bpNoRegex} from "../utils/regex";
import useApi from "../hook/useApi";
import {cmc} from "../utils/cm";
import useModal from "../hook/useModal";
import {ModalType} from "../common/modal/ModalType";
import {useState} from "react";
import {ObjectUtils} from "../utils/objectUtil";

export function RegisterCorp(){
    const modal = useModal();
    const nav = useNavigate();
    const {userApi, shopApi} = useApi();
    const [bpNoChecked, setBpNoChecked] = useState(false)

    const inputField = useInputField([
        {
            key: 'corp_nm',
            name: '상호명'
        },
        {
            key: 'bp_no',
            name: '사업자번호',
            regex: bpNoRegex,
            msg: '사업자번호를 정확하게 입력해주세요',
        }
    ]);


    const checkBpNoStatus = async ()=>{
        if(inputField.validateOne('bp_no')){
            await userApi.checkBpnoStatus(inputField.input.bp_no).then(({status,data})=>{
                if(status === 200){
                    let msg = null;
                    if(data.matched === true){
                        msg = '사업자번호 인증에 성공하였습니다.'
                        setBpNoChecked(true)
                    }else if(!ObjectUtils.isEmpty(data.id)){
                        msg = '동일한 사업자번호로 가입된 계정이 존재합니다.'
                    }else{
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
            inputField.handleError('bp_no','사업자번호를 인증해야 합니다.');
            return;
        }
        if(inputField.validateAll()){
            await shopApi.addCorp(inputField.input).then(({status,data})=>{
                if(status === 200 && data === true){
                    nav('/shop/register')
                }
            })
        }
    }

    return (
        <main>
            <div>
                <UserFormBox title='사업자 등록하기'>
                    <UserFormList>
                        <UserFormItem errorText={inputField.error.bp_no}>
                            <UserFormInput errorText={inputField.error.corp_nm} name='corp_nm' inputField={inputField} subject='사업자 등록' placeholder='상호명을 입력하세요.'/>
                            <UserFormInput name='bp_no' inputField={inputField} placeholder='-을 제외한 사업자등록번호 10자리를 입력하세요.'>
                                <button type="button" className={User.form_btn} onClick={checkBpNoStatus}>인증하기</button>
                            </UserFormInput>
                        </UserFormItem>
                    </UserFormList>

                    <div className={User.form_btn_box}>
                        <Link href="#" className={`btn_grey ${User.w30} ${cmc(User.btn)}`} to='/role'>이전</Link>
                        <button type="button" className={`btn_blue ${User.w70} ${cmc(User.btn)}`} onClick={submit}>다음</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}