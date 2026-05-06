import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Painel Administrativo</h1>

      <button onClick={() => navigate("/sections")}>
        Gerenciar Sections
      </button>

      <button onClick={() => navigate("/terms")}>
        Gerenciar Terms
      </button>
    </div>
  );
}

export default Dashboard;