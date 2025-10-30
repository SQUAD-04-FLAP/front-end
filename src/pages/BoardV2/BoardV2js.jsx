// //BoardV2js.jsx
// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import { Column } from "../../components/Column";
// import { CardModal } from "../../components/CardModal";
// import { DragDropContext } from "@hello-pangea/dnd";

// //const SERVER_URL = "http://localhost:3000";
// const SERVER_URL = "https://api.flapkanban.top";

// export default function BoardV2() {
//   const [columns, setColumns] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [room] = useState("sala1");

//   const socketRef = useRef(null);
//   const emitTimer = useRef(undefined);

//   useEffect(() => {
//     const socket = io(SERVER_URL);
//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("Conectado:", socket.id);
//       socket.emit("joinRoom", room, (board) => {
//         setColumns(board.columns || []);
//       });
//     });

//     socket.on("project", (proj) => {
//       // console.log("projeto:", proj);
//       setColumns(proj.columns || []);
//     });

//     return () => {
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [room]);

//   const handleCardClick = (task) => {
//     setSelectedTask(task);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//   };

//   const handleDragEnd = (result) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     if (
//       source.droppableId === destination.droppableId &&
//       source.index === destination.index
//     )
//       return;

//     setColumns((prevColumns) => {
//       const newColumns = prevColumns.map((col) => ({
//         ...col,
//         tasks: [...col.tasks],
//       }));

//      const sourceCol = newColumns.find((c) => c.id === source.droppableId);
//      const destCol = newColumns.find((c) => c.id === destination.droppableId);

//       if (!sourceCol || !destCol) {
//         console.warn("Coluna não encontrada:", source.droppableId, destination.droppableId);
//         return;
//       }


//       const [movedCard] = sourceCol.tasks.splice(source.index, 1);
//       destCol.tasks.splice(destination.index, 0, movedCard);

//       // const newBoard: Board = { columns: newColumns };
//       // emitUpdate(newBoard);

//       const newProj = { columns: newColumns };
//       emitUpdate(newProj);

//       return newColumns;
//     });
//   };

//   function emitUpdate(newProj) {
//     if (!socketRef.current) return;
//     if (emitTimer.current) window.clearTimeout(emitTimer.current);
//     emitTimer.current = window.setTimeout(() => {
//       socketRef.current?.emit("updateProject", { room, project: newProj });
//     }, 300);
//   }

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
//       <main className="px-6 py-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
//             Quadro Kanban
//           </h1>

//           <div className="flex items-center gap-2">
//             <button className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition">
//               Filtrar
//             </button>
//             <button className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200/70 dark:hover:bg-gray-700 transition">
//               Ordenar
//             </button>
//           </div>
//         </div>

//         <DragDropContext onDragEnd={handleDragEnd}>
//           <div className="overflow-x-auto">
//             <div className="flex gap-4 min-w-max pb-4">
//               {columns.map((column) => (
//                 <Column
//                   key={column.id}
//                   data={column}
//                   onCardClick={handleCardClick}
//                 />
//               ))}
//             </div>
//           </div>
//         </DragDropContext>
//       </main>

//       <CardModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         task={selectedTask}
//       />
//     </section>
//   );
// }
