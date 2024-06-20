import "../../css/layout.module.css"
import "../../css/user.module.css"


export function Sidebar(){
    return (
        <div className="lnb">
            <nav className="menu">
                <ul className="menu_list">
                    <li className="menu_item menu_customer active"><a href="#">고객</a></li>
                    {/*활성화시 active 추가*/}
                    <li className="menu_item menu_work"><a href="#">업무</a></li>
                    <li className="menu_item menu_communication"><a href="#">연락</a></li>
                    <li className="menu_item menu_data"><a href="#">데이터</a></li>
                    <li className="menu_item menu_chat"><a href="#">팀 채팅</a></li>
                </ul>
                <ul className="menu_list">
                    <li className="menu_item menu_set"><a href="#">설정</a></li>
                </ul>
            </nav>
        </div>
    )
}