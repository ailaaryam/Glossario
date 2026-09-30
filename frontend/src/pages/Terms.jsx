import { useEffect, useState } from "react";

function Terms() {
  const [terms, setTerms] = useState([]);
  const [sections, setSections] = useState([]);

  // Campos para criar
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [sectionId, setSectionId] = useState("");

  // Campos para editar
  const [editingId, setEditingId] = useState(null);
  const [editTerm, setEditTerm] = useState("");
  const [editDefinition, setEditDefinition] = useState("");
  const [editExample, setEditExample] = useState("");
  const [editSectionId, setEditSectionId] = useState("");

  const API = "http://127.0.0.1:8000/api";

  // =========================
  // BUSCAR SECTIONS
  // =========================

  const fetchSections = async () => {
    try {
      const response = await fetch(`${API}/sections`);

      if (!response.ok) {
        throw new Error("Erro ao buscar sections");
      }

      const data = await response.json();

      setSections(data);
    } catch (error) {
      console.error(error);
      alert("Não foi possível carregar as sections.");
    }
  };

  // =========================
  // BUSCAR TERMS
  // =========================

  const fetchTerms = async () => {
    try {
      const response = await fetch(`${API}/terms`);

      if (!response.ok) {
        throw new Error("Erro ao buscar termos");
      }

      const data = await response.json();

      setTerms(data);
    } catch (error) {
      console.error(error);
      alert("Não foi possível carregar os termos.");
    }
  };

  // =========================
  // CARREGAR AO ABRIR
  // =========================

  useEffect(() => {
    fetchSections();
    fetchTerms();
  }, []);

  // =========================
  // CRIAR TERMO
  // =========================

  const handleCreate = async () => {
    if (!term.trim()) {
      alert("Digite o termo.");
      return;
    }

    if (!definition.trim()) {
      alert("Digite a definição.");
      return;
    }

    if (!sectionId) {
      alert("Selecione uma section.");
      return;
    }

    try {
      const response = await fetch(`${API}/terms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          term: term,
          definition: definition,
          example: example,
          section_id: sectionId,

          // Por enquanto estamos usando o administrador 1.
          // Depois vamos pegar o ID do administrador logado.
          created_by: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar termo");
      }

      setTerm("");
      setDefinition("");
      setExample("");
      setSectionId("");

      fetchTerms();

      alert("Termo criado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar termo.");
    }
  };

  // =========================
  // COMEÇAR EDIÇÃO
  // =========================

  const handleEdit = (t) => {
    setEditingId(t.id);
    setEditTerm(t.term);
    setEditDefinition(t.definition);
    setEditExample(t.example);
    setEditSectionId(t.section_id);
  };

  // =========================
  // SALVAR EDIÇÃO
  // =========================

  const handleUpdate = async () => {
    if (!editTerm.trim()) {
      alert("Digite o termo.");
      return;
    }

    if (!editDefinition.trim()) {
      alert("Digite a definição.");
      return;
    }

    if (!editSectionId) {
      alert("Selecione uma section.");
      return;
    }

    try {
      const response = await fetch(`${API}/terms/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          term: editTerm,
          definition: editDefinition,
          example: editExample,
          section_id: editSectionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar termo");
      }

      setEditingId(null);

      setEditTerm("");
      setEditDefinition("");
      setEditExample("");
      setEditSectionId("");

      fetchTerms();

      alert("Termo atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar termo.");
    }
  };

  // =========================
  // EXCLUIR TERMO
  // =========================

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este termo?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(`${API}/terms/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir termo");
      }

      fetchTerms();

      alert("Termo excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir termo.");
    }
  };

  // =========================
  // ENCONTRAR NOME DA SECTION
  // =========================

  const getSectionName = (sectionId) => {
    const section = sections.find(
      (s) => Number(s.id) === Number(sectionId)
    );

    return section ? section.name : "Sem section";
  };

  return (
    <div>
      <h1>Gerenciar Termos</h1>

      {/* =================================
          FORMULÁRIO DE CRIAÇÃO
      ================================= */}

      <div>
        <h2>Novo Termo</h2>

        <div>
          <input
            type="text"
            placeholder="Termo"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Definição"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Exemplo"
            value={example}
            onChange={(e) => setExample(e.target.value)}
          />
        </div>

        <div>
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
          >
            <option value="">
              Selecione uma section
            </option>

            {sections.map((section) => (
              <option
                key={section.id}
                value={section.id}
              >
                {section.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleCreate}>
          Criar Termo
        </button>
      </div>

      <hr />

      {/* =================================
          LISTA DE TERMOS
      ================================= */}

      <h2>Termos cadastrados</h2>

      {terms.length === 0 ? (
        <p>Nenhum termo cadastrado.</p>
      ) : (
        <ul>
          {terms.map((t) => (
            <li key={t.id}>
              {editingId === t.id ? (
                <>
                  {/* =========================
                      FORMULÁRIO DE EDIÇÃO
                  ========================= */}

                  <div>
                    <input
                      type="text"
                      value={editTerm}
                      onChange={(e) =>
                        setEditTerm(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={editDefinition}
                      onChange={(e) =>
                        setEditDefinition(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={editExample}
                      onChange={(e) =>
                        setEditExample(e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <select
                      value={editSectionId}
                      onChange={(e) =>
                        setEditSectionId(e.target.value)
                      }
                    >
                      <option value="">
                        Selecione uma section
                      </option>

                      {sections.map((section) => (
                        <option
                          key={section.id}
                          value={section.id}
                        >
                          {section.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button onClick={handleUpdate}>
                    Salvar
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {/* =========================
                      EXIBIÇÃO DO TERMO
                  ========================= */}

                  <strong>{t.term}</strong>

                  <br />

                  <span>
                    <strong>Definição:</strong>{" "}
                    {t.definition}
                  </span>

                  <br />

                  <span>
                    <strong>Exemplo:</strong>{" "}
                    {t.example || "Nenhum exemplo informado"}
                  </span>

                  <br />

                  <span>
                    <strong>Section:</strong>{" "}
                    {getSectionName(t.section_id)}
                  </span>

                  <br />

                  <button onClick={() => handleEdit(t)}>
                    Editar
                  </button>

                  <button onClick={() => handleDelete(t.id)}>
                    Excluir
                  </button>
                </>
              )}

              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Terms;