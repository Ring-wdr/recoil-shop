import { HTMLAttributes, ReactNode } from "react";
import styles from "./container.module.css";
interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <div className={styles.dragContainer} {...props}>
      {children}
    </div>
  );
};
