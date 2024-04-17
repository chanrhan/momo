export const LayerModal = ({children, width, height})=>{

    return (
        <div className='openModal modal-shadow-bg'>
            <div className='modal-shadow-main' style={{width: width, height: height}}>
                {children}
            </div>
        </div>
    )
}
