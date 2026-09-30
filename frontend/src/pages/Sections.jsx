import { useEffect, useState } from "react";

function Sections() {
  const [sections, setSections] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

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
  // CARREGAR AO ABRIR A PÁGINA
  // =========================

  useEffect(() => {
    fetchSections();
  }, []);

  // =========================
  // CRIAR SECTION
  // =========================

  const handleCreate = async () => {
    if (!name.trim()) {
      alert("Digite o nome da section.");
      return;
    }

    try {
      const response = await fetch(`${API}/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar section");
      }

      setName("");

      fetchSections();

      alert("Section criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar section.");
    }
  };

  // =========================
  // COMEÇAR EDIÇÃO
  // =========================

  const handleEdit = (section) => {
    setEditingId(section.id);
    setEditName(section.name);
  };

  // =========================
  // SALVAR EDIÇÃO
  // =========================

  const handleUpdate = async () => {
    if (!editName.trim()) {
      alert("Digite o nome da section.");
      return;
    }

    try {
      const response = await fetch(`${API}/sections/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: editName,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar section");
      }

      setEditingId(null);
      setEditName("");

      fetchSections();

      alert("Section atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar section.");
    }
  };

  // =========================
  // EXCLUIR SECTION
  // =========================

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta section?"
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(`${API}/sections/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir section");
      }

      fetchSections();

      alert("Section excluída com sucesso!");
    } catch (error) {
      console.error(error);
      alert(
        "Não foi possível excluir a section. Verifique se existem termos relacionados a ela."
      );
    }
  };

  return (
    <div>
      <h1>Gerenciar Sections</h1>

      {/* =========================
          CRIAR SECTION
      ========================= */}

      <div>
        <h2>Nova Section</h2>

        <input
          type="text"
          placeholder="Nome da section"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleCreate}>
          Criar Section
        </button>
      </div>

      <hr />

      {/* =========================
          LISTA DE SECTIONS
      ========================= */}

      <h2>Sections cadastradas</h2>

      {sections.length === 0 ? (
        <p>Nenhuma section cadastrada.</p>
      ) : (
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              {editingId === section.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />

                  <button onClick={handleUpdate}>
                    Salvar
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditName("");
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <strong>{section.name}</strong>

                  <button onClick={() => handleEdit(section)}>
                    Editar
                  </button>

                  <button onClick={() => handleDelete(section.id)}>
                    Excluir
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sections;