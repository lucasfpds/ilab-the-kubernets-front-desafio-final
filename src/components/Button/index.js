import "./style.css";

export default function Button(props) {
  const { text, onClickProp, clsName } = props;
  return (
    <button className={`${clsName} btn`} onClick={onClickProp}>
      <p>{text}</p>
    </button>
  );
}
