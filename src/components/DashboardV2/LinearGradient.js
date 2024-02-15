const LinearGradient = ({ cssId, startColor, endColor}) => {
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={cssId}>
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>      
    </svg>
  );
};
export default LinearGradient;