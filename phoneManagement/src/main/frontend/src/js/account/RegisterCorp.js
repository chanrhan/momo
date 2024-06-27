import User from "../../css/user.module.css"
import {UserFormBox} from "./module/UserFormBox";
import {UserFormList} from "./module/UserFormList";
import {Link} from "react-router-dom";

export function RegisterCorp(){
    return (
        <main>
            <div>
                <UserFormBox title='사업자 등록하기'>
                    <UserFormList>
                        <li className={User.form_item}>
                            <label htmlFor="buisnessman" className={User.form_label}>사업자 등록</label>
                            <div className={User.form_inp}>
                                <input type="text" id="buisnessman" className={`inp ${User.inp}`} placeholder="상호를 입력해주세요."/>
                            </div>
                            <div className={User.form_inp}>
                                <input type="text" title="인증번호" id="phoneCode" className={`inp ${User.inp}`} placeholder="- 없이 숫자만 입력해주세요."/>
                                    <button type="button" className={User.form_btn}>인증하기</button>
                            </div>
                            <p className={User.error_text}>유효하지 않은 사업자 번호입니다.</p>
                        </li>
                    </UserFormList>

                    <div className={User.form_btn_box}>
                        <Link href="#" className={`btn btn_grey ${User.w30} ${User.btn}`} to='/role'>이전</Link>
                        <button type="submit" className={`btn btn_blue ${User.w70} ${User.btn}`}>다음</button>
                    </div>
                </UserFormBox>
            </div>
        </main>
    )
}