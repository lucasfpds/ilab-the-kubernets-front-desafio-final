import { useHistory } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";
import Button from "../../components/Button";
import "./styles.css";

export default function Options() {
  const history = useHistory();
  const { setHeader, setToken } = useGlobal();
  setHeader(true);
  setToken(true);

  function handleChangePage(params) {
    if (params === "users") {
      history.push("/usuarios");
    } else {
      history.push("/pedidos");
    }
  }
  return (
    <div className="container-options">
      <Button
        onClickProp={() => handleChangePage("users")}
        text="Usuarios"
        clsName="btn-users"
      />
      <Button
        onClickProp={() => handleChangePage("orders")}
        text="Pedidos"
        clsName="btn-orders"
      />
    </div>
  );
}
