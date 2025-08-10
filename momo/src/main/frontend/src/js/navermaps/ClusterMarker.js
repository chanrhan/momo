export function ClusterMarker({ count }) {
    return (
        <div
            style={{
                backgroundColor: "#333",
                color: "white",
                padding: "6px 10px",
                borderRadius: "999px",
                fontSize: "12px",
                border: "2px solid white",
                boxShadow: "0 0 6px rgba(0,0,0,0.3)",
            }}
        >
            {count}
        </div>
    );
}
