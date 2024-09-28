import styles from "./index.module.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.titleSpan}>
        {" "}
        Todos direitos reservados para &copy;G.M.J.Exercises TM
      </span>
      <span className={styles.footerLinks}>
        <a
          href="https://github.com/glautonOsorio"
          target="blank"
          className={styles.gitLink}
        >
          <GitHubIcon /> Glauton
        </a>
        <a
          href="https://github.com/marcelovntr"
          target="blank"
          className={styles.gitLink}
        >
          <GitHubIcon /> Marcelo
        </a>
        <a
          href="https://github.com/jayemelBR"
          target="blank"
          className={styles.gitLink}
        >
          <GitHubIcon /> Jorge
        </a>
      </span>
    </footer>
  );
}

export default Footer;
