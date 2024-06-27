import {Link} from "react-router-dom";
import User from "../../css/user.module.css"
import {UserFormBox} from "./module/UserFormBox";
import {UserFormList} from "./module/UserFormList";
import {UserFormBtnBox} from "./module/UserFormBtnBox";
import {UserFormItem} from "./module/UserFormItem";
import {UserFormInput} from "./module/UserFormInput";

export function SelectShop(){
    return (
        <main>
            <div>
                <UserFormBox title='매장 검색하기'>
                    <UserFormList>
                        <UserFormItem errorText='매장을 검색 후 선택해주세요.'>
                            <UserFormInput subject='매장 검색' varName='company' search placeholder="매장명, 회사명을 검색해주세요."/>
                            {/*<label htmlFor="company" className={User.form_label}>매장 검색</label>*/}
                            {/*<div className={`${User.form_inp} ${User.form_search}`}>*/}
                            {/*    <input type="text" id="company" className={`inp ${User.inp}`} placeholder="매장명, 회사명을 검색해주세요."/>*/}
                            {/*        <buttom type="button" className={User.form_search_btn}>검색</buttom>*/}
                            {/*</div>*/}

                            <div className={User.form_company_request}>
                                <ul className={User.request_list}>
                                    <li className={User.li}>
                                        <span className={User.company_text}><span className={User.company_name}>울타리평촌역점</span>(HA01578)</span>
                                        <button type="button" className={`btn btn_medium btn_line ${User.company_btn}`}>승인요청</button>
                                    </li>
                                </ul>
                            </div>

                            {/*<p className={User.error_text}>매장을 검색 선택해주세요.</p>*/}
                        </UserFormItem>
                    </UserFormList>

                    <div className={User.form_btn_box}>
                        <Link to='/role' className='btn btn_grey'>
                            이전
                        </Link>
                    </div>

                    <p className={`${User.form_text} ta_c`}>매장이 등록되어있지 않다면 대표님에게 회사 등록을 요청해주세요.</p>
                </UserFormBox>
            </div>
        </main>
    )
}