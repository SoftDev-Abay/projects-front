import "./Tasks.scss";
import TaskCard from "../components/TaskCard";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import TaskModal from "../modals/TaskModal";
import { useCallback, useState } from "react";
import CreateTaskModal from "../modals/CreateTaskModal";
import { DragDropContext } from "react-beautiful-dnd";
import TasksColumn from "../components/TasksColumn";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import EditTaskModal from "../modals/EditTaskModal";

const Tasks = () => {
  const { user } = useAuthContext();
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [userTasks, setUserTasks] = useState([]);

  const [tasksReady, setTasksReady] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksNeedsReview, setTasksNeedsReview] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  const TaskModalHandlier = (value) => {
    setIsOpenTaskModal(value);
    console.log(isOpenTaskModal);
  };
  const [isOpenCreateTaskModal, setIsOpenCreateTaskModal] = useState(false);
  const CreateTaskModalHandlier = (value) => {
    setIsOpenCreateTaskModal(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setStatusTasks();
  }, [userTasks]);

  const setStatusTasks = () => {
    setTasksReady(userTasks.filter((task) => task.status === "ready"));
    setTasksInProgress(
      userTasks.filter((task) => task.status === "in-progress")
    );
    setTasksNeedsReview(
      userTasks.filter((task) => task.status === "needs-review")
    );
    setTasksDone(userTasks.filter((task) => task.status === "done"));
  };

  const fetchData = async () => {
    try {
      const result = await fetch(`http://localhost:5555/task/user/${user._id}`);
      const data = await result.json();
      await setUserTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      const result = await fetch(
        `http://localhost:5555/task/status/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await result.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (destination == null) return;

    if (source.droppableId === destination.droppableId) return;

    // find task being dragged
    const task = userTasks.find((task) => task._id == draggableId);

    // remove from source array
    switch (source.droppableId) {
      case "ready":
        let updatedTasksReady = tasksReady.filter(
          (task) => task._id != draggableId
        );
        setTasksReady(updatedTasksReady);
        break;
      case "in-progress":
        let updatedTasksInProgress = tasksInProgress.filter(
          (task) => task._id != draggableId
        );
        setTasksInProgress(updatedTasksInProgress);
        break;
      case "needs-review":
        let updatedTasksNeedsReview = tasksNeedsReview.filter(
          (task) => task._id != draggableId
        );
        setTasksNeedsReview(updatedTasksNeedsReview);
        break;
      case "done":
        let updatedTasksDone = tasksDone.filter(
          (task) => task._id != draggableId
        );
        setTasksDone(updatedTasksDone);
        break;
      default:
        break;
    }

    // add to destination array
    switch (destination.droppableId) {
      case "ready":
        let updatedTasksReady = [...tasksReady];
        updatedTasksReady.splice(destination.index, 0, task);
        setTasksReady(updatedTasksReady);
        break;
      case "in-progress":
        let updatedTasksInProgress = [...tasksInProgress];
        updatedTasksInProgress.splice(destination.index, 0, task);
        setTasksInProgress(updatedTasksInProgress);
        break;
      case "needs-review":
        let updatedTasksNeedsReview = [...tasksNeedsReview];
        updatedTasksNeedsReview.splice(destination.index, 0, task);
        setTasksNeedsReview(updatedTasksNeedsReview);
        break;
      case "done":
        let updatedTasksDone = [...tasksDone];
        updatedTasksDone.splice(destination.index, 0, task);
        setTasksDone(updatedTasksDone);
        break;
      default:
        break;
    }

    if (source.droppableId !== destination.droppableId) {
      updateTaskStatus(draggableId, destination.droppableId);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await fetch(`http://localhost:5555/task/${taskId}`, {
        method: "DELETE",
      });

      const data = await result.json();

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpenTaskModal &&
        (isOpenTaskModal.task_user_role === "owner" ? (
          <EditTaskModal
            isOpen={isOpenTaskModal}
            modalHandlier={TaskModalHandlier}
            handleDeleteTask={handleDeleteTask}
          />
        ) : (
          <TaskModal
            isOpen={isOpenTaskModal._id}
            modalHandlier={TaskModalHandlier}
          />
        ))}
      <CreateTaskModal
        isOpen={isOpenCreateTaskModal}
        modalHandlier={CreateTaskModalHandlier}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <section className="section-tasks">
          <div className="section-tasks-header">
            <h1>Tasks</h1>
            <FaPlus
              className="icon"
              onClick={() => {
                CreateTaskModalHandlier(true);
              }}
            />
          </div>
          <div className="tasks-container">
            <TasksColumn
              status="Ready"
              tasks={tasksReady}
              id="ready"
              modalHandlier={TaskModalHandlier}
            />
            <TasksColumn
              status="In progress"
              tasks={tasksInProgress}
              id="in-progress"
              modalHandlier={TaskModalHandlier}
            />
            <TasksColumn
              status="Review"
              tasks={tasksNeedsReview}
              id="needs-review"
              modalHandlier={TaskModalHandlier}
            />
            <TasksColumn
              status="Done"
              tasks={tasksDone}
              id="done"
              modalHandlier={TaskModalHandlier}
            />
          </div>
        </section>
      </DragDropContext>
    </>
  );
};

export default Tasks;
