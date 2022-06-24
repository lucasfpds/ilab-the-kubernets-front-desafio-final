import "./styles.css";
import { TextField } from "@mui/material";
import { useHistory, Link } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

import useRequest from "../../hooks/useRequest";
import toast from "../../helpers/toast";
import Button from "../../components/Button";

export default function SignUp() {
  const history = useHistory();
  const { post } = useRequest();

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });
  const [valuesConfirm, setValuesConfirm] = useState({
    password: "",
    showPassword: false,
  });

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeConfirm = (prop) => (event) => {
    setValuesConfirm({ ...valuesConfirm, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setValuesConfirm({
      ...valuesConfirm,
      showPassword: !valuesConfirm.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function handleSubmit() {
    if (!values.password || !email || !name || !valuesConfirm.password) {
      return toast.messageError("Preencha todos os campos");
    }
    if (values.password !== valuesConfirm.password) {
      return toast.messageError("As senhas não são iguais");
    }
    if (values.password.length < 6) {
      return toast.messageError("A senha deve ter no mínimo 6 caracteres");
    }
    const body = {
      email,
      name,
      password: values.password,
    };
    // eslint-disable-next-line no-unused-vars
    const result = await post(
      `${process.env.REACT_APP_API_ADMIN_URL}/create`,
      body,
      false
    ).then((res) => {
      if (res.status) {
        toast.messageSuccess("Usuário criado com sucesso");
        history.push("/login");
      }
    });
  }
  return (
    <div className="container-signup">
      <TextField
        size="small"
        id="outlined-basic"
        label="Nome"
        variant="outlined"
        sx={{ width: "40%" }}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        size="small"
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        sx={{ width: "40%" }}
        onChange={(event) => setEmail(event.target.value)}
      />
      <FormControl size="small" sx={{ m: 0, width: "40%" }} variant="outlined">
        <InputLabel size="small" htmlFor="outlined-adornment-password">
          Senha
        </InputLabel>
        <OutlinedInput
          onKeyDown={(e) => {
            // eslint-disable-next-line no-unused-expressions
            e.key === "Enter" ? handleSubmit() : null;
          }}
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <FormControl size="small" sx={{ m: 0, width: "40%" }} variant="outlined">
        <InputLabel size="small" htmlFor="outlined-adornment-confirmPassword">
          Confirme a Senha
        </InputLabel>
        <OutlinedInput
          onKeyDown={(e) => {
            // eslint-disable-next-line no-unused-expressions
            e.key === "Enter" ? handleSubmit() : null;
          }}
          id="outlined-adornment-confirmPassword"
          type={valuesConfirm.showPassword ? "text" : "password"}
          value={valuesConfirm.password}
          onChange={handleChangeConfirm("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {valuesConfirm.showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button text="Cadastrar" onClickProp={handleSubmit} />
      <div className="btn-aux">
        <p>Já tem cadastro?&nbsp;</p>
        <Link to="/login">Clique aqui!</Link>
      </div>
    </div>
  );
}
