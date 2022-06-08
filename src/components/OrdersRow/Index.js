/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import "./styles.css";

export default function OrdersRow(props) {
  const { user, total_value, description, date, status } = props;

  const newTotalValue = () => {
    const newValue = String(total_value / 100);
    const formated = newValue.includes(".")
      ? newValue.replace(".", ",")
      : `${newValue},00`;
    return formated.split(",")[1].length === 1 ? `${formated}0` : formated;
  };

  const dateFormat = new Date(date);

  const dateFormated = () =>
    `${
      dateFormat.getDate() < 10
        ? `0${dateFormat.getDate()}`
        : `${dateFormat.getDate()}`
    }/${
      dateFormat.getMonth() + 1 < 10
        ? `0${dateFormat.getMonth() + 1}`
        : dateFormat.getMonth() + 1
    }/${dateFormat.getFullYear()}`;

  return (
    <div className="table-rows">
      <div style={{ width: "32%" }}>
        <p>{user}</p>
      </div>
      <div style={{ width: "12%" }}>
        <p>R$ {newTotalValue()} </p>
      </div>
      <div style={{ width: "32%" }}>
        <p className="without-over">{description}</p>
        <p className="over">{description}</p>
      </div>
      <div style={{ width: "12%" }}>
        <p>{dateFormated()}</p>
      </div>
      <div style={{ width: "12%" }}>
        <p>{status}</p>
      </div>
    </div>
  );
}
