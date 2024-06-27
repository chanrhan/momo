export const LayerModal = ({modalRef, children, width, height})=>{

    return (
        <div className='openModal modal-shadow-bg'>
            <div ref={modalRef}  className='modal-layer' style={{width: width, height: height}}>
                {children}
            </div>
        </div>
    )
}
