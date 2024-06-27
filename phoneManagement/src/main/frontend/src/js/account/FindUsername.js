import User from "../../css/user.module.css"
import {UserDoubleCheckbox} from "./module/UserDoubleCheckbox";
import {UserFormBox} from "./module/UserFormBox";
import {UserFormBtnBox} from "./module/UserFormBtnBox";

export function FindUsername(){
    return (
        <UserFormBox title='아이디 찾기' find={true}>
            <UserDoubleCheckbox/>

            <UserFormBtnBox value='다음'/>
        </UserFormBox>
    )
}