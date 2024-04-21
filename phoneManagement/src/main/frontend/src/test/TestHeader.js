import {Link, Outlet} from "react-router-dom";

function TestHeader(){
    return (
        <div>
            <Link to='/test'>
                <button className='btn btn-outline-light text-success-emphasis' style={{fontSize: '40px'}}>테스트 페이지</button>
            </Link>
            <div className='mt-3 d-flex flex-row justify-content-center'>
                <Link to='notify'>
                    <button className='btn btn-outline-success ms-1'>알림 테스트</button>
                </Link>
                <Link to='modal'>
                    <button className='btn btn-outline-success ms-1'>모달창 테스트</button>
                </Link>
                <Link to='ref'>
                    <button className='btn btn-outline-success ms-1'>Ref 테스트</button>
                </Link>
            </div>
            <Outlet/>
        </div>
    )
}

export default TestHeader;