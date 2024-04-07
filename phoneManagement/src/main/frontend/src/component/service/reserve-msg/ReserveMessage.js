import {useParams} from "react-router-dom";

function ReserveMessage(){
    const {category} = useParams();

    return (
        <div>
            <p className='debug-page'>Reserve Message Page</p>
            <p>{`category: ${category}`}</p>
        </div>
    )
}

export default ReserveMessage;