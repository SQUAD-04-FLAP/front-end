import MainTemplate from "../../templates/MainTemplate";

export function Home() {
    return(
        <MainTemplate>
          <div className="flex justify-center items-center h-screen">
             <h1 className="text-4xl font-bold">Página principal</h1>
          </div>
        </MainTemplate>
    );
}