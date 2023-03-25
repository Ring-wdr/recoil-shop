import { HTMLAttributes } from "react";
import styles from "./unit.module.css";

interface UnitProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  isFloating?: boolean;
  onDelete?: () => void;
  completed?: boolean;
}

export const Unit = ({
  label = "",
  isFloating,
  onClick,
  onDelete,
  completed,
  ...props
}: UnitProps) => {
  return (
    <div
      className={[
        styles.unit,
        completed ? styles.completed : "",
        isFloating ? styles.floating : "",
      ].join(" ")}
      draggable
      {...props}
    >
      {label}
      <button onClick={onClick}>완료</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};
