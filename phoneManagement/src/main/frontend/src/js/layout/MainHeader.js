import logo from "../../images/logo.png"
import "../../css/layout.module.css"
import "../../css/user.module.css"

export function MainHeader(){
    return (
        <header>
            <h1 className="logo"><a href="#"><img src={logo} alt="momo"/></a></h1>

            <div className="gnb">
                <div className="gnb_search">
                    <form>
                        <input type="search" title="검색" id="검색" placeholder="이름, 전화번호, 식별번호로 검색해보세요."/>
                        <button type="submit">검색</button>
                    </form>
                </div>

                <div className="gnb_link">
                    <ul className="link_list">
                        <li className="link_item alarm has">
                             {/*알람 있을 경우 has 추가 */}
                            <button type="button" className="link_btn">알람</button>
                        </li>
                        <li className="link_item my">
                            <button type="button" className="link_btn">내 정보</button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}