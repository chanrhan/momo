import useModal from "../../../hook/useModal";
import DEFAULT_HEADERS from "../../../test/DEFAULT_HEADERS";
import {useEffect, useState} from "react";
import {useMapper} from "../../../utils/useMapper";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {ObjectUtils} from "../../../utils/objectUtil";
import {SAMPLE_PHONE_MODEL} from "../../../test/SAMPLE_DATA";
import {ModalType} from "../../../common/modal/ModalType";
import {LayerModal} from "../../../common/modal/LayerModal";

const GENDER = [
    '남',
    '여',
    '법인'
]

function SaleDataValidationModal(props){
    const modal = useModal();
    const [defaultValue, setDefaultValue] = useState(0);
    const [result, setResult] = useState({

    })
    const [mappedFails, setMappedFails] = useState([])
    // { froms, to }

    useEffect(() => {
        if(props.data){
            validate();
        }
    }, []);

    const validate = ()=>{
        const data = props.data;
        const transpose = data => data.reduce(
            (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
            []
        );
        // const cols = new Array(props.columnLength).fill(Array(data.length));
        // data.forEach(((row, rowIdx)=>{
        //     row.forEach(((col, colIdx)=>{
        //         console.log(`c:${colIdx},r:${rowIdx} -> ${col}`)
        //         cols[colIdx][rowIdx] = col;
        //     }))
        // }))
        console.table(data)
    }

    const cancel = ()=>{
        modal.closeModal(ModalType.LAYER.SaleData_Validation)
    }

    const confirm = ()=>{

    }

    // 열 잠금 기능도 있으면 좋을듯?

    return (
        <LayerModal {...props} top={100}>
            <div className='d-flex flex-column justify-content-center align-items-center scrollbar'>
                <div className='mt-5'>
                    <h1 className='mt-6 text-black'>유효성 검사</h1>
                    <h2 className='mt-4 text-black'>데이터 유형과 일치하지 않는 값이 <b className='text-danger'>{}</b>개 발견되었습니다</h2>
                    <hr/>
                    <div className='mt-4'>
                        <h3 className='text-black'>임의로 변경한 데이터 <b className='text-danger'>{}</b>개</h3>
                        {
                            result && Object.keys(result).map(key => {
                                // if (key === 'fail') {
                                //     return null;
                                // }
                                const failResults = result[key];
                                // console.table(failResults)
                                let failCount = 0;
                                return <div className='d-flex flex-row align-items-center mt-4'>
                                    <div className='d-flex flex-row'>
                                        {
                                            failResults && Object.keys(failResults).map((val, index) => {
                                                failCount += failResults[val].length;
                                                if (index > 5) return;
                                                return <div className='d-flex flex-column align-items-center justify-content-center'>
                                                    <h6 className='text-danger'>{failResults[val].length}개</h6>
                                                    <h3 className='fail-value'>{val}</h3>
                                                </div>;
                                            })
                                        }
                                        {
                                            failResults.length > 5 ? <h3>...</h3> : null
                                        }
                                    </div>
                                    <h4 className='ms-4'>| <b className='text-danger'>{failCount}</b>개의 데이터</h4>
                                    <MdKeyboardDoubleArrowRight size='50px'/>
                                    <h3><b className='text-primary'>
                                        <ValueSelector value={key}/></b></h3>

                                </div>
                            })
                        }
                    </div>
                    <hr/>
                    <div className='mt-5'>
                        {
                            result && (
                                mappedFails.length > 0 && (
                                    <>
                                        <h3 className='text-black'>변경하지 못한 데이터 <b className='text-danger'>{mappedFails.length}</b>개
                                        </h3>
                                        <h4>이 데이터들은 자동으로 <select className='text-success' value={defaultValue} onChange={e=>{
                                            // console.log(types[e.target.value])
                                            setDefaultValue(e.target.value);
                                        }}>
                                            {/*{*/}
                                            {/*    types.map((type, index)=>{*/}
                                            {/*        return <option value={index}>{type}</option>*/}
                                            {/*    })*/}
                                            {/*}*/}
                                        </select>(으)로 초기화됩니다</h4>
                                    </>
                                )
                            )
                        }

                    </div>
                </div>
                <div className='d-flex flex-row align-items-center mt-3 mb-5'>
                    <button className='btn btn-danger' onClick={cancel}>취소</button>
                    <button className='btn btn-primary ms-2' onClick={confirm}>확인</button>
                </div>
            </div>
        </LayerModal>
    )
}

function ValueSelector({type, value}){
    // console.log(`type: ${type}`)
    switch (type){
        case 'ph_md':
            return SAMPLE_PHONE_MODEL[value];
        default:
            return value;
    }
}

export default SaleDataValidationModal;