function DefaultModal({open, close, element}){
    if(!open){
        return null;
    }
    return (
        <div className='modal-background'>
            <div className='modal-main'>
                <div>
                    <button className='btn btn-close' onClick={close}></button>
                </div>
                {element}
            </div>
        </div>
    )
}

export default DefaultModal;