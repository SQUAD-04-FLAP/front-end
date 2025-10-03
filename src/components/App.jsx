import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "../provider/AuthProvider";
import { MainRouter } from "../routers/MainRouter";
import { MessagesContainer } from "./MessagesContainer";
import { SectorProvider } from "../provider/SectorProvider";

function App() {
  return (
    <SectorProvider>
    <AuthProvider>
      <MessagesContainer>
          <MainRouter />
      </MessagesContainer>
    </AuthProvider>
    </SectorProvider>
  )
}

export default App;