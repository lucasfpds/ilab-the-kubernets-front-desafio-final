import "./styles.css";
import { useHistory } from "react-router-dom";

import imgLogin from "../../assets/login.png";
import Button from "../../components/Button";

export default function Home() {
  const history = useHistory();
  async function handleSubmit(path) {
    if (path === "in") {
      history.push("/login");
    } else {
      history.push("/cadastrar");
    }
  }
  navigator.geolocation.getCurrentPosition((e) => e);
  return (
    <div className="container-home">
      {/* <h3 style={{ fontWeight: "normal" }}>
        <b>iFood</b> para <br /> Entregadores
      </h3> */}

      {/* <img src={imgLogin} alt="imagem home" /> */}

      <Button
        text="Entrar"
        clsName="btn-signin"
        onClickProp={() => handleSubmit("in")}
      />
      <Button
        text="Cadastrar"
        clsName="btn-signup"
        onClickProp={() => handleSubmit("up")}
      />
    </div>
  );
}
