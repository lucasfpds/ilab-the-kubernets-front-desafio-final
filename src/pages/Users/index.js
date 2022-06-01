/* eslint-disable object-curly-newline */
import "./styles.css";
import { useHistory } from "react-router-dom";
import { usuarios } from "../../utils/arrays";
import UsersRow from "../../components/UsersRow";
import useGlobal from "../../hooks/useGlobal";

export default function Users() {
  const history = useHistory();
  const { users, setOpenModal, userEdit, setUserEdit } = useGlobal();
  return (
    <>
      <div className="container-users">
        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-create-user"
        >
          <p>Cadastrar Usuario</p>
        </button>
        <div className="table-title">
          <h3 style={{ width: "25%" }}>Nome</h3>
          <h3 style={{ width: "10%" }}>CPF</h3>
          <h3 style={{ width: "25%" }}>Email</h3>
          <h3 style={{ width: "10%" }}>Telefone</h3>
          <h3 style={{ width: "16%" }}>Data Nascimento</h3>
          <h3 style={{ width: "7%" }}>Editar</h3>
          <h3 style={{ width: "7%" }}>Excluir</h3>
        </div>
      </div>
      {users.map((user, index) => (
        <UsersRow
          // key={user.id}
          key={`${index + 1} - key`}
          name={user.name}
          phone={user.phone}
          email={user.email}
          cpf={user.cpf}
          birth_date={user.birth_date}
          // id={user.id}
          id={index}
        />
      ))}
      <button onClick={() => history.push("/options")} className="btn btn-prev">
        <p>Voltar</p>
      </button>
    </>
  );
}
