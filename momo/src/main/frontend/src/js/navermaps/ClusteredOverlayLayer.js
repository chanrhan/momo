import { useEffect, useRef, useState } from "react";
import { CustomOverlay } from "./CustomOverlay";
import { makeMarkerClustering } from "./marker-cluster";
import { ColoredMarker } from "./ColoredMarker";
import { ClusterMarker } from "./ClusterMarker";

export function ClusteredOverlayLayer({ navermaps, map, items }) {
    const [visibleItems, setVisibleItems] = useState([]);
    const clustererRef = useRef(null);
    const markerItemMapRef = useRef(new Map());

    useEffect(() => {
        if (!map || !navermaps || !items) return;

        const markers = items.map((item) => {
            const marker = new navermaps.Marker({
                position: item.position,
                map: null,
                visible: false,
            });

            markerItemMapRef.current.set(marker, item);
            return marker;
        });

        const MarkerClustering = makeMarkerClustering(window.naver);

        clustererRef.current = new MarkerClustering({
            minClusterSize: 2,
            maxZoom: 15,
            map,
            markers,
            gridSize: 100,
            icons: [],
            disableClickZoom: false,
            stylingFunction: (clusterMarker, count) => {
                clusterMarker.setVisible(false); // 숨김
            },
        });

        const updateVisible = () => {
            const clusters = clustererRef.current._clusters;
            const visible = [];

            for (const cluster of clusters) {
                const members = cluster._clusterMember;
                if (members.length === 1) {
                    const item = markerItemMapRef.current.get(members[0]);
                    if (item) visible.push({ ...item, isCluster: false });
                } else {
                    visible.push({
                        id: `cluster-${cluster.hashCode}`,
                        position: cluster._position,
                        count: members.length,
                        isCluster: true,
                    });
                }
            }

            setVisibleItems(visible);
        };

        navermaps.Event.addListener(map, "idle", updateVisible);
        updateVisible();

        return () => {
            clustererRef.current._clusters = [];
            navermaps.Event.clearListeners(map, "idle");
        };
    }, [map, navermaps, items]);

    return (
        <>
            {visibleItems.map((item) => (
                <CustomOverlay
                    key={item.id}
                    navermaps={navermaps}
                    map={map}
                    position={item.position}
                >
                    {item.isCluster ? (
                        <ClusterMarker count={item.count} />
                    ) : (
                        <ColoredMarker color={item.color} label={item.label} />
                    )}
                </CustomOverlay>
            ))}
        </>
    );
}
