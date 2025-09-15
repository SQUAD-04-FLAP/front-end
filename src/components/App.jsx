import { AuthProvider } from "../provider/AuthProvider";
import { MainRouter } from "../routers/MainRouter";

function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  )
}

export default App;