function PfpSetting({close}){

    const submit = async ()=>{

    }

    return (
        <div>
            <div className='d-flex flex-row justify-content-center mt-5'>
                <button className='btn btn-outline-primary' name='setNickname' onClick={close}>취소</button>
                <button className='btn btn-primary ms-4' onClick={submit}>확인</button>
            </div>
        </div>
    )
}

export default PfpSetting;