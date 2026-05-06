import { useEffect, useState } from "react";

function Terms() {
  const [terms, setTerms] = useState([]);
  const [sections, setSections] = useState([]);

  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [audio, setAudio] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTerm, setEditTerm] = useState("");
  const [editDefinition, setEditDefinition] = useState("");
  const [editExample, setEditExample] = useState("");
  const [editSectionId, setEditSectionId] = useState("");
  const [editAudio, setEditAudio] = useState("");

  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");

  const fetchSections = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/sections");
    const data = await res.json();
    setSections(data);
  };

  const fetchTerms = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/terms");
    const data = await res.json();
    setTerms(data);
  };

  useEffect(() => {
    fetchSections();
    fetchTerms();
  }, []);

  // ----------DELETAR----------
  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/terms/${id}`, {
      method: "DELETE",
    });

    fetchTerms();
  };

  // ----------EDITAR-------------
  const handleEdit = (t) => {
    setEditingId(t.id);
    setEditTerm(t.term);
    setEditDefinition(t.definition);
    setEditExample(t.example);
    setEditSectionId(t.section_id);
    setEditAudio(t.audio || "");
  };

  // -------SALVAR EDIÇÃO----------
  const handleUpdate = async () => {
    await fetch(`http://127.0.0.1:8000/api/terms/${editingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        term: editTerm,
        definition: editDefinition,
        example: editExample,
        section_id: editSectionId,
        audio: editAudio,
      }),
    });

    setEditingId(null);
    fetchTerms();
  };

  //----------CRIAR-------------
  const handleCreate = async () => {
    const formData = new FormData();
  
    formData.append("term", term);
    formData.append("definition", definition);
    formData.append("example", example);
    formData.append("section_id", sectionId);
    formData.append("created_by", 1);
  
    if (audioFile) {
      formData.append("audio_file", audioFile);
    }
  
    if (audioUrl) {
      formData.append("audio_url", audioUrl);
    }
  
    await fetch("http://127.0.0.1:8000/api/terms", {
      method: "POST",
      body: formData,
    });
  
    fetchTerms();
  };

  return (
    <div>
      <h1>Terms</h1>

      <input placeholder="Termo" value={term} onChange={(e) => setTerm(e.target.value)} />
      <input placeholder="Definição" value={definition} onChange={(e) => setDefinition(e.target.value)} />
      <input placeholder="Exemplo" value={example} onChange={(e) => setExample(e.target.value)} />

      <input
        type="file"
        onChange={(e) => setAudioFile(e.target.files[0])}/>

      <input
        placeholder="Ou URL do áudio"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}/>

      <select value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
        <option value="">Selecione uma section</option>
        {sections.map((section) => (
          <option key={section.id} value={section.id}>
            {section.name}
          </option>
        ))}
      </select>

      <button onClick={handleCreate}>Criar Termo</button>

      <ul>
        {terms.map((t) => (
          <li key={t.id}>
            {editingId === t.id ? (
              <>
                <input value={editTerm} onChange={(e) => setEditTerm(e.target.value)} />
                <input value={editDefinition} onChange={(e) => setEditDefinition(e.target.value)} />
                <input value={editExample} onChange={(e) => setEditExample(e.target.value)} />

                <input
                  value={editAudio}
                  onChange={(e) => setEditAudio(e.target.value)}
                  placeholder="Áudio"
                />

                <select value={editSectionId} onChange={(e) => setEditSectionId(e.target.value)}>
                  {sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <button onClick={handleUpdate}>Salvar</button>
              </>
            ) : (
              <>
                <strong>{t.term}</strong> - {t.definition} <br />
                <em>{t.section?.name}</em>

                <br />

{/*------------------------Audio------------------------ */}
                {t.audio && (
  <>
    <audio controls>
      <source
        src={
          t.audio.startsWith("http")
            ? t.audio
            : `http://127.0.0.1:8000/storage/${t.audio}`
        }
      />
    </audio>

    <br />

    <a
      href={
        t.audio.startsWith("http")
          ? t.audio
          : `http://127.0.0.1:8000/storage/${t.audio}`
      }
      download
    >
      Baixar áudio
    </a>
  </>
)}

                <br />

                <button onClick={() => handleEdit(t)}>Editar</button>
                <button onClick={() => handleDelete(t.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Terms;