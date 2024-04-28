import {LayerModal} from "../modal/LayerModal";
import {useEffect, useState} from "react";
import InputBox from "../common/inputbox/InputBox";
import ChoiceButtonBox from "../common/inputbox/ChoiceButtonBox";
import useValidation from "../../hook/useValidation";
import {SALE_INITIAL_STATE} from "./SALE_INITIAL_STATE";
import useModal from "../../hook/useModal";
import {ModalType} from "../modal/ModalType";
import useApi from "../../hook/useApi";
import {ObjectUtils} from "../../utils/objectUtil";

function AddSaleModal(props){
    const modal = useModal();
    const valid = useValidation(SALE_INITIAL_STATE);
    const {saleApi} = useApi();

    const [file, setFile] = useState({
        spec: null,
        docs: null
    });

    useEffect(()=>{
        // console.table(valid.input)
    },[valid.input])

    const handleFileInput = e=>{
        setFile(prev=>({
            ...prev,
            [e.target.name]: e.target.files
        }))
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Add_Sale);
    }

    const submit = async ()=>{
        if(valid.validateAll()){
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

            formData.append('sale', new Blob([JSON.stringify(valid.input)], {
                type: 'application/json'
            }))

            await saleApi.addSale(formData).then(({status,data})=>{
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: '판매일보가 추가되었습니다'
                })
            })
        }
    }

    const openAdditiveModal = (e)=>{
        let modalType = null;
        switch (e.target.getAttribute('name')){
            case 'second':
                modalType = ModalType.LAYER.Select_Second;
                break;
            case 'card':
                modalType = ModalType.LAYER.Select_Card;
                break;
            case 'comb':
                modalType = ModalType.LAYER.Select_Comb;
                break;
            case 'exsvc':
                modalType = ModalType.LAYER.Select_Exsvc;
                break;
            case 'green':
                modalType = ModalType.LAYER.Select_GreenPhone;
                break;
            case 'friend':
                modalType = ModalType.LAYER.Select_Second;
                break;
        }

        modal.openModal(modalType,{
            valid: valid,
            width: "30%",
            height: "40%"
        });
    }

    return (
        <LayerModal>
            <div className='d-flex flex-column align-items-center scrollbar mt-3'>
                <h4>통신사</h4>
                <div className='mt-2'>
                    <ChoiceButtonBox name='provider' items={['SKT', 'KT', 'LG']} btn_class='success' valid={valid}/>
                </div>
                <div className='d-flex flex-row align-items-center mt-3'>
                    <div className='d-flex flex-row align-items-baseline'>
                        <input type="radio" name='actv_tp' onChange={valid.handleInput}/>
                        <p>일반 개통</p>
                    </div>
                    <div className='d-flex flex-row align-items-baseline ms-3'>
                        <input type="radio" name='actv_tp' onChange={valid.handleInput}/>
                        <p>중고 개통</p>
                    </div>
                    <div className='ms-5'>
                        <h5>개통 날짜</h5>
                        <div>
                            <input type="date" name='actv_dt' onChange={valid.handleInput}/>
                            <button className='btn btn-outline-secondary'>오늘</button>
                        </div>
                    </div>
                    <div className='ms-5'>
                        <InputBox subject='담당 매니저' name='stf_id' value={props.user.name} valid={valid}/>
                    </div>
                </div>
                <div className='mt-2'>
                    <h3>고객 정보</h3>
                    <hr/>
                    <div className='d-flex flex-row'>
                        <InputBox subject='이름' name='cust_nm' valid={valid}/>
                        <InputBox subject='번호' name='cust_tel' valid={valid}/>
                    </div>
                    <div className='d-flex flex-row'>
                        <InputBox subject='생년월일' name='cust_cd' valid={valid}/>
                        <InputBox subject='보호자 번호' name='cust_gtel' valid={valid}/>
                    </div>
                </div>
                <div className='mt-2'>
                    <h3>무선</h3>
                    <hr/>
                    <div className='d-flex flex-row'>
                        <InputBox subject='모델명' name='ph_md' valid={valid}/>
                        <InputBox subject='개통 요금제' name='actv_plan' valid={valid}/>
                    </div>
                    <div className='d-flex flex-row mt-2'>
                        <div className='d-flex flex-column'>
                            <p>개통 유형</p>
                            <ChoiceButtonBox items={['신규', 'MNP', '기기변경']} btn_class='secondary' name='ct_actv_tp'
                                             valid={valid}/>
                        </div>
                        <div className='d-flex flex-column ms-5'>
                            <p>개통 구분</p>
                            <ChoiceButtonBox items={['선택약정', '공시지원금']} btn_class='secondary' name='ct_actv_div'
                                             valid={valid}/>
                        </div>
                    </div>
                    <div className='d-flex flex-column mt-2'>
                        <p>할부</p>
                        <ChoiceButtonBox items={['일시납', '12개월', '18개월', '24개월', '30개월', '36개월', '48개월']}
                                         btn_class='secondary' name='ct_istm'
                                         valid={valid}/>
                    </div>
                    <div className='d-flex flex-row mt-3'>
                        <InputBox subject='세컨 모델명' name='sec_md' valid={valid}/>
                        <InputBox subject='무선 정책' name='wt_cms' valid={valid}/>
                    </div>
                </div>
                <div className='mt-2'>
                    <h3>유선</h3>
                    <hr/>
                    <div>
                        <h5>인터넷</h5>
                        <div className='d-flex flex-row'>
                            <InputBox subject='개통 요금제' name='inet_actv_plan' valid={valid}/>
                            <InputBox subject='하향 요금제' name='inet_dec_plan' valid={valid}/>
                        </div>
                    </div>
                    <div>
                        <h5>TV</h5>
                        <div className='d-flex flex-row'>
                            <InputBox subject='개통 요금제' name='tv_actv_plan' valid={valid}/>
                            <InputBox subject='하향 요금제' name='tv_dec_plan' valid={valid}/>
                        </div>
                    </div>
                    <div className='d-flex flex-row mt-2 align-items-baseline justify-content-center'>
                        <div className='d-flex flex-column'>
                            <p>개통 유형</p>
                            <ChoiceButtonBox items={['신규', '재약정']} btn_class='secondary' name='wt_actv_tp'
                                             valid={valid}/>
                        </div>
                        <InputBox subject='유선 정책' name='wt_cms' valid={valid}/>
                    </div>
                </div>
                <hr/>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <div className='d-flex flex-row align-items-baseline'>
                        <p>파일</p>
                        <input className='ms-2' type="file" name='docs' onChange={handleFileInput}/>
                    </div>
                    <div className='d-flex flex-row align-items-baseline'>
                        <p>견적서</p>
                        <input className='ms-2' type="file" name='spec' onChange={handleFileInput}/>
                    </div>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <div className='d-flex flex-column align-items-center'>
                        <h3 className='p-3' name='second' onClick={openAdditiveModal}>세컨 디바이스</h3>
                        <h5>{valid.input.sec_md}</h5>
                    </div>
                    <h3 className='p-3' name='card' onClick={openAdditiveModal}>카드</h3>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <h3 className='p-3' name='green' onClick={openAdditiveModal}>중고폰</h3>
                    <h3 className='p-3' name='exsvc' onClick={openAdditiveModal}>부가서비스</h3>
                </div>
                <div className='d-flex flex-row align-items-center'>
                    <h3 className='p-3' name='comb' onClick={openAdditiveModal}>결합</h3>
                    <h3 className='p-3' name='friend' onClick={openAdditiveModal}>지인</h3>
                </div>
                <div className='d-flex flex-row justify-content-center mt-3 mb-5'>
                    <button className='btn btn-outline-primary' onClick={close}>취소</button>
                    <button className='btn btn-primary ms-3' onClick={submit}>추가</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default AddSaleModal;