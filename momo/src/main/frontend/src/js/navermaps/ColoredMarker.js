export function ColoredMarker({ color, label }) {
    return (
        <div
            style={{
                backgroundColor: color,
                borderRadius: "50%",
                width: 16,
                height: 16,
                border: "2px solid white",
                boxShadow: "0 0 4px rgba(0,0,0,0.3)",
            }}
            title={label}
        />
    );
}
