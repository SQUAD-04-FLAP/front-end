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
            color: "blue",
          }}
        >
          Página Cadastro
        </h1>

          </div>
        </MainTemplate>
    );
}