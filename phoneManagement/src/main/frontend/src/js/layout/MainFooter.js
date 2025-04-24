import Layout from "../../css/layout.module.css"
import {cm} from "../utils/cm";

export function MainFooter(){
    return (
        <footer className="footer">
            <div className={Layout.corp_info_box}>
                <span className={cm(Layout.corp_info_item, Layout.a1)}>
                    2025 Ultari Corp.
                </span>
                <span className={cm(Layout.corp_info_item, Layout.a2)}>
                    주식회사 울타리   <span>|</span> <span>대표자 : 박상인</span>
                </span>
                <span className={cm(Layout.corp_info_item, Layout.a3)}>
                    사업자등록번호 : 521-87-02490
                </span>
            </div>
        </footer>
    )
}