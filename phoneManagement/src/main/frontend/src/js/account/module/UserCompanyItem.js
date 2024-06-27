import User from "../../../css/user.module.css"
import {UserFormList} from "./UserFormList";
import {UserFormItem} from "./UserFormItem";
import {UserFormInput} from "./UserFormInput";

export function UserCompanyItem({close}){
    return (
        <li className={`${User.company_item} ${close && User.close}`}>
            <UserFormList>
                <UserFormItem>
                    <div className={`${User.form_item_box} ${User.w70}`}>
                        <UserFormInput subject='매장명' varName='companyName' placeholder='매장명을 입력해주세요.'/>
                    </div>
                    <div className={`${User.form_item_box} ${User.w30}`}>
                        <label htmlFor="companyType" className={User.form_label}>매장 구분</label>
                        <div className={User.form_inp}>
                            <div className={`select_box ${User.select_box}`}>
                                <input type="hidden" id="companyType"/>
                                <button type="button" className={`${User.select_btn} select_btn`}></button>
                                <ul className='select_layer'>
                                    {/*활성화시 active 추가 */}
                                    <li className='select_item'>
                                        <button type="button">KT</button>
                                    </li>
                                    <li className="select_item">
                                        <button type="button">SKT</button>
                                    </li>
                                    <li className="select_item">
                                        <button type="button">LG</button>
                                    </li>
                                    <li className="select_item">
                                        <button type="button">판매점</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput subject='매장 주소' varName='companyAddress' placeholder='주소를 검색해주세요.' search/>
                    <UserFormInput varName='companyAddressDetail' placeholder='상세 주소를 입력해주세요.'/>
                </UserFormItem>
                <UserFormItem>
                    <UserFormInput subject='매장 전화번호' varName='companyNum' placeholder='- 없이 숫자만 입력해주세요.'/>
                </UserFormItem>
            </UserFormList>
            <div className={User.company_btn_box}>
                <button type="button" className={`${User.button} ${User.company_del_btn}`}>삭제</button>
                <button type="button" className={`${User.button} ${User.company_open_btn} opened`}>닫기</button>
            </div>
        </li>
    )
}