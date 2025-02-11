import "./Line.css";

interface Props {
  value: number;
}

const Line = ({ value = 0 }: Props) => {
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${value}%` }}></div>
    </div>
  );
};

export default Line;
