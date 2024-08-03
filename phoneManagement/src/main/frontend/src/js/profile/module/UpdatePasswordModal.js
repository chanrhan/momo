import {LayerModal} from "../../common/modal/LayerModal";
import {cm, cmc} from "../../utils/cm";
import Popup from "../../../css/popup.module.css";
import User from "../../../css/user.module.css";
import useValidateInputField from "../../hook/useValidateInputField";
import {UserFormItem} from "../../account/module/UserFormItem";
import {UserFormInput} from "../../account/module/UserFormInput";
import useModal from "../../hook/useModal";
import {ModalType} from "../../common/modal/ModalType";
import useApi from "../../hook/useApi";

export function UpdatePasswordModal(props){
    const inputField = useValidateInputField([
        {
          key: 'org_pwd',
          name: '현재 비밀번호',
          msg: '현재 비밀번호를 입력해 주세요'
        },
        {
            key: 'pwd'
        },
        {
            key: 'pwd2'
        }
    ]);
    const modal = useModal();
    const {userApi} = useApi();

    const submit = async ()=>{
        if(inputField.validateAll()){
            await userApi.updatePassword({
                pwd: inputField.input.org_pwd,
                update_pwd: inputField.input.pwd
            }).then(({status,data})=>{
                if(status === 200 && data){
                    modal.openModal(ModalType.SNACKBAR.Info, {
                        msg: '비밀번호가 변경되었습니다'
                    })
                }
                close();
            })
        }
    }

    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Update_Password)
    }
    return (
        <LayerModal>
            <div className={cm(Popup.popup, Popup.active)} style={{
                maxWidth: '595px',
                top: '110px'
            }}>
                {/*활성화시 active 추가 -->*/}
                <form className={cm(Popup.user_form, User.user_form)}>
                    <div className={Popup.popup_cont}>
                        <h2 className={cm(User.user_title, Popup.user_title)}>비밀번호를 변경하시겠습니까?</h2>
                        {/*<p className={cm(Popup.form_text, User.form_text)}>입력하신 번호로 가입 링크를 보내드립니다.</p>*/}

                        <ul className={cm(Popup.form_list, User.form_list)}>
                            <UserFormItem errorText={inputField.error.org_pwd}>
                                <UserFormInput type='password' subject='현재 비밀번호' name='org_pwd' inputField={inputField}/>
                            </UserFormItem>
                            <UserFormItem errorText={inputField.error.pwd}>
                                <UserFormInput type='password' subject='새 비밀번호' name='pwd' inputField={inputField}
                                               onChange={inputField.handlePassword}/>
                            </UserFormItem>
                            <UserFormItem errorText={inputField.error.pwd2}>
                                <UserFormInput type='password' subject='새 비밀번호 확인' name='pwd2' inputField={inputField}
                                               onChange={inputField.handleConfirmPassword}/>
                            </UserFormItem>
                        </ul>

                    </div>

                    <div className={Popup.popup_btn_box}>
                        <button type="button" className={`btn_blue ${cmc(Popup.btn)}`} onClick={submit}>저장</button>
                    </div>
                </form>

                <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
            </div>
        </LayerModal>
    )
}