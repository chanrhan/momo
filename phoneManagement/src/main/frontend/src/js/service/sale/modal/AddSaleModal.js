import {LayerModal} from "../../../common/modal/LayerModal";
import {useEffect, useState} from "react";
import profileImg1 from "../../../../images/profile_img1.jpg"
import useInputField from "../../../hook/useInputField";
import {SALE_INITIAL_STATE} from "../SALE_INITIAL_STATE";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import useApi from "../../../hook/useApi";
import {ObjectUtils} from "../../../utils/objectUtil";
import User from "../../../../css/user.module.css"
import Popup from "../../../../css/popup.module.css"
import {cm, cmc} from "../../../utils/cm";
import {AddSaleItem} from "../module/AddSaleItem";
import {AddSaleTabItem} from "../module/AddSaleTabItem";
import {AddSaleSelectOptionLayer} from "../module/AddSaleSelectOptionLayer";
import {AddSaleCheckItem} from "../module/AddSaleCheckItem";
import {AddSaleInput} from "../module/AddSaleInput";

function AddSaleModal(props){
    const modal = useModal();
    const inputField = useInputField(SALE_INITIAL_STATE);
    const {saleApi} = useApi();

    const [file, setFile] = useState({
        spec: null,
        docs: null
    });

    useEffect(()=>{
        // console.table(valid.input)
    },[inputField.input])

    const handleFileInput = e=>{
        setFile(prev=>({
            ...prev,
            [e.target.name]: e.target.files
        }))
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Add_Sale);
    }

    const setDate = (year, month, day)=>{
        // console.log(`set day: ${date}`)
        inputField.put('actv_dt', `${year}-${month}-${day}`)
    }

    const selectDate = (e)=>{
        const rect = e.target.getBoundingClientRect();
        modal.openModal(ModalType.MENU.Select_Date, {
            top: `${rect.top-10}px`,
            left: `${rect.left-800}px`,
            onSelect: setDate
        })
    }

    const submit = async ()=>{
        if(inputField.validateAll()){
            const formData = new FormData();

            if(!ObjectUtils.isEmpty(file.spec)){
                const specFiles = Array.prototype.slice.call(file.spec);
                specFiles.forEach((file)=>{
                    formData.append('spec',file);
                })
            }

            if(!ObjectUtils.isEmpty(file.docs)){
                const saleDocs = Array.prototype.slice.call(file.docs);
                saleDocs.forEach(file=>{
                    formData.append('docs', file);
                })
            }

            formData.append('sale', new Blob([JSON.stringify(inputField.input)], {
                type: 'application/json'
            }))

            await saleApi.addSale(formData).then(({status,data})=>{
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '판매일보가 추가되었습니다'
                })
            })
        }
    }

    return (
        <LayerModal>
            <div className={Popup.popup} style={{maxWidth: '1060px'}}>
                <div className={Popup.popup_title}>고객 추가</div>

                <form className={cm(Popup.user_form, Popup.customer)}>
                    <div className={Popup.popup_cont}>
                        <div className={Popup.customer_head}>
                            <div className={Popup.head_box}>
                                <input type="text" className={`date ${cmc(Popup.inp)}`} value={inputField.input.actv_dt} placeholder="개통 날짜" readOnly onClick={selectDate}/>

                                <AddSaleSelectOptionLayer name='actv_div' inputField={inputField} itemNames={['개통 유형','2','3']}/>
                            </div>

                            <div className={cmc(Popup.tab, Popup.type2)}>
                                <ul className={cmc(Popup.tab_list)}>
                                    <li className={`${cmc(Popup.tab_item, Popup.active)}`}>
                                        <button type="button" className={cmc(Popup.tab_btn)}>SKT</button>
                                    </li>
                                    <li className={`${cmc(Popup.tab_item)}`}>
                                        <button type="button" className={cmc(Popup.tab_btn)}>KT</button>
                                    </li>
                                    <li className={`${cmc(Popup.tab_item)}`}>
                                        <button type="button" className={cmc(Popup.tab_btn)}>LG</button>
                                    </li>
                                </ul>
                            </div>

                            <div className={cm(Popup.head_box, Popup.fr)}>
                                <AddSaleSelectOptionLayer inputField={inputField} itemNames={['담당자','2','3']}/>
                            </div>
                        </div>

                        <div className={Popup.customer_body}>
                            <div className="">
                                <div className={Popup.customer_box}>
                                    <ul className={Popup.customer_list}>
                                        <AddSaleItem>
                                            <AddSaleInput name='name' subject='이름'/>
                                        </AddSaleItem>
                                        <AddSaleTabItem name='cust_gd' subject='성별 / 법인' depth={3} values={['남자','여자','법인']}/>
                                        <AddSaleItem>
                                            <AddSaleInput name='cust_tel' subject='휴대폰 번호'/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput name='cust_cd' subject='생년월일 / 사업자번호'/>
                                        </AddSaleItem>
                                    </ul>

                                    <div className={Popup.customer_text}>법인 경우 사업등록번호 뒷 5자리를 입력해주세요.</div>
                                </div>

                                <div className={Popup.customer_box}>
                                    <div className={cm(Popup.customer_title, Popup.n1)}>무선</div>

                                    <ul className={Popup.customer_list}>
                                        <AddSaleTabItem name='actv_div' subject='개통 구분' depth={2} values={['선택약정','공시지원금']}/>
                                        <AddSaleItem>
                                            <AddSaleInput name='device_md' subject='모델명' search/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput name='wt_actv_plan' subject='개통 요금제' search/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput name='wt_dec_plan' subject='하향 요금제' search/>
                                        </AddSaleItem>
                                    </ul>

                                    <ul className={Popup.customer_list}>
                                        <AddSaleItem>
                                            <AddSaleSelectOptionLayer inputField={inputField} name='actv_div' subject='개통 유형' itemNames={ACTV_DIV_ITEMS}/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleSelectOptionLayer inputField={inputField} name='stor' subject='용량' itemNames={STOR_ITEMS}/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleSelectOptionLayer inputField={inputField} name='istm' subject='할부' itemNames={ISTM_ITEMS}/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput className='ta_r' name='wt_cmd' subject='판매 수수료(정책)' readOnly/>
                                        </AddSaleItem>
                                    </ul>
                                </div>

                                <div className={Popup.customer_box}>
                                    <div className={cm(Popup.customer_title, Popup.n2)}>체크리스트</div>

                                    <ul className={`${cm(Popup.popup_check_list, Popup.customer_list)} ${cmc(Popup.type2)}`}>
                                        <AddSaleCheckItem name='wt' subject='유선'/>
                                        <AddSaleCheckItem name='sec_md' subject='세컨 디바이스'/>
                                        <AddSaleCheckItem name='card' subject='카드'/>
                                        <AddSaleCheckItem name='used' subject='중고폰'/>
                                        <AddSaleCheckItem name='exsvc' subject='부가서비스'/>
                                        <AddSaleCheckItem name='comb' subject='결합'/>
                                        <AddSaleCheckItem name='family' subject='가족 등록'/>
                                        <AddSaleCheckItem name='friend' subject='지인'/>
                                    </ul>
                                </div>

                                <div className={cm(Popup.customer_box, Popup.price)}>
                                    <div className={Popup.half_box}>
                                        <div className={cm(Popup.customer_title, Popup.n3)}>지원
                                            <button type="button"
                                                    className={`btn_blue ${cmc(Popup.btn, Popup.btn_medium)}`}>항목추가</button>
                                        </div>

                                        <table className={Popup.tb_price}>
                                            <caption>지원 테이블 - 구분, 금액 정보 제공</caption>
                                            <colgroup>
                                                <col style={{width: '35%'}}/>
                                                <col/>
                                                <col style={{width: '12%'}}/>
                                            </colgroup>
                                            <thead className={Popup.thead}>
                                            <tr>
                                                <th className={Popup.th} scope="col">구분</th>
                                                <th className={Popup.th} scope="col">금액</th>
                                                <th className={Popup.th} scope="col">금액</th>
                                            </tr>
                                            </thead>
                                            <tbody className={Popup.tbody}>
                                            <tr>
                                                <td className={Popup.td}>
                                                    <AddSaleSelectOptionLayer inputField={inputField}
                                                                              itemNames={DYNAMIC_ITEMS}/>
                                                </td>
                                                <td className={Popup.td}>
                                                    <input type="text" className={`ta_r ${cmc(Popup.inp)}`}
                                                           value="100,000 원"/>
                                                </td>
                                                <td className={Popup.td}>
                                                    <button type="button" className={cm(Popup.btn_del)}>삭제</button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className={Popup.half_box}>
                                        <div className={cm(Popup.customer_title, Popup.n4)}>추가
                                            <button type="button"
                                                    className={`btn_blue ${cmc(Popup.btn, Popup.btn_medium)}`}>항목추가</button>
                                        </div>

                                        <table className={Popup.tb_price}>
                                            <caption>추가 테이블 - 구분, 금액 정보 제공</caption>
                                            <colgroup>
                                                <col style={{width: '35%'}}/>
                                                <col/>
                                                <col style={{width: '12%'}}/>
                                            </colgroup>
                                            <thead className={Popup.thead}>
                                            <tr>
                                                <th className={Popup.th} scope="col">구분</th>
                                                <th className={Popup.th} scope="col">금액</th>
                                                <th className={Popup.th} scope="col">금액</th>
                                            </tr>
                                            </thead>
                                            <tbody className={Popup.tbody}>
                                            <tr>
                                                <td className={Popup.td}>
                                                    <AddSaleSelectOptionLayer inputField={inputField}
                                                                              itemNames={DYNAMIC_ITEMS}/>
                                                </td>
                                                <td className={Popup.td}>
                                                    <input type="text" className={`ta_r ${cmc(Popup.inp)}`}
                                                           value="100,000 원"/>
                                                </td>
                                                <td className={Popup.td}>
                                                    <button type="button" className={cm(Popup.btn_del)}>삭제</button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className={Popup.price_total}>
                                        <ul className='price_list'>
                                            <li className={Popup.price_item}>
                                                <div className={Popup.price_num}>100,000원</div>
                                                <div className={Popup.price_text}>유/무선 판매 수수료</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.plus)}>
                                                <div className={Popup.price_num}>100,000원</div>
                                                <div className={Popup.price_text}>중고폰 판매금액</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.plus)}>
                                                <div className={Popup.price_num}>100,000원</div>
                                                <div className={Popup.price_text}>추가</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.minus)}>
                                                <div className={Popup.price_num}>100,000원</div>
                                                <div className={Popup.price_text}>지원</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.sum)}>
                                                <div className={Popup.price_num}>100,000원</div>
                                                <div className={Popup.price_text}>총이익</div>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={Popup.price_data}>
                                        <div className={Popup.data_half}>
                                            <div className={Popup.data_group}>
                                                <div className={cm(Popup.data_box, Popup.n1)}>
                                                        <div className={Popup.data_title}>서류</div>
                                                        <div className={Popup.data_area}>
                                                            <div className={Popup.data_upload}>
                                                                <button type="button" className={Popup.upload_btn}>업로드</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={cm(Popup.data_box, Popup.n2)}>
                                                        <div className={Popup.data_title}>견적서</div>
                                                        <div className={Popup.data_area}>
                                                            <div className={Popup.data_upload}>
                                                                <button type="button" className={Popup.upload_btn}>업로드</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={cm(Popup.data_box, Popup.n3)}>
                                                    <div className={Popup.data_title}>비고</div>
                                                    <div className={Popup.data_area}>
                                                        <textarea className={Popup.data_textarea}></textarea>
                                                    </div>
                                                </div>
                                        </div>

                                        <div className={Popup.data_half}>
                                            <div className={cm(Popup.data_box, Popup.n4)}>
                                                <div className={Popup.data_title}>고객 약속</div>
                                                <div className={Popup.data_area}>
                                                    <ul className={Popup.popup_check_list}>
                                                        <li className={Popup.li}>
                                                            <input type="checkbox" id="check2" className={Popup.check_inp}
                                                                   checked={false}/>
                                                            <label htmlFor="check2" className={Popup.check_label}>아드님 핸드폰 변경
                                                                가능 추가
                                                                설명드리기</label>
                                                            <button type="button" className={Popup.check_del}>삭제</button>
                                                        </li>
                                                    </ul>
                                                    <button type="button" className={`${cmc(Popup.btn, Popup.btn_add_icon)}`}>추가하기</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={Popup.popup_btn_box}>
                                <button type="submit" className={`btn_blue ${cmc(Popup.btn)}`}>저장</button>
                            </div>
                        </div>
                    </div>

                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}

const ACTV_DIV_ITEMS = [
    '신규', '번호이동', '기기변경'
]

const STOR_ITEMS = [
    '32G', '64G', '128G', '256G', '512G', '1T'
]

const ISTM_ITEMS = [
    '일시납', '12개월', '24개월', '30개월', '36개월', '48개월'
]

const DYNAMIC_ITEMS = [
    'test 1', 'test 2', 'test 3'
]

export default AddSaleModal;