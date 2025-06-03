import React, { useEffect, useState } from "react";
import { fetchInitialData } from "../utils/api";
import "../styles/Form.css";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#0d6efd"
    className="bi bi-pencil-square"
    viewBox="0 0 16 16"
  >
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1 1a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647.646-.647a.5.5 0 0 1 .708 0z" />
    <path d="M13.496 3.207L6.854 9.854a.5.5 0 0 1-.233.131l-2.5.5a.5.5 0 0 1-.606-.606l.5-2.5a.5.5 0 0 1 .131-.233l6.642-6.647a.5.5 0 0 1 .708.708l-6.647 6.647-.354.354-.5 2.5 2.5-.5.354-.354 6.647-6.647a.5.5 0 0 1 .708.708z" />
    <path
      fillRule="evenodd"
      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-7a.5.5 0 0 0-1 0v7a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
    />
  </svg>
);

const cnpjCpf = "04361421000107";

const FormComponent = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editCliente, setEditCliente] = useState<any | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    nome?: string;
    fone?: string;
  }>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInitialData(cnpjCpf);
        setClientes(data.clientes || []);
      } catch (err) {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleEditClick = (cliente: any) => {
    setEditCliente(cliente);
    setEditValues({ ...cliente });
    setFormErrors({});
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
    setFormErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { nome?: string; fone?: string } = {};
    if (!editValues.nome || editValues.nome.trim() === "") {
      errors.nome = "Nome é obrigatório";
    }
    if (!editValues.fone || editValues.fone.trim() === "") {
      errors.fone = "Telefone é obrigatório";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    console.log("Dados editados:", editValues);
    setShowModal(false);
    setSuccessMsg("Dados atualizados com sucesso!");
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  if (loading) return <div className="text-center mt-4">Carregando...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  return (
    <div className="container min-vh-100 bg-light py- position-relative">
      {successMsg && (
        <div
          className="alert alert-success position-fixed"
          style={{
            top: 24,
            right: 24,
            zIndex: 2000,
            minWidth: 260,
            maxWidth: 350,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          }}
        >
          {successMsg}
        </div>
      )}

      <h1 className="display-5 fw-bold mb-4 text-center">Clientes</h1>
      {clientes.length === 0 ? (
        <div className="text-center text-secondary mb-4">
          Nenhum cliente encontrado.
        </div>
      ) : (
        <ul className="list-group">
          {clientes.map((cliente, idx) => (
            <li
              key={idx}
              className="list-group-item mb-3 d-flex justify-content-between align-items-start"
            >
              <div>
                <div className="fw-bold">{cliente.nome || "Sem nome"}</div>
                <div className="small text-secondary">
                  Código: {cliente.codigo}
                </div>
                <div className="small">CNPJ: {cliente.cnpj}</div>
                <div className="small">
                  Endereço: {cliente.endereco}, {cliente.numero} -{" "}
                  {cliente.bairro}
                </div>
                <div className="small">
                  Cidade: {cliente.cidade} - {cliente.estado}
                </div>
                <div className="small">
                  E-mail: {cliente.email || "Não informado"}
                </div>
                <div className="small">
                  Telefone: {cliente.fone || "Não informado"}
                </div>
              </div>
              <button
                className="btn btn-link p-0 ms-3"
                title="Editar"
                onClick={() => handleEditClick(cliente)}
              >
                <EditIcon />
              </button>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
          tabIndex={-1}
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Editar Cliente</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div
                  className="modal-body"
                  style={{ maxHeight: "70vh", overflowY: "auto" }}
                >
                  {editCliente &&
                    Object.entries(editCliente).map(([key, value]) => (
                      <div className="mb-3" key={key}>
                        <label className="form-label text-capitalize">
                          {key}
                        </label>
                        <input
                          type="text"
                          className={`form-control${
                            formErrors[key as "nome" | "fone"]
                              ? " is-invalid"
                              : ""
                          }`}
                          name={key}
                          value={editValues[key]}
                          onChange={handleInputChange}
                        />
                        {formErrors[key as "nome" | "fone"] && (
                          <div className="invalid-feedback">
                            {formErrors[key as "nome" | "fone"]}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: 1040 }}
        ></div>
      )}
    </div>
  );
};

export default FormComponent;
