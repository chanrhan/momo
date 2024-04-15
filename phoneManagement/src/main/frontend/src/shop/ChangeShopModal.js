import {PopupModal} from "../modal/PopupModal";

function ChangeShopModal({open, close}){

    const submit = async ()=>{

    }

    return (
        <PopupModal open={open}>

            <div className='d-flex flex-row justify-content-center mt-5'>
                <button className='btn btn-outline-primary' name='changeShop' onClick={close}>취소</button>
                <button className='btn btn-primary ms-4' onClick={submit}>확인</button>
            </div>
        </PopupModal>
    )
}

export default ChangeShopModal;