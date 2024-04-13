import {Link} from "react-router-dom";

function Admin(){
    return (
        <div>
            <h3 className='debug-page'>Admin Page</h3>
            <div>
                <Link to='setting'>
                    <button className='btn btn-outline-success'>기본 설정</button>
                </Link>
            </div>
        </div>
    )
}

export default Admin;