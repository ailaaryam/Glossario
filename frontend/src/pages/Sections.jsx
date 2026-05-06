import { useEffect, useState } from "react";

function Sections() {
  const [sections, setSections] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  //-----------BUSCAR------------
  const fetchSections = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/sections");
    const data = await response.json();
    setSections(data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  //------------CRIAR-----------
  const handleCreate = async () => {
    await fetch("http://127.0.0.1:8000/api/sections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setName("");
    fetchSections();
  };

  //---------DELETAR-------------
  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/sections/${id}`, {
      method: "DELETE",
    });
  
    fetchSections();
  };

  //----------EDITAR-------------
  const handleEdit = (section) => {
    setEditingId(section.id);
    setEditName(section.name);
  };

  //----- SALVAR EDIÇÃO-----------
  const handleUpdate = async () => {
    await fetch(`http://127.0.0.1:8000/api/sections/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editName }),
    });
  
    setEditingId(null);
    setEditName("");
    fetchSections();
  };

  return (
    <div>
      <h1>Sections</h1>

      <input
        placeholder="Nome da section"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

      <button onClick={handleCreate}>Criar</button>

      <ul>
      {sections.map((section) => (
          <li key={section.id}>
      {editingId === section.id ? (
      <a>
        <input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <button onClick={handleUpdate}>Salvar</button>
      </a>
    ) : (
      <a>
        {section.name}
        <button onClick={() => handleEdit(section)}>Editar</button>
        <button onClick={() => handleDelete(section.id)}>Excluir</button>
      </a>
    )}
  </li>
))}
      </ul>
    </div>
  );
}

export default Sections;