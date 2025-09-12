import MainTemplate from "../../templates/MainTemplate";
import { useNavigate } from "react-router-dom";

export function Home() {

  const navigate = useNavigate();

    return(
        <MainTemplate>
          <div>
             <h1>Página principal</h1>

        <h1
          onClick={() => navigate("/tela-teste")}
          style={{
            cursor: "pointer",
            color: "blue", // só pra indicar que é clicável, pode remover se quiser
          }}
        >
          Página Cadastro
        </h1>

          </div>
        </MainTemplate>
    );
}