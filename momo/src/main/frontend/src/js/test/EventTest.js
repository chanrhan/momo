import {useEffect, useRef, useState} from "react";
import {MouseEventUtils} from "../utils/MouseEventUtils";

export function EventTest(){
    const parentRef = useRef(null)
    const childRef = useRef(null)
    const [count, setCount] = useState(0)

    const listRef = useRef(null)

    useEffect(() => {
        MouseEventUtils.attachDragAndDropEvent(listRef.current);
    }, []);

    // useEffect(()=>{
    //     const onClickCaptureEvent = (e)=>{
    //         console.log(`onclick capture: ${count}`)
    //         window.removeEventListener("click", onClickCaptureEvent, true)
    //     }
    //     const onClickBubbleEvent = (e)=>{
    //         console.log(`onclick bubble: ${count}`)
    //         window.removeEventListener("click", onClickBubbleEvent, false)
    //     }
    //
    //     const onKeydownCaptureEvent = (e)=>{
    //         console.log(`onkeydown capture: ${count}`)
    //         window.removeEventListener("keydown", onKeydownCaptureEvent, true)
    //     }
    //
    //     window.addEventListener('click', onClickCaptureEvent, true);
    //     window.addEventListener('keydown', onKeydownCaptureEvent, true);
    //
    //     let timer = setTimeout(()=>{
    //         window.addEventListener('click', onClickBubbleEvent, false);
    //     }, 10)
    //
    //     return ()=>{
    //         clearTimeout(timer);
    //     }
    // }, [count])

    return (
        <div style={{
            position: "relative",
            display: "block"
        }}>
            {/*<div>*/}
            {/*    <h1>버블링 / 캡처링 이벤트 테스트</h1>*/}

            {/*    <button onClick>Re-Rendering</button>*/}

            {/*    <div onClick={() => {*/}
            {/*        setCount(count + 1)*/}
            {/*    }} style={{*/}
            {/*        backgroundColor: "yellow",*/}
            {/*        width: '500px',*/}
            {/*        height: '500px'*/}
            {/*    }}>*/}
            {/*        <div style={{*/}
            {/*            backgroundColor: "blue",*/}
            {/*            width: '300px',*/}
            {/*            height: '300px'*/}
            {/*        }}>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div style={{
                padding: '10px'
            }}>
                <h1>드래그 앤 드롭 테스트 </h1>
                <ul ref={listRef}>
                    <li draggable={true} style={{backgroundColor: "yellow",width: '100px'}}>111</li>
                    <li draggable={true} style={{backgroundColor: "yellow",width: '100px'}}>111</li>
                    <li draggable={true}  style={{backgroundColor: "grey",width: '100px'}}>1444411</li>
                    <li draggable={true}  style={{backgroundColor: "red",width: '100px'}}>222</li>
                    <li draggable={true}  style={{backgroundColor: "blue",width: '100px'}}>111</li>
                    <li draggable={true}  style={{backgroundColor: "red",width: '100px'}}>333</li>
                </ul>
            </div>
        </div>
    )
}