function DefaultModal({open, close, children}){
    if(!open){
        return null;
    }
    return (
        <div className={open ? 'modal-background' : 'modal'}>
            {
                open ? (
                    <div className='modal-main'>
                        <div>
                            <button className='btn btn-close' onClick={close}></button>
                        </div>
                        {children}
                    </div>
                ) : null
            }

        </div>
    )
}

export default DefaultModal;