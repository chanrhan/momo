import Landing from "../../../css/landing.module.css";
import {Link} from "react-router-dom";

export function LandingReviewCard({name, shopName, role, text, id, imgSrc}){
    return (
        <li className={`${Landing.review_item}`}>
            <Link className={Landing.a} to=''>
                <div className={Landing.review_profile}>
                    <div className={Landing.profile_img}><img src={imgSrc} alt="프로필 이미지"/></div>
                    <div className={Landing.profile_name}>{name}</div>
                    <div className={Landing.profile_info}>
                        <span className={Landing.span}>{shopName}</span>
                        <span className={Landing.span}>{role}</span>
                    </div>
                </div>
                <div className={Landing.review_text}>{text}
                </div>
                <div className={Landing.review_writer}>{id}</div>
            </Link>
        </li>
    )
}