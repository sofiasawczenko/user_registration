import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Records.module.scss";

import saveIcon from '../../assets/images/saveicon.png';
import editIcon from '../../assets/images/editicon.png';
import deleteIcon from '../../assets/images/deleteicon.png';

function Records() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem('data')) || [];
        const response = await axios.get("https://private-9d65b3-tinnova.apiary-mock.com/users");
        
        // Mescla os dados da API com os dados locais
        const mergedData = [...storedData, ...response.data];
        setData(mergedData);
        localStorage.setItem('data', JSON.stringify(mergedData));
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
    };
    
    fetchData();
  }, []);

  const handleEdit = (id) => {
    const userToEdit = data.find(user => user.id === id);
    setEditingId(id);
    setEditedUser({ ...userToEdit });
  };

  const handleSave = (id) => {
    setData((prevData) => {
      const updatedData = prevData.map((user) =>
        user.id === id ? editedUser : user
      );
      localStorage.setItem('data', JSON.stringify(updatedData));
      return updatedData;
    });
    setEditingId(null);
    setEditedUser(null);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((user) => user.id !== id);
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const handleChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mt-5">
      <h1 className={styles.title}>Usuários <br />Cadastrados</h1>
      <hr className={styles.dashedHr} />

      {data.length > 0 ? (
        <div className="bg-white rounded p-3" style={{ overflow: "auto", maxHeight: "500px" }}>
          <table className="table align-middle">
            <thead className="bg-light">
              <tr>
                <th className="text-secondary">Nome</th>
                <th className="text-secondary">CPF</th>
                <th className="text-secondary">Telefone</th>
                <th className="text-secondary">E-mail</th>
                <th className="text-secondary text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id} className="border-bottom">
                  <td>
                    {editingId === user.id ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editedUser?.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>{user.cpf || "Não informado"}</td>
                  <td>
                    {editingId === user.id ? (
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editedUser?.telefone || ""}
                        onChange={(e) => handleChange("telefone", e.target.value)}
                      />
                    ) : (
                      user.telefone || "(99) 99999-9999"
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        value={editedUser?.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="text-center">
                    {editingId === user.id ? (
                      <button className={styles.IconBtn} onClick={() => handleSave(user.id)} aria-label="Salvar">
                        <img src={saveIcon} alt="Salvar" />
                      </button>
                    ) : (
                      <button className={styles.IconBtn} onClick={() => handleEdit(user.id)} aria-label="Editar">
                        <img src={editIcon} alt="Editar" />
                      </button>
                    )}
                    <button className={styles.IconBtn} onClick={() => handleDelete(user.id)} aria-label="Excluir">
                      <img src={deleteIcon} alt="Excluir" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center">Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
}

export default Records;
