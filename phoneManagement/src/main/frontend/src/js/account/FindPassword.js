import {Link} from "react-router-dom";
import User from "../../css/user.module.css"
import {ComponentStepper} from "../utils/ComponentStepper";
import {UserDoubleCheckbox} from "./module/UserDoubleCheckbox";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormBtnBox} from "./module/UserFormBtnBox";
import {UserFormItem} from "./module/UserFormItem";
import {UserFormList} from "./module/UserFormList";
import {UserFormInput} from "./module/UserFormInput";

export function FindPassword(){
    return (
        <ComponentStepper components={[
            FindPasswordStep1,
            FindPasswordStep2,
            FindPasswordStep3
        ]}/>
    )
}


function FindPasswordStep1({next, prev}){
    return (
        <UserFormBox title='비밀번호 찾기' find={true}>
            <p className={`ta_c ${User.form_text} `}>회원님의 정보와 일치하는 아이디입니다.</p>

            <UserFormList>
                <UserFormItem>
                    <UserFormInput placeholder='아이디를 입력해주세요.'/>
                    <p className={User.link_text}>아이디가 기억나지 않는다면? <Link className={User.a}
                                                                        to='/account/find-username'>아이디
                        찾기</Link></p>
                </UserFormItem>
            </UserFormList>

            <UserFormBtnBox value='다음' onClick={next}/>
        </UserFormBox>
    )
}

function FindPasswordStep2({next, prev}) {
    return (
        <UserFormBox title='비밀번호 찾기' find={true}>
            <UserDoubleCheckbox/>

            <UserFormBtnBox value='다음' onClick={next}/>
        </UserFormBox>
    )
}

function FindPasswordStep3(){
    return (
        <UserFormBox title='비밀변호 변경하기'>
            <p className={`ta_c ${User.form_text}`}>보안을 위해 비밀번호를 변경해주세요.</p>

            <ul className={`${User.form_list} ${User.form_select}`}>
                <UserFormItem>
                    <UserFormInput subject='새 비밀번호 (숫자, 영문, 특수문자 조합 8글자 이상)' varName='pwd'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput subject='새 비밀번호 확인' varName='comfirmed_pwd'/>
                </UserFormItem>
            </ul>

            <UserFormBtnBox value='변경완료'/>
        </UserFormBox>
    )
}

