const ArrowFlow = () => {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <marker
          id="connection-marker"
          markerWidth="6"
          markerHeight="6"
          viewBox="-6 -6 12 12"
          orient="auto"
          refX="6"
          refY="0"
        >
          <polygon
            points="0,-4 8,0 0,4"
            fill="#3b82f6"
            stroke="#3b82f6"
            strokeWidth="1"
          />
        </marker>
      </defs>
    </svg>
  );
};

export default ArrowFlow;
