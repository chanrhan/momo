import {useNavigate, useParams} from "react-router-dom";
import NotFound from "../../component/common/NotFound";
import {useState} from "react";
import {getCorpListForRoleDetail} from "../../api/ShopApi";
import {useSelector} from "react-redux";
import {ObjectUtils} from "../../utils/objectUtil";
import SignupStaff from "./SignupStaff";
import SignupReps from "./SignupReps";

function RoleDetail(){
    return (
        <div>
            <h3 className='debug-page'>Role Detail Page</h3>
            <RoleDetailSelector/>
        </div>
    )
}

function RoleDetailSelector(){
    const {role} = useParams();
    switch (role){
        case 'staff':
            return <SignupStaff/>;
        case 'bm':
            return <SignupStaff/>;
        case 'reps':
            return <SignupReps/>;
        default:
            return <NotFound/>;

    }
}

export default RoleDetail;