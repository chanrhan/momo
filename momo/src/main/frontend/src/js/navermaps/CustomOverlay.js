import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export function CustomOverlay({ navermaps, map, position, children }) {
    const overlayRef = useRef(null);
    const containerRef = useRef(document.createElement("div"));

    useEffect(() => {
        if (!map || !navermaps || !position) return;

        class ReactOverlay extends navermaps.OverlayView {
            constructor() {
                super();
                this.setMap(map);
            }

            onAdd() {
                const pane = this.getPanes().overlayLayer;
                pane.appendChild(containerRef.current);
            }

            draw() {
                const projection = this.getProjection();
                const pixelPosition = projection.fromCoordToOffset(position);

                const el = containerRef.current;
                el.style.position = "absolute";
                el.style.left = `${pixelPosition.x}px`;
                el.style.top = `${pixelPosition.y}px`;
            }

            onRemove() {
                const el = containerRef.current;
                if (el.parentNode) el.parentNode.removeChild(el);
            }
        }

        overlayRef.current = new ReactOverlay();

        return () => {
            overlayRef.current.setMap(null); // 오버레이 제거
        };
    }, [navermaps, map, position]);

    // children은 JSX로 넣을 수 있음
    return ReactDOM.createPortal(children, containerRef.current);
}
