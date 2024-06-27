import {LayerModal} from "../../../src/js/common/modal/LayerModal";
import useModal from "../../hook/useModal";
import {ModalType} from "../../../src/js/common/modal/ModalType";
import useInputField from "../../hook/useInputField";
import ValidationError from "../../../src/js/error/ValidationError";
import useApi from "../../hook/useApi";

function UpdatePasswordModal() {
    const modal = useModal();
    const inputField = useInputField([
        {
            key: 'pwd'
        }, {
            key: 'pwd2'
        },
        {
            key: 'org_pwd',
            name: '현재 비밀번호',
            require: true,
            msg: '현재 비밀번호를 입력해 주세요'
        }
    ]);
    const {userApi} = useApi();

    const close = () => {
        modal.closeModal(ModalType.SNACKBAR.Alert)
        modal.closeModal(ModalType.LAYER.Update_Password)
    }

    const updatePassword = () => {
        if (inputField.validateAll()) {
            userApi.updatePassword({
                pwd: inputField.input.org_pwd,
                update_pwd: inputField.input.pwd
            }).then(({status, data}) => {
                modal.openModal(ModalType.SNACKBAR.Alert, {
                    msg: "비밀번호가 변경되었습니다"
                })
            })
        }
    }

    return (
        <LayerModal>
            <div className='d-flex flex-column justify-content-center p-5'>
                <h3>비밀번호를 변경하시겠습니까?</h3>
                <div className='mt-3'>
                    <p>현재 비밀번호</p>
                    <input type="password" name='org_pwd' onChange={inputField.handleInput}/>
                </div>
                <ValidationError error={inputField.error.org_pwd}/>
                <div className='mt-3'>
                    <p>새 비밀번호</p>
                    <input type="password" name='pwd' onChange={inputField.handlePassword}/>
                </div>
                <ValidationError error={inputField.error.pwd}/>
                <div className='mt-3'>
                    <p>새 비밀번호 확인</p>
                    <input type="password" name='pwd2' value={inputField.input.pwd2} onChange={inputField.handleConfirmPassword}/>
                </div>
                <ValidationError error={inputField.error.pwd2}/>
                <div className='mt-3'>
                    <button className='btn btn-primary' onClick={close}>취소</button>
                    <button className='btn btn-outline-primary ms-2' onClick={updatePassword}>확인</button>
                </div>

            </div>

        </LayerModal>
    )
}

export default UpdatePasswordModal;