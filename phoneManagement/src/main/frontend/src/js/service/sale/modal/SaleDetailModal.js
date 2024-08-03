import {LayerModal} from "../../../common/modal/LayerModal";
import {useEffect, useState} from "react";
import useValidateInputField from "../../../hook/useValidateInputField";
import useModal from "../../../hook/useModal";
import {ModalType} from "../../../common/modal/ModalType";
import useApi from "../../../hook/useApi";
import {ObjectUtils} from "../../../utils/objectUtil";
import User from "../../../../css/user.module.css"
import Popup from "../../../../css/popup.module.css"
import {cm, cmc, toCssModules} from "../../../utils/cm";
import {AddSaleItem} from "../module/AddSaleItem";
import {AddSaleTabItem} from "../module/AddSaleTabItem";
import {AddSaleCheckItem} from "../module/AddSaleCheckItem";
import {AddSaleInput} from "../module/AddSaleInput";
import {TabList} from "../../../common/module/TabList";
import {SelectIndexLayer} from "../../../common/module/SelectIndexLayer";
import {NumberUtils} from "../../../utils/NumberUtils";
import {AddSaleNumberInput} from "../module/AddSaleNumberInput";
import {LMD} from "../../../common/LMD";
import useUserInfo from "../../../hook/useUserInfo";
import {DateSelectModal} from "../../../common/modal/menu/DateSelectModal";
import {DateUtils} from "../../../utils/DateUtils";
import {useObjectInputField} from "../../../hook/useObjectInputField";
import {useBitArray} from "../../../hook/useBitArray";
import {SelectMapLayer} from "../../../common/module/SelectMapLayer";
import {useObjectArrayInputField} from "../../../hook/useObjectArrayInputField";
import {DYNAMIC_TYPE, DynamicSelectLayer} from "../../../common/module/DynamicSelectLayer";


const DYNAMIC_ITEMS = [
    'test 1', 'test 2', 'test 3'
]

function SaleDetailModal(props){
    const userInfo = useUserInfo()
    const modal = useModal();
    const inputField = useValidateInputField();

    const supportInputField = useObjectArrayInputField({
        sup_div: 0,
        sup_amount: 0
    })
    const addInputField = useObjectArrayInputField({
        add_div: 0,
        add_amount: 0
    })

    const promiseInputField = useObjectArrayInputField({
        checked: false,
        content: ''
    })

    const {saleApi, userApi} = useApi();

    // const [checkList, setCheckList] = useState(0);
    const checkBit = useBitArray();
    const checkListInputField = useObjectInputField();

    const [files, setFiles] = useState({
        estimate: null,
        docs: null
    })

    const [staff, setStaff] = useState([])

    const [previewDocs, setPreviewDocs] = useState(null)
    const [previewEstimate, setPreviewEstimate] = useState(null)


    useEffect(()=>{
        if(props.sale_id){
            // console.log(`sale_id ${props.sale_id}`)
            getSaleDetail(props.sale_id);
        }
        getInnerStaff()
    },[])

    const handleFileInput = (e)=>{
        const name = e.target.name;
        const file = e.target.files[0]
        setFiles(prev=>({
            ...prev,
            [name]: file
        }))
        if(file){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = ()=>{
                if(name === 'docs'){
                    setPreviewDocs(reader.result)
                }else if(name === 'estimate'){
                    setPreviewEstimate(reader.result)
                }
            }
        }
    }

    const getInnerStaff = async ()=>{
        await userApi.getInnerStaffAsIdNameMap().then(({status,data})=>{
            if(status === 200 && data){
                setStaff(data)
            }
        })
    }

    const getSaleDetail = async (saleId)=>{
        await saleApi.getSaleDetail(saleId).then(({status,data})=>{
            if(status === 200 && data){
                console.table(data)
                const {sale, pm_list, sup_list, add_list, card_list, ud_list} = data;
                let bit = 0;
                if(sale){
                    if(sale.wt_cms){
                        bit = bit | 1
                    }
                    if(sale.sec_device_id){
                        bit = bit | (1 << 1);
                    }
                    if(sale.exsvc_id){
                        bit = bit | (1 << 4);
                    }
                    if(sale.comb_tp || sale.comb_memo){
                        bit = bit | (1 << 5);
                    }
                    inputField.putAll(sale);
                }
                if(!ObjectUtils.isEmptyArray(pm_list)){
                    promiseInputField.putAll(pm_list);
                }
                if(!ObjectUtils.isEmptyArray(sup_list)){
                    supportInputField.putAll(sup_list);
                }
                if(!ObjectUtils.isEmptyArray(add_list)){
                    addInputField.putAll(add_list);
                }
                if(!ObjectUtils.isEmptyArray(card_list)){
                    bit = bit | (1 << 2)
                    checkListInputField.put('card_list', card_list);
                }
                if(!ObjectUtils.isEmptyArray(ud_list)){
                    bit = bit | (1 << 3)
                    checkListInputField.put('ud_list', ud_list);
                }
                checkBit.setAll(bit);
            }
        })
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Sale_Detail);
    }

    const sumSup = ()=>{
        let rst = 0;
        if(!supportInputField.input || supportInputField.length() === 0){
            return rst;
        }

        supportInputField.input.forEach(v=>{
            rst += NumberUtils.toNumber(v.sup_amount)
        })
        return rst;
    }

    const sumAdd = ()=>{
        let rst = 0;
        // console.table(addInputField)
        if(!addInputField || !addInputField.input || addInputField.length() === 0){
            return rst;
        }

        addInputField.input.forEach(v=>{
            rst += NumberUtils.toNumber(v.add_amount)
        })
        return rst;
    }

    const setDate = (year, month, day)=>{
        // console.log(`set day: ${date}`)
        inputField.put('actv_dt', DateUtils.formatYYMMdd(year,month,day))
    }

    const openWtSelectModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Wt_Plan, {
            data: {
              wt_actv_div: checkListInputField.input.wt_actv_div,
              wt_cms: checkListInputField.input.wt_cms,
              internet_plan: checkListInputField.input.internet_plan,
              tv_plan: checkListInputField.input.tv_plan,
            },
            onSubmit: ({wt_actv_div, wt_cms, internet_plan, tv_plan})=>{
                console.log(`wt: ${wt_actv_div} ${wt_cms} ${internet_plan} ${tv_plan}`)
                checkListInputField.put('wt_actv_div',wt_actv_div)
                checkListInputField.put('wt_cms',wt_cms)
                checkListInputField.put('internet_plan',internet_plan)
                checkListInputField.put('tv_plan',tv_plan)
                if(!ObjectUtils.isEmpty(wt_actv_div) || !ObjectUtils.isEmpty(wt_cms) ||
                    !ObjectUtils.isEmpty(internet_plan) || !ObjectUtils.isEmpty(tv_plan)){
                    checkBit.on(0)
                }else{
                    checkBit.off(0)
                }
            }
        })
    }

    const openSecondModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Second, {
            data: checkListInputField.input.sd_id,
            onSubmit: (id)=>{
                // console.log(`sec: ${id}`)
                checkListInputField.put('sd_id',id)
                if(id !== 0){
                    checkBit.on(1)
                }else{
                    checkBit.off(1)
                }
            }
        })
    }

    const openCardModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Card, {
            data: checkListInputField.get('card_list'),
            onSubmit: (list)=>{
                console.log(`card: `)
                console.table(list)
                checkListInputField.put('card_list',list)
                if(!ObjectUtils.isEmpty(list)){
                    checkBit.on(2)
                }else{
                    checkBit.off(2)
                }
            }
        })
    }

    const openUsedPhoneModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Used_Phone, {
            data: checkListInputField.get('ud_list'),
            onSubmit: (list)=>{
                console.table(list)
                checkListInputField.put('ud_list',list)
                if(!ObjectUtils.isEmpty(list)){
                    checkBit.on(3)
                }else{
                    checkBit.off(3)
                }
            }
        })
    }

    const openExsvcModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Exsvc, {
            onSubmit: (id)=>{
                console.log(`exsvc: ${id}`)
                checkListInputField.put('exsvc_id',id)
                if(id !== 0){
                    checkBit.on(4)
                }else{
                    checkBit.off(4)
                }
            }
        })
    }

    const openCombModal = ()=>{
        modal.openModal(ModalType.LAYER.Sale_Comb, {
            onSubmit: ({comb_tp, comb_memo})=>{
                console.log(`comb: ${comb_tp} ${comb_memo}`)
                checkListInputField.put('comb_tp',comb_tp)
                checkListInputField.put('comb_memo',comb_memo)
                if(!ObjectUtils.isEmpty(comb_tp) || !ObjectUtils.isEmpty(comb_memo)){
                    checkBit.on(5)
                }else{
                    checkBit.off(5)
                }
            }
        })
    }

    const openDeviceSearchModal = ()=>{
        modal.openModal(ModalType.LAYER.Device_Search, {
            title: '모델명 선택',
            onSubmit: ({device_nm, device_id})=>{
                inputField.put('device_id', device_id)
                inputField.put('device_nm', device_nm)
            }
        })
    }

    const openActvPlanSearchModal = ()=>{
        modal.openModal(ModalType.LAYER.Plan_Search, {
            title: '무선 개통 요금제 선택',
            onSubmit: ({ct_plan_id, ct_plan_nm})=>{
                inputField.put('ct_actv_plan', ct_plan_id)
                inputField.put('ct_actv_plan_nm', ct_plan_nm)
            }
        })
    }

    const openDecPlanSearchModal = ()=>{
        modal.openModal(ModalType.LAYER.Plan_Search, {
            title: '무선 하향 요금제 선택',
            onSubmit: ({ct_plan_id, ct_plan_nm})=>{
                inputField.put('ct_dec_plan', ct_plan_id)
                inputField.put('ct_dec_plan_nm', ct_plan_nm)
            }
        })
    }

    const openReserveMessageModal = ()=>{
        if(props.sale_id){
            submit()
            return;
        }
        modal.openModal(ModalType.LAYER.Reserve_Message, {
            actv_dt: inputField.get('actv_dt'),
            onSubmit: submit
        })
    }

    const submit = async (rsvMsgList)=>{
        // console.table(rsvMsgList)
        if(inputField.validateAll()){
            const formData = new FormData();

            const {estimate, docs} = files;
            if(!ObjectUtils.isEmpty(estimate)){
                const estimateFiles = Array.prototype.slice.call(estimate);
                estimateFiles.forEach((file)=>{
                    formData.append('estimate',file);
                })
            }

            if(!ObjectUtils.isEmpty(docs)){
                const docFiles = Array.prototype.slice.call(docs);
                docFiles.forEach(file=>{
                    formData.append('docs', file);
                })
            }




            const body = {
                sale_id: props.id,
                ...inputField.input,
                ...checkListInputField.input,
                sup_list: supportInputField.input,
                add_list: addInputField.input,
                total_cms: inputField.get('ct_cms') +
                    sumAdd() -
                    sumSup(),
                pm_list: promiseInputField.input,
                rsv_msg_list: rsvMsgList
            }

            console.table(body)

            formData.append('sale', new Blob([JSON.stringify(body)], {
                type: 'application/json'
            }))

            if(props.sale_id){
                // update
                await saleApi.updateSale(formData).then(({status,data})=>{
                    console.log(`${status} ${data}`)
                    if(status === 200 && data === true){
                        modal.openModal(ModalType.SNACKBAR.Info, {
                            msg: '판매일보가 수정되었습니다'
                        })
                        if(props.onSubmit) props.onSubmit();
                        close();
                    }
                })
            }else{
                // add
                await saleApi.addSale(formData).then(({status,data})=>{
                    console.log(`${status} ${data}`)
                    if(status === 200 && data === true){
                        modal.openModal(ModalType.SNACKBAR.Info, {
                            msg: '판매일보가 추가되었습니다'
                        })
                        if(props.onSubmit) props.onSubmit();
                        close();
                    }
                })
            }
            return true;
        }
        return false;
    }


    return (
        <LayerModal>
            <div className={Popup.popup} style={{maxWidth: '1060px'}}>
                <div className={Popup.popup_title}>판매일보 추가</div>

                <form className={cm(Popup.user_form, Popup.customer)}>
                    <div className={Popup.sale_hint}>
                        {
                            props.sale_id ? '기존 판매일보입니다' : '새로 등록하는 판매일보입니다'
                        }
                    </div>

                    <div className={Popup.popup_cont}>
                        <div className={Popup.customer_head}>
                            <div className={Popup.head_box} >
                                <DateSelectModal rootClassName={Popup.head_box} onSelect={setDate}>
                                    <input type="text" className={`date ${cmc(Popup.inp)}`}
                                           value={inputField.get('actv_dt')}
                                           placeholder='개통 날짜' readOnly/>
                                </DateSelectModal>
                                <div className={`${cm(Popup.select_box, User.select_box)} select_box`}>
                                    {/*<input type="hidden" id=""/>*/}
                                    {/*<SelectOptionLayer initValue='개통 타입' cssModules={toCssModules(Popup, User)}*/}
                                    {/*                   inputField={inputField} values={LMD.ct_actv_tp}*/}
                                    {/*                   name='ct_actv_tp'/>*/}
                                </div>
                            </div>

                            <div className={cmc(Popup.tab, Popup.type2)}>
                                <TabList name='provider' inputField={inputField} theme={Popup} values={
                                    LMD.provier
                                }/>
                            </div>

                            <div className={cm(Popup.head_box, Popup.fr)}>
                                <div className={`${cm(Popup.select_box, User.select_box)} select_box`}>
                                    <input type="hidden" id=""/>
                                    <SelectMapLayer cssModules={toCssModules(Popup, User)} inputField={inputField}
                                                      values={staff} onChange={(v)=>{
                                                          inputField.put('seller_id', v)
                                    }} name='seller_id'/>
                                </div>
                            </div>
                        </div>

                        <div className={Popup.customer_body}>
                            <div className="">
                                <div className={Popup.customer_box}>
                                    <ul className={Popup.customer_list}>
                                        <AddSaleItem>
                                            <AddSaleInput inputField={inputField} name='cust_nm' subject='이름'/>
                                        </AddSaleItem>
                                        <AddSaleTabItem inputField={inputField} name='cust_gd' subject='성별 / 법인'
                                                        depth={3} values={LMD.gender}/>
                                        <AddSaleItem>
                                            <AddSaleInput inputField={inputField} name='cust_tel' subject='휴대폰 번호'/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput inputField={inputField} name='cust_cd'
                                                          subject='생년월일 / 사업자번호'/>
                                        </AddSaleItem>
                                    </ul>

                                    <div className={Popup.customer_text}>법인인 경우 사업등록번호 뒷 5자리를 입력해주세요.</div>
                                </div>

                                <div className={Popup.customer_box}>
                                    <div className={cm(Popup.customer_title, Popup.n1)}>무선</div>

                                    <ul className={Popup.customer_list}>
                                        <AddSaleTabItem inputField={inputField} name='ct_actv_div' subject='개통 구분'
                                                        depth={2} values={LMD.ct_actv_div}/>
                                        <AddSaleItem>
                                            <AddSaleInput value={inputField.get('device_nm')} inputField={inputField} name='device_id' subject='모델명'
                                                          search readOnly onClick={openDeviceSearchModal}/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput value={inputField.get('ct_actv_plan_nm')} inputField={inputField} name='ct_actv_plan' subject='개통 요금제'
                                                          search readOnly onClick={openActvPlanSearchModal}/>
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleInput value={inputField.get('ct_dec_plan_nm')} inputField={inputField} name='ct_dec_plan' subject='하향 요금제'
                                                          search readOnly onClick={openDecPlanSearchModal}/>
                                        </AddSaleItem>
                                    </ul>

                                    <ul className={Popup.customer_list}>
                                        <AddSaleItem>
                                            <label htmlFor='wt_actv_tp' className={Popup.customer_label}>개통 유형</label>
                                            <div className={Popup.customer_inp_box}>
                                                <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                                    <input type="hidden" id=""/>
                                                    <SelectIndexLayer cssModules={toCssModules(Popup, User)}
                                                                      inputField={inputField} name='ct_actv_tp'
                                                                      values={LMD.ct_actv_tp}/>
                                                </div>
                                            </div>
                                            {/*<AddSaleSelectOptionLayer inputField={inputField} name='actv_div' subject='개통 유형' itemNames={ACTV_DIV_ITEMS}/>*/}
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <label htmlFor='device_stor' className={Popup.customer_label}>용량</label>
                                            <div className={Popup.customer_inp_box}>
                                                <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                                    <input type="hidden" id=""/>
                                                    <SelectIndexLayer cssModules={toCssModules(Popup, User)}
                                                                      inputField={inputField}
                                                                      name='device_stor'
                                                                      values={LMD.storage}/>
                                                </div>
                                            </div>
                                            {/*<AddSaleSelectOptionLayer inputField={inputField} name='stor' subject='용량'*/}
                                            {/*                          itemNames={STOR_ITEMS}/>*/}
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <label htmlFor='ct_istm' className={Popup.customer_label}>할부</label>
                                            <div className={Popup.customer_inp_box}>
                                                <div className={`select_box ${cm(Popup.select_box, User.select_box)}`}>
                                                    <input type="hidden" id=""/>
                                                    <SelectIndexLayer cssModules={toCssModules(Popup, User)}
                                                                      inputField={inputField}
                                                                      name='ct_istm' values={LMD.istm}/>
                                                </div>
                                            </div>
                                            {/*<AddSaleSelectOptionLayer inputField={inputField} name='istm' subject='할부'*/}
                                            {/*                          itemNames={ISTM_ITEMS}/>*/}
                                        </AddSaleItem>
                                        <AddSaleItem>
                                            <AddSaleNumberInput inputField={inputField} className='ta_r' name='ct_cms'
                                                                subject='판매 수수료(정책)'/>
                                        </AddSaleItem>
                                    </ul>
                                </div>

                                <div className={Popup.customer_box}>
                                    <div className={cm(Popup.customer_title, Popup.n2)}>체크리스트</div>

                                    <ul className={`${cm(Popup.popup_check_list, Popup.customer_list)} ${cmc(Popup.type2)}`}>
                                        <AddSaleCheckItem subject='유선' onClick={openWtSelectModal} checked={checkBit.get(0)}/>
                                        <AddSaleCheckItem subject='세컨 디바이스' onClick={openSecondModal} checked={checkBit.get(1)}/>
                                        <AddSaleCheckItem subject='카드' onClick={openCardModal} checked={checkBit.get(2)}/>
                                        <AddSaleCheckItem subject='중고폰' onClick={openUsedPhoneModal} checked={checkBit.get(3)}/>
                                        <AddSaleCheckItem subject='부가서비스' onClick={openExsvcModal} checked={checkBit.get(4)}/>
                                        <AddSaleCheckItem subject='결합' onClick={openCombModal} checked={checkBit.get(5)}/>
                                        <AddSaleCheckItem subject='가족 등록' onClick={()=>{checkBit.toggle(6)}} checked={checkBit.get(6)}/>
                                        <AddSaleCheckItem subject='지인' onClick={()=>{checkBit.toggle(7)}} checked={checkBit.get(7)}/>
                                    </ul>
                                </div>

                                <div className={cm(Popup.customer_box, Popup.price)}>
                                    <PriceHalfBox type={0} inputField={supportInputField}/>
                                    <PriceHalfBox type={1} inputField={addInputField}/>

                                    <div className={Popup.price_total}>
                                        <ul className='price_list'>
                                            <li className={Popup.price_item}>
                                                <div
                                                    className={Popup.price_num}>{NumberUtils.toPrice(inputField.get('ct_cms'))}원
                                                </div>
                                                <div className={Popup.price_text}>유/무선 판매 수수료</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.plus)}>
                                                <div className={Popup.price_num}>0원</div>
                                                <div className={Popup.price_text}>중고폰 판매금액</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.plus)}>
                                                <div
                                                    className={Popup.price_num}>{NumberUtils.toPrice(sumAdd())}원
                                                </div>
                                                <div className={Popup.price_text}>추가</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.minus)}>
                                                <div
                                                    className={Popup.price_num}>{NumberUtils.toPrice(sumSup())}원
                                                </div>
                                                <div className={Popup.price_text}>지원</div>
                                            </li>
                                            <li className={cm(Popup.price_item, Popup.sum)}>
                                                <div className={Popup.price_num}>{
                                                    NumberUtils.toPrice(
                                                        inputField.get('ct_cms') +
                                                        sumAdd() -
                                                        sumSup()
                                                    )
                                                }원
                                                </div>
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
                                                            <label htmlFor='docs'
                                                                   className={Popup.upload_btn}>업로드</label>
                                                            <input type="file" id='docs' name='docs'
                                                                   onChange={handleFileInput} style={{
                                                                visibility: "hidden"
                                                            }}/>

                                                        </div>
                                                        <img src={previewDocs} alt=''/>
                                                    </div>
                                                </div>

                                                <div className={cm(Popup.data_box, Popup.n2)}>
                                                    <div className={Popup.data_title}>견적서</div>
                                                    <div className={Popup.data_area}>
                                                        <div className={Popup.data_upload}>
                                                            <label htmlFor='estimate' className={Popup.upload_btn}>업로드
                                                            </label>
                                                            <input type="file" id='estimate' name='estimate'
                                                                   onChange={handleFileInput} style={{
                                                                visibility: "hidden"
                                                            }}/>

                                                        </div>
                                                        <img src={previewEstimate} alt=''/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={cm(Popup.data_box, Popup.n3)}>
                                            <div className={Popup.data_title}>비고</div>
                                                <div className={Popup.data_area}>
                                                    <textarea className={Popup.data_textarea} name='memo'
                                                              value={inputField.get('memo')}
                                                              onChange={inputField.handleInput}></textarea>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={Popup.data_half}>
                                            <div className={cm(Popup.data_box, Popup.n4)}>
                                                <div className={Popup.data_title}>고객 약속</div>
                                                <div className={Popup.data_area}>
                                                    <ul className={Popup.popup_check_list}>
                                                        {
                                                            promiseInputField.length() > 0 && promiseInputField.input.map((v, i) => {
                                                                return <li key={i} className={Popup.li}>
                                                                    <input type="checkbox" name={`apm${i}`}
                                                                           className={Popup.check_inp}
                                                                           checked={promiseInputField.get(i, 'checked')} readOnly/>
                                                                    <label htmlFor={`apm${i}`} className={Popup.check_label}
                                                                           onClick={() => {
                                                                               promiseInputField.put(i, 'checked', !promiseInputField.get(i, 'checked'))
                                                                           }}>
                                                                    </label>
                                                                    <input type="text" className={Popup.check_text}
                                                                           value={promiseInputField.get(i,'content')}
                                                                           onChange={e=>{
                                                                               promiseInputField.put(i, 'content', e.target.value)
                                                                           }}
                                                                           placeholder='내용을 입력해주세요'/>
                                                                    {/*<input type="text" className={Popup.inp} value={apmInputField.contents[i]} onChange={e=>{*/}
                                                                    {/*    apmInputField.putContent(i, e.target.value)*/}
                                                                    {/*}}/>*/}
                                                                    <button type="button" className={Popup.check_del}
                                                                            onClick={() => {
                                                                                promiseInputField.removeItem(i)
                                                                            }}>삭제
                                                                    </button>
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                    <button type="button"
                                                            className={`${cmc(Popup.btn, Popup.btn_add_icon)}`}
                                                            onClick={promiseInputField.addItem}>추가하기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={Popup.popup_btn_box}>
                                <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={openReserveMessageModal}>저장
                                </button>
                            </div>
                        </div>
                    </div>

                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}

function PriceHalfBox({type=0, inputField}){
    const subject = (type === 0) ? 'sup' : 'add';


    return (
        <div className={Popup.half_box}>
            <div className={cm(Popup.customer_title, Popup[`n${type+3}`])}>{type === 0 ? '지원':'추가'}
                <button type="button"
                        className={`btn_blue ${cmc(Popup.btn, Popup.btn_medium)}`}
                        onClick={inputField.addItem}>항목추가</button>
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
                {
                    inputField.length() > 0 && inputField.input.map((v, i) => {
                        return <tr key={i}>
                            <td className={Popup.td}>
                                <DivSelectItem type={type} value={inputField.get(i, `${subject}_div`)} onClick={(v)=>{
                                    inputField.put(i, `${subject}_div`, v);
                                }}/>
                                {/*<div className={`${cmc(User.select_box, Popup.select_box)}`}>*/}
                                {/*    <input type="hidden" id=""/>*/}
                                {/*    <SelectIndexLayer value={DYNAMIC_ITEMS[inputField.get(i,`${subject}_div`) ?? 0]} onChange={(v) => {*/}
                                {/*        inputField.put(i, `${subject}_div` , v)*/}
                                {/*    }} cssModules={toCssModules(Popup, User)} values={DYNAMIC_ITEMS}/>*/}
                                {/*</div>*/}
                            </td>
                            <td className={Popup.td}>
                                <input type="text" className={`ta_r ${cmc(Popup.inp)}`}
                                       value={inputField.get(i, `${subject}_amount`)} onChange={(e) => {
                                    inputField.put(i,`${subject}_amount` , e.target.value)
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

function DivSelectItem({onClick, value, type=0}){
    return (
        <div className={`${cmc(User.select_box, Popup.select_box)}`}>
            <DynamicSelectLayer value={value} type={DYNAMIC_TYPE.sup_div+type} onClick={onClick}/>
        </div>
    )
}


export default SaleDetailModal;