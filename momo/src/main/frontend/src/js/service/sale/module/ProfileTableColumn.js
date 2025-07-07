import profileImg1 from "../../../../images/profile_img1.jpg";
import {Btd} from "../../board/BoardTable";
import {cm} from "../../../utils/cm";
import Board from "../../../../css/board.module.css";
import {useHintBox} from "../../../hook/useHintBox";

const UNKNOWN_USER_IMG = "/static/media/unknown_fill_icon.e8037aa7ed4b22d950c6.png"
export function ProfileTableColumn({src, name, active}){
    const hintBox = useHintBox("매장에 등록되지 않은 사용자입니다.")
    return (
        <Btd className='ta_l' style={{
            paddingLeft: '20px'
        }}>
            <div className={`${Board.board_profile} select_box`} >
                <button type="button" className={cm(Board.profile_name)}
                        onMouseOver={e=>{
                    hintBox.open(e)
                }}>
                    <span className={cm(Board.profile_img)}>
                        <img src={src} alt="프로필 이미지"/>
                    </span>
                    <span className={Board.name_text}>
                        {name}
                    </span>
                    {
                        src === UNKNOWN_USER_IMG && (
                            <>
                                {hintBox.component}
                            </>
                        )
                    }
                </button>

                {/*<ul className={`${cm("select_layer", "profile_list", "add_icon")} ${active && Board.active}`}>*/}
                {/*    /!*활성화시 active 추가 -->*!/*/}
                {/*    <li className='profile_item graph'>*/}
                {/*        <button type="button">그래프 보기</button>*/}
                {/*    </li>*/}
                {/*    <li className="profile_item secession">*/}
                {/*        <button type="button">탈퇴 하기</button>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </div>
        </Btd>
    )
}