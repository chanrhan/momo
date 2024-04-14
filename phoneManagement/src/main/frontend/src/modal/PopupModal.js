export const PopupModal = ({name, open, close, children, width, height})=>{

    return (
        <div className={open ? 'openModal modal-bg' : 'modal-bg'}>
            {
                open ? (
                    <div className='modal-main' style={{width: width, height: height}}>
                        {
                            close && (
                                <div>
                                    <button className='btn btn-close' name={name} onClick={close}></button>
                                </div>
                            )
                        }
                        {children}
                    </div>
                ) : null
            }
        </div>
    )
}
