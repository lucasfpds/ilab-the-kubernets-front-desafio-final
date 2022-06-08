import "./styles.css";
import { useHistory } from "react-router-dom";

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
