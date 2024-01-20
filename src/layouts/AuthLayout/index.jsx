import { Outlet } from "react-router-dom"
import styles from "./style.module.scss"

const AuthLayout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftSide}>
        <div></div>
        <div className={styles.logoBlock}>
          <h1 className={styles.logoTitle}>BOT<span className={styles.logoTitleGreen}>m.</span></h1>
          <p className={styles.logoSubtitle}>This is Admin Panel.</p>
        </div>

        <div className={styles.subtitleBlock}>© Soliq Servis. Все права защищены</div>

      </div>
      <div className={styles.rightSide}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
