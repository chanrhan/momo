import User from "../../../css/user.module.css"
import {UserFormList} from "../../account/module/UserFormList";
import {UserFormItem} from "../../account/module/UserFormItem";
import {cm, cmc} from "../../utils/cm";
import {SelectModal} from "../../common/modal/menu/SelectModal";
import {RegexUtils} from "../../utils/regex";
import {ObjectUtils} from "../../utils/objectUtil";

export function UserCompanyItem_backup2({index, onSelect, onDelete, close, inputField}){
    // const [error, setError] = useState(false);

    const handleInput = e=>{
        const key = e.target.name;
        const value = e.target.value;

        if(key === 'shop_tel'){
            if(!ObjectUtils.isEmpty(value) && !RegexUtils.tel(value)){
                inputField.setError(index, key, '전화번호 규격에 알맞게 입력해주세요.')
            }else{
                inputField.setError(index, key, null)
            }
        }else if(ObjectUtils.isEmpty(value)){
            // inputField.setError(index, key, null);
        }

        inputField.setInput(index, key, value);
    }

    if(typeof inputField !== 'object'){
        return null;
    }

    return (
        <li className={`${User.company_item} ${close && User.close} ${inputField.isError(index) && 'border_error'}`}>
            <UserFormList>
                <UserFormItem errorText={!close && inputField.getError(index, 'shop_nm')}>
                    <div className={cm(User.form_item_box,User.w70)}>
                        {/*<UserFormInput inputField={inputField} subject='매장명' name='shop_nm' placeholder='매장명을 입력해주세요.' readOnly={close}/>*/}
                        <label htmlFor='shop_nm' className={User.form_label}>매장명</label>
                        <div className={`${User.form_inp} ${User.div}`}>
                            <input type='text' name='shop_nm' value={inputField.getInput(index, 'shop_nm')} className={`inp ${User.inp}`} placeholder='매장명을 입력해주세요.' readOnly={close}
                                   onChange={handleInput}/>
                        </div>
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
                <UserFormItem errorText={inputField.getError(index, 'shop_addr')}>
                    <label htmlFor='shop_addr' className={User.form_label}>매장 주소</label>
                    <div className={`${User.form_inp} ${User.div}`}>
                        <input type='text' name='shop_addr' value={inputField.getInput(index, 'shop_addr')}
                               className={`inp ${User.inp}`} placeholder='매장 주소를 입력해주세요.'
                               onChange={handleInput}/>
                    </div>
                    <div className={`${User.form_inp} ${User.div}`}>
                        <input type='text' name='shop_addr_detail' value={inputField.getInput(index, 'shop_addr_detail')}
                               className={`inp ${User.inp}`} placeholder='매장 상제 주소를 입력해주세요.'
                               onChange={handleInput}/>
                    </div>
                    {/*<UserFormInput inputField={inputField} subject='매장 주소' name='shop_addr' placeholder='주소를 검색해주세요.'*/}
                    {/*               search/>*/}
                    {/*<UserFormInput inputField={inputField} name='shop_addr_detail' placeholder='상세 주소를 입력해주세요.'/>*/}
                </UserFormItem>
                <UserFormItem errorText={inputField.getError(index, 'shop_tel')}>
                    <label htmlFor='shop_tel' className={User.form_label}>매장 전화번호</label>
                    <div className={`${User.form_inp} ${User.div}`}>
                        <input type='text' name='shop_tel' value={inputField.getInput(index, 'shop_tel')}
                               className={`inp ${User.inp}`} placeholder='매장 전화번호를 입력해주세요.'
                               onChange={handleInput}/>
                    </div>
                    {/*<UserFormInput inputField={inputField} subject='매장 전화번호' name='shop_tel'*/}
                    {/*               placeholder='- 없이 숫자만 입력해주세요.'/>*/}
                </UserFormItem>
            </UserFormList>
            <div className={User.company_btn_box}>
                <button index={index} type="button" className={cm(User.button, User.company_del_btn)} onClick={onDelete}>삭제</button>
                <button index={index} type="button" className={cm(User.button, User.company_open_btn)}
                        onClick={onSelect}>닫기
                </button>
            </div>
        </li>
    )
}