import {LayerModal} from "../LayerModal";
import useModal from "../../../hook/useModal";
import {ModalType} from "../ModalType";
import Popup from "../../../../css/popup.module.css";
import {useEffect, useMemo, useRef, useState} from "react";
import {TransformWrapper, TransformComponent, useTransformContext} from "react-zoom-pan-pinch";
import {ReactZoomPanPinchRef} from "react-zoom-pan-pinch";

const TOP_OFFSET = 0;

const MAX_WIDTH = 1000
const MAX_HEIGHT = 600


export function ImagePreviewModal(props){
    const modal = useModal()
    const [size, setSize] = useState({
        width: MAX_WIDTH,
        height: MAX_HEIGHT
    })

    const zoomScaleRef = useRef(null)


    useMemo(() => {
        const w = props.width;
        const h = props.height;
        // console.log(`img org w:${w}, h:${h}`)
        const resize = {
            width: w,
            height: h
        }

        if(resize.width > MAX_WIDTH){ // 최대 너비를 초과할 때
            resize.width = MAX_WIDTH
            resize.height = Math.floor(MAX_WIDTH * (h / w) * 10) / 10;
        }
        if(resize.height > MAX_HEIGHT){ // 최대 높이를 초과할 때
            resize.width = Math.floor(MAX_HEIGHT * (w / h)* 10) / 10;
            resize.height = MAX_HEIGHT
        }
        // console.log(`resize w:${resize.width}, h:${resize.height}`)
        setSize(resize)
    }, []);
    //
    // const ZoomWatcher = ({wrapperRef})=>{
    //     const [isZoomed, setIsZoomed] = useState(false);
    //
    //     useEffect(() => {
    //         if (!wrapperRef.current) return;
    //         console.table(wrapperRef.current)
    //
    //         const handleZoom = () => {
    //
    //         };
    //
    //         const scale = wrapperRef.current.instance.transformState.scale; // 현재 확대 비율 가져오기
    //         if (scale > 1 && !isZoomed) {
    //             setIsZoomed(true);
    //             console.log("🔍 확대 시작!");
    //         } else if (scale === 1 && isZoomed) {
    //             setIsZoomed(false);
    //             console.log("🔄 원래 크기로 돌아옴!");
    //         }
    //
    //         // // TransformWrapper의 상태 변경을 감지
    //         // wrapperRef.current.setTransform(wrapperRef.current.instance.transformState.scale, 0, 0, handleZoom);
    //         //
    //         // return () => {
    //         //     wrapperRef.current.setTransform(wrapperRef.current.instance.transformState.scale, 0, 0, null);
    //         // };
    //     }, [wrapperRef]);
    //
    //     return <div>현재 확대 상태: {isZoomed ? "확대됨" : "원본 크기"}</div>;
    // };



    const close = ()=>{
        modal.closeModal(ModalType.LAYER.Image_Preview)
    }


    return (
        <LayerModal {...props}
                    maxWidth={1200} maxHeight={1000}
            // top={window.pageYOffset+TOP_OFFSET}
                    width={size.width + 90} height={size.height + 80}
        >
            <div className={Popup.popup_title}>사진 미리보기</div>
            <div className={Popup.preview_description}>마우스 휠과 드래그로 <span className={Popup.blue_text}>이미지 확대/축소 및 이동</span>이 가능합니다.</div>
            <div className={Popup.preview_cont}>
                <div className={Popup.preview_img_box} style={{
                    width: `${size.width}px`,
                    height: `${size.height}px`,
                }}>
                    {
                        props.src && (
                            <TransformWrapper ref={zoomScaleRef} initialScale={1} minScale={1} maxScale={10}>
                                {/*<ZoomWatcher wrapperRef={zoomScaleRef}/>*/}
                                <TransformComponent>
                                    <figure>
                                        <img className={Popup.img} src={props.src} alt="Zoomable"/>
                                    </figure>
                                </TransformComponent>
                            </TransformWrapper>
                        )
                    }
                </div>
            </div>
            <button type="button" className={Popup.popup_close} onClick={close}>닫기</button>
        </LayerModal>
    )
}