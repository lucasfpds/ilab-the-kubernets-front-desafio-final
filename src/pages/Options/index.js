import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import "./styles.css";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";

export default function Options() {
  const history = useHistory();
  const { token, admin, setAdmin } = useGlobal();
  const { get } = useRequest();

  useEffect(() => {
    get(`${process.env.REACT_APP_API_ADMIN_URL}/admin/${admin.id}`, token).then(
      (res) => {
        if (res.name) {
          setAdmin(res);
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
