import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "../provider/AuthProvider";
import { MainRouter } from "../routers/MainRouter";
import { MessagesContainer } from "./MessagesContainer";
import { SectorProvider } from "../provider/SectorProvider";
import { FramerProvider } from '../provider/FramerProvider';
import { FilterProvider } from '../provider/FilterProvider';
import { TaskProvider } from '../provider/TaskProvider';

function App() {
  return (
    <TaskProvider>
    <FilterProvider>
    <FramerProvider>
    <SectorProvider>
    <AuthProvider>
      <MessagesContainer>
          <MainRouter />
      </MessagesContainer>
    </AuthProvider>
    </SectorProvider>
    </FramerProvider>
    </FilterProvider>
    </TaskProvider>
  )
}

export default App;