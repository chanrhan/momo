import Popup from "../../../css/popup.module.css"
import {cm} from "../../utils/cm";

export const MenuModal = ({modalRef, children, top, left, width, height, close}) => {
    return (
        <div ref={modalRef} className={cm(Popup.popup, Popup.menu)}
             style={{
                 top: `${top}`,
                 left: `${left}`,
             }}>
            {children}
        </div>
    )
}