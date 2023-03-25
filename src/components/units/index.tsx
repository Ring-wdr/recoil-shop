import { HTMLAttributes } from "react";
import styles from "./unit.module.css";

interface UnitProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  onDelete?: () => void;
  completed?: boolean;
}

export const Unit = ({
  label = "",
  onClick,
  onDelete,
  completed,
  ...props
}: UnitProps) => {
  return (
    <div
      className={[styles.unit, completed ? styles.completed : ""].join(" ")}
      draggable
      {...props}
    >
      {label}
      <button onClick={onClick}>완료</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};
