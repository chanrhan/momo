import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {ObjectUtils} from "../../utils/objectUtil";
import useModal from "../../hook/useModal";
import {ModalSet} from "./ModalSet";

const M_TYPE = {
    MENU: 'MENU',
    LAYER: 'LAYER',
    RENDERLESS: 'RENDERLESS',
    TOOLTIP: 'TOOLTIP'
}

function ModalContainer(){
    const modal = useModal();
    const modalList : Object<string,Array> = useSelector(state=>state.modalReducer);
    const topComponentRef = useRef(null);

    const handleRef = (node) => {
        if (node) {
            // console.log('Callback ref:', node);
            topComponentRef.current = node;
        }
    };

    useEffect(()=>{
        if(ObjectUtils.isEmpty(modalList.list)){
            return;
        }

        const {type, modalName, onopen, onclose} = modalList.list[modalList.list.length-1];
        // console.log(`Before capture: ${topComponentRef.current?.className}`)
        const onClickCaptureEvent = (e: MouseEvent)=>{
            // console.log(`before capture: ${modalName}`)
            // console.log('before capture')
            // console.log(topComponentRef.current.innerText)
            if(topComponentRef.current && !topComponentRef.current.contains(e.target)){
                // console.log('capture')
                modal.closeAndLockModal(modalName)
                window.removeEventListener('mousedown', onClickCaptureEvent, true)
                window.removeEventListener('keydown', onKeydownCaptureEvent, true)
            }
        }

        const onClickBubbleEvent = (e)=>{
            // console.log(`Before bubble: ${topComponentRef.current?.className}`)
            // console.log(`target: ${e.target?.className}`)
            // if(topComponentRef.current && !topComponentRef.current.contains(e.target)){
            //     console.log('bubble')
            //
            //     modal.unlockModal()
            //     window.removeEventListener('click', onClickBubbleEvent, false)
            // }
            // console.log('bubble')
            modal.unlockModal()
            window.removeEventListener('click', onClickBubbleEvent, false)
        }

        const onKeydownCaptureEvent = (e: KeyboardEvent)=>{
            if(e.keyCode === 27){
                modal.closeModal(modalName);

                window.removeEventListener('keydown', onKeydownCaptureEvent, true)
                window.removeEventListener('mousedown', onClickCaptureEvent, true)
                window.removeEventListener('click', onClickBubbleEvent, false)
            }
        }

        // 모든 흐름이 끝난 후 이벤트 리스너를 붙이도록 비동기적으로 처리
        const attachListenerTimer = setTimeout(()=>{
            if(type === M_TYPE.LAYER || type === M_TYPE.MENU || type === M_TYPE.RENDERLESS){
                window.addEventListener('click', onClickBubbleEvent, false)
                window.addEventListener('mousedown', onClickCaptureEvent, true) // true: capturing, false: bubbling
                // window.addEventListener('keydown', onKeydownCaptureEvent, true)
            }

            if(type === M_TYPE.MENU || type === M_TYPE.LAYER || type === M_TYPE.RENDERLESS){
                window.addEventListener('keydown', onKeydownCaptureEvent, true)
            }
        }, 10)

        return ()=>{
            // console.log('clean, ref:', topComponentRef.current?.className);
            clearTimeout(attachListenerTimer);
            window.removeEventListener('keydown', onKeydownCaptureEvent, true)
            window.removeEventListener('mousedown', onClickCaptureEvent, true)
            // window.removeEventListener('click', onClickBubbleEvent, false)
            // bubbling의 경우에는 미리 삭제하면 안되기 때문에 주석처리
        }
    },[modalList.list])

    let topIndex = 0;
    let topScrollIndex = 0;
    modalList.list.forEach(({modalName, type, props}, index)=>{
        if(type === M_TYPE.MENU || type === M_TYPE.LAYER || type === M_TYPE.RENDERLESS){
            topIndex = index
        }
        if(type === M_TYPE.LAYER || type === M_TYPE.MENU){
            topScrollIndex = index
        }
    })

    const lastIndex = modalList.list.length - 1;
    // console.table(modalList.list)
    // console.log(`topIndex: ${topIndex}`)
    const renderModal = modalList.list.filter(({modalName, type, props})=>{
        if(ObjectUtils.isEmpty(modalName) || ObjectUtils.isEmpty(type)){
            return false;
        }
        if(type === M_TYPE.RENDERLESS){
            if(props.ref){
                topComponentRef.current = props.ref;
            }
            return false;
        }
        return true;
    }).map(({modalName, type, onopen, onclose, props}, index)=>{


        // if(index === modalList.length-1){
        //     if(type === 'MENU' || type === 'LAYER'){
        //         return <ModalComponent scrollable={true} modalRef={topComponentRef} key={modalName} {...props}/>
        //     }
        // }
        let windowBlocked = false;
        if(type === M_TYPE.LAYER && index === lastIndex){
            windowBlocked = true;
        }

        if(index === topIndex){
            // if(type === M_TYPE.RENDERLESS){
            //     if(props.ref){
            //         // console.log('props ref')
            //         // console.table(topComponentRef.current?.className)
            //         topComponentRef.current = props.ref;
            //         // console.log('after')
            //         // console.table(topComponentRef.current?.className)
            //         // modal.addTopElement(props.ref)
            //     }
            //
            //     return null;
            // }
            const ModalComponent = ModalSet[modalName];
            return <ModalComponent scrollable={true} modalRef={handleRef} windowBlocked={windowBlocked} key={modalName} {...props}/>
        }

        const ModalComponent = ModalSet[modalName];

        let scrollable = false;
        if((type === M_TYPE.LAYER || type === M_TYPE.MENU) && index === topScrollIndex){
            scrollable = true;
        }

        return <ModalComponent scrollable={scrollable} windowBlocked={windowBlocked} key={modalName} {...props}/>
    });

    return createPortal(
        <>
            {renderModal}
        </>, document.getElementById('root')
    )
}

export default ModalContainer;