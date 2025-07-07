import Popup from "../../../../css/popup.module.css";
import {cm, cmc} from "../../../utils/cm";
import User from "../../../../css/user.module.css";
import {DynamicSelectButton} from "../../../common/module/DynamicSelectButton";
import {DYNAMIC_TYPE} from "../../../common/modal/DynamicSelectModal";
import {PriceInput} from "../../../common/inputbox/PriceInput";

export function SaleDetailPriceBox({type = 0, inputField, provider}) {

    const checkIfNotZero = (i)=>{
        const price = inputField.get(i, `amount`);
        return price > 0 ? price : null;
    }

    return (
        <div className={Popup.half_box}>
            <div className={cm(Popup.customer_title, Popup[`n${type + 3}`])}>{type === 0 ? '지원' : '추가'}
                <button type="button"
                        className={`btn_blue ${cmc(Popup.btn, Popup.btn_medium)}`}
                        onClick={()=>{
                            if(inputField.length() < 6) {
                                inputField.addItem()
                            }
                        }}>항목추가
                </button>
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
                    <th className={Popup.th} scope="col"></th>
                </tr>
                </thead>
                <tbody className={Popup.tbody}>
                {
                    inputField.input && inputField.input.map((v, i) => {
                        // console.log(`[${type}]  %${i}`)
                        // console.table(v)
                        return <tr key={i}>
                            <td className={Popup.td}>
                                <div className={`${cmc(User.select_box, Popup.select_box)}`}>
                                    <DynamicSelectButton type={DYNAMIC_TYPE.sup_div + type} provider={provider}
                                                         value={v.name} onChange={v => {
                                        inputField.put(i, 'div', v.id)
                                        inputField.put(i, 'name', v.name)
                                    }} onClear={()=>{
                                        inputField.clearOf(i);
                                    }}/>
                                    {/*<button type="button" className={Popup.dynamic_btn}*/}
                                    {/*        onClick={(e) => {*/}
                                    {/*            const {top, left} = MouseEventUtils.getAbsolutePos(e);*/}
                                    {/*            modal.openModal(ModalType.MENU.Dynamic_Select, {*/}
                                    {/*                top: `${top}px`,*/}
                                    {/*                left: `${left}px`,*/}
                                    {/*                type: DYNAMIC_TYPE.sup_div+type,*/}
                                    {/*                provider: provider,*/}
                                    {/*                onSubmit: ({id, name})=>{*/}
                                    {/*                    console.log(`${id} ${name}`)*/}
                                    {/*                    inputField.put(i, 'div', id)*/}
                                    {/*                    inputField.put(i, 'name', name)*/}
                                    {/*                }*/}
                                    {/*            })*/}
                                    {/*        }}>{v.name}*/}
                                    {/*</button>*/}
                                    {/*<DynamicSelectLayer initValue={v.name}*/}
                                    {/*                    type={type} onClick={({id, name}) => {*/}
                                    {/*    // console.log(v)*/}
                                    {/*    inputField.put(i, `div`, id);*/}
                                    {/*}}/>*/}
                                </div>
                            </td>
                            <td className={Popup.td}>
                                <PriceInput className={`ta_r ${cmc(Popup.inp)}`}
                                            maxLength={8}
                                            placeholder='금액을 입력해주세요'
                                            value={checkIfNotZero(i)} onChange={(e) => {
                                    inputField.put(i, `amount`, e.target.value)
                                }}/>
                            </td>
                            <td className={Popup.td}>
                                <button type="button" className={cm(Popup.btn_del)} onClick={() => {
                                    inputField.removeItem(i)
                                }}>삭제
                                </button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}