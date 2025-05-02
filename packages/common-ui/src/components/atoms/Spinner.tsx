import styles from "./Spinner.module.scss";
export const Spinner = ({ customClass = "" }: { customClass?: string }) => {
  return <div className={styles["loader"] + " " + customClass} />;
};
