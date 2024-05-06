import {LayerModal} from "../components/modal/LayerModal";
import useModal from "../hook/useModal";
import {ModalType} from "../components/modal/ModalType";
import DEFAULT_HEADERS from "./DEFAULT_HEADERS";
import {useEffect, useState} from "react";
import {useMapper} from "../utils/useMapper";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {ObjectUtils} from "../utils/objectUtil";

const GENDER = [
    '남',
    '여',
    '법인'
]

function TableValidationModal({headerIndex, headerType, data, fails= [], onCancel = null, onConfirm = null}){
    const mapper = useMapper(headerType);
    const types = mapper.types(headerType);

    const modal = useModal();
    const [defaultValue, setDefaultValue] = useState(0);
    const [result, setResult] = useState({
        fail: []
    })
    // { froms, to }

    useEffect(() => {
        validate()
        return ()=>{
            setResult({
                fail: []
            })
        }
    }, []);

    const validate = ()=>{
        setResult(prev=>{
            const copy = {...prev};
            fails.map(index=>{
                const matchedValue = mapper.matchMap(data[index]);
                // console.log(`from: ${data[index]}, to: ${matchedValue}`)
                if(matchedValue === null){
                    copy['fail'].push(index)
                    return;
                }
                if(!copy[matchedValue]){
                    copy[matchedValue] = [];
                }
                copy[matchedValue].push(index);
            })
            return copy;
        })
    }

    const cancel = ()=>{
        if(onCancel !== null){
            onCancel();
        }
        modal.closeModal(ModalType.LAYER.Table_Validation)
    }

    const confirm = ()=>{
        if(onConfirm !== null){
            const modifyData = {}
            // console.table(result)
            Object.keys(result).map(k=>{
                return result[k].map(v=>{
                    modifyData[v] = (k === 'fail') ? types[defaultValue] : k;
                })
            })
            onConfirm(modifyData);
        }
        modal.closeModal(ModalType.LAYER.Table_Validation)
    }

    return (
        <LayerModal>
            <div className='mt-3 d-flex flex-column justify-content-center align-items-center scrollbar'>
                <div>
                    <h1 className='text-black'><b className='text-primary'>[{DEFAULT_HEADERS.get(headerType)}]</b> 에 대한 유효성 검사</h1>
                    <h2 className='mt-4 text-black'>데이터 유형과 일치하지 않는 값이 <b className='text-danger'>{fails.length}</b>개 발견되었습니다</h2>
                    <hr/>
                    <div className='mt-4'>
                        <h3 className='text-black'>임의로 변경한 데이터 <b className='text-danger'>{fails.length - result.fail.length}</b>개</h3>
                        {
                            result && Object.keys(result).map(key => {
                                if (key === 'fail') {
                                    return null;
                                }
                                const failResults = result[key];
                                return <div className='d-flex flex-row align-items-center mt-4'>
                                    <div className='d-flex flex-row'>
                                        {
                                            failResults && failResults.map((val, index) => {
                                                if (index > 5) return;
                                                return <h3 className='me-2'>{data[val]}</h3>;
                                            })
                                        }
                                        {
                                            failResults.length > 5 ? <h3>...</h3> : null
                                        }
                                    </div>
                                    <h4 className='ms-4'>| <b className='text-danger'>{failResults.length}</b>개의 데이터</h4>
                                    <MdKeyboardDoubleArrowRight size='50px'/>
                                    <h3><b className='text-primary'>{key}</b></h3>
                                </div>
                            })
                        }
                    </div>
                    <hr/>
                    <div className='mt-5'>
                        {
                            result && (
                                result.fail.length > 0 && (
                                    <>
                                        <h3 className='text-black'>변경하지 못한 데이터 <b className='text-danger'>{result.fail.length}</b>개
                                        </h3>
                                        <h4>이 데이터들은 자동으로 <select className='text-success' value={defaultValue} onChange={e=>{
                                            console.log(types[e.target.value])
                                            setDefaultValue(e.target.value);
                                        }}>
                                            {
                                                types.map((type, index)=>{
                                                    return <option value={index}>{type}</option>
                                                })
                                            }
                                        </select>(으)로 초기화됩니다</h4>
                                    </>
                                )
                            )
                        }

                    </div>
                </div>
                <div className='d-flex flex-row align-items-center mt-3'>
                    <button className='btn btn-danger' onClick={cancel}>취소</button>
                    <button className='btn btn-primary ms-2' onClick={confirm}>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

export default TableValidationModal;