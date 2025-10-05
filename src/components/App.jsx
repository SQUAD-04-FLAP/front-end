import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "../provider/AuthProvider";
import { MainRouter } from "../routers/MainRouter";
import { MessagesContainer } from "./MessagesContainer";
import { SectorProvider } from "../provider/SectorProvider";
import { FramerProvider } from '../provider/FramerProvider';

function App() {
  return (
    <FramerProvider>
    <SectorProvider>
    <AuthProvider>
      <MessagesContainer>
          <MainRouter />
      </MessagesContainer>
    </AuthProvider>
    </SectorProvider>
    </FramerProvider>
  )
}

export default App;