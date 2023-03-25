import { DragEvent, KeyboardEvent, MouseEvent, useRef, useState } from "react";
import { Container } from "@/components/container";
import { Unit } from "@/components/units";
import styles from "./css/drag.module.css";
import { FileUploadModal } from "@/components/fileUpload";
import { FileModalHandleProps } from "@/components/fileUpload/FileUpload";

// show me css code that floating drag image only moves in parent element

interface TodoType {
  id: number;
  text: string;
  completed: boolean;
  floating?: boolean;
}

const initTodos: TodoType[] = [
  // { id: 1, text: "Do laundry", completed: false },
  // { id: 2, text: "Buy groceries", completed: false },
  // { id: 3, text: "Walk the dog", completed: false },
];

const defaultPreventer = (event: DragEvent<HTMLDivElement>) =>
  event.preventDefault();

export const Drag = () => {
  const [todos, setTodos] = useState<TodoType[]>(initTodos);
  const [draggedTodo, setDraggedTodo] = useState<TodoType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileModalRef = useRef<FileModalHandleProps>(null);

  /** todo 추가 */
  const addTodo = (e?: KeyboardEvent<HTMLElement>) => {
    if (
      !inputRef.current ||
      !inputRef.current.value ||
      (e && e?.nativeEvent.isComposing) ||
      (e && e?.key !== "Enter")
    )
      return;
    const text = inputRef.current.value;
    inputRef.current.value = "";
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: prevTodos.length !== 0 ? prevTodos[prevTodos.length - 1].id + 1 : 1,
        text,
        completed: false,
      },
    ]);
  };
  /** todo 제거 */
  const delTodo = (idx: number) =>
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== idx));

  /** todo 위치 변경 */
  const handleDragStart = (todo: TodoType) => setDraggedTodo(todo);

  const handleDragEnter = (droppedTodo: TodoType) => {
    if (!draggedTodo) return;
    if (draggedTodo.id === droppedTodo.id) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === draggedTodo.id
          ? { ...droppedTodo, floating: undefined }
          : todo.id === droppedTodo.id
          ? { ...draggedTodo, floating: true }
          : todo
      )
    );
  };
  const handleDragEnd = () => {
    if (draggedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.floating ? { ...todo, floating: false } : todo
        )
      );
      setDraggedTodo(null);
    }
  };

  const handleToggleComplete = (Clickedtodo: TodoType) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === Clickedtodo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );

  return (
    <div>
      <div className={styles["input-todo"]}>
        <input ref={inputRef} onKeyDown={addTodo} />
        <button onClick={() => addTodo()}>할일 추가</button>
        <button
          onClick={() => fileModalRef.current?.modal.current?.showModal()}
        >
          모달 테스트
        </button>
      </div>
      <div className={styles.contents}>
        <Container>
          {todos.map((todo) => (
            <Unit
              key={todo.id}
              onDragStart={() => handleDragStart(todo)}
              onDragOver={defaultPreventer}
              onDragEnter={() => handleDragEnter(todo)}
              onDragEnd={handleDragEnd}
              onClick={() => handleToggleComplete(todo)}
              onDelete={() => delTodo(todo.id)}
              completed={todo.completed}
              label={todo.text}
              isFloating={todo.floating}
            />
          ))}
        </Container>
      </div>
      <FileUploadModal ref={fileModalRef} />
    </div>
  );
};
