import {Link, useNavigate} from "react-router-dom";
import React from "react";

function PreviewHeader(){
    const navigate = useNavigate();
    return (
        <>
            <h2 className='debug-page'>Preview Page</h2>
            <div className='row-cols-auto'>
                <button>
                    <Link to='/account/login'>로그인</Link>
                </button>
                <button>
                    <Link to='/account/login'>무료로 시작하기</Link>
                </button>
            </div>

            <div className='preview-bg'></div>
        </>
    )
}

export default PreviewHeader;