import {useParams} from "react-router-dom";

function ManageCustomer(){
    const {category} = useParams();

    return (
        <div>
            <p className='debug-page'>Manage Customer Page</p>
            <p>{`category: ${category}`}</p>
        </div>
    )
}

export default ManageCustomer;