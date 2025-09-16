import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "../provider/AuthProvider";
import { MainRouter } from "../routers/MainRouter";
import { MessagesContainer } from "./MessagesContainer";

function App() {
  return (
    <AuthProvider>
      <MessagesContainer>
          <MainRouter />
      </MessagesContainer>
    </AuthProvider>
  )
}

export default App;