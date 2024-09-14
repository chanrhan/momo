import {useEffect, useRef, useState} from "react";

export function EventTest(){
    const parentRef = useRef(null)
    const childRef = useRef(null)
    const [change, setChange] = useState(false)

    const reRendering = ()=>{
        setChange(!change)
    }

    const captureEvent = (e)=>{
        console.log(`${e.target.name} capture`)
    }

    const bubbleEvent = (e)=>{
        console.log(`${e.target.name} bubblue`)
    }

    useEffect(() => {
        console.log('use Effect')
        window.addEventListener('click', captureEvent, true)
        window.addEventListener('click', bubbleEvent, false)
        return ()=>{
            console.log('clean up')
            window.removeEventListener('click', captureEvent)
            window.removeEventListener('click', bubbleEvent)
        }
    }, [change]);

    return (
        <div>
            <h1>버블링 / 캡처링 이벤트 테스트</h1>

            <button onClick={reRendering}>Re-Rendering</button>

            <div name='parent' ref={parentRef} style={{
                backgroundColor: "yellow",
                width: '500px',
                height: '500px'
            }}>
                <div name='child' ref={childRef} style={{
                    backgroundColor: "blue",
                    width: '300px',
                    height: '300px'
                }}>

                </div>
            </div>
        </div>
    )
}