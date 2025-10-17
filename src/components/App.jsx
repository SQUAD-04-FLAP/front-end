import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "../provider/AuthProvider";
import { MainRouter } from "../routers/MainRouter";
import { MessagesContainer } from "./MessagesContainer";
import { SectorProvider } from "../provider/SectorProvider";
import { FramerProvider } from '../provider/FramerProvider';
import { FilterProvider } from '../provider/FilterProvider';
import { TaskProvider } from '../provider/TaskProvider';
import { KanbanMemberProvider } from '../provider/KanbanMemberProvider';
import { CommentsProvider } from "../provider/CommentsProvider";

function App() {
  return (
    <CommentsProvider>
    <KanbanMemberProvider>
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
    </KanbanMemberProvider>
    </CommentsProvider>
  )
}

export default App;