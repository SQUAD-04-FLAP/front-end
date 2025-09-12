import { TelaTeste as TelaTesteComp } from "../../components/TelaTeste";
import MainTemplate from "../../templates/MainTemplate";

export default function TelaTeste() {
  return (
    <MainTemplate>
      <div className="p-4">
        <h1>Página de Teste</h1>
        <TelaTesteComp />
      </div>
    </MainTemplate>
  );
}