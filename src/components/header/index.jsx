import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ListIcon from "@mui/icons-material/List";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

function Header() {
  const { isLogged, logout } = useContext(AuthContext);
  const { showRegister, showLogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const toRegister = () => {
    showRegister();
    navigate("/login");
  };
  const toLogin = () => {
    showLogin();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1 className={styles.titleH1}>G.M.J</h1>
        <p className={styles.titleP}>
          <SportsGymnasticsIcon fontSize="large" />
        </p>
        <span className={styles.titleSpan}>Exercises</span>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          DashBoard <DashboardIcon />
        </Link>

        {isLogged ? (
          <>
            <Link to="/lista" className={styles.link}>
              Seus Locais <ListIcon />
            </Link>

            <Link to="/cadastro" className={styles.link}>
              Cadastrar Locais <AddIcon />
            </Link>

            <Link to="/configuracao" className={styles.link}>
              Configuração <SettingsIcon />
            </Link>
            <Link onClick={logout} className={styles.link}>
              Logout <LogoutIcon />
            </Link>
          </>
        ) : (
          <>
            <Link onClick={toLogin} className={styles.link}>
              Fazer Login <LoginIcon fontSize="large" />
            </Link>
            <Link onClick={toRegister} className={styles.link}>
              Criar Nova Conta <AppRegistrationIcon fontSize="large" />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
