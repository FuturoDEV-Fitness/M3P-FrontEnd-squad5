import PropTypes from "prop-types";
import styles from "./index.module.css";
import Button from "@mui/material/Button";

export const ButtonComponent = ({
  variant,
  type,
  disabled,
  onClick,
  preset,
  text,
}) => {
  const buttonStyle = {
    backgroundColor: preset === "delete" ? "var(--error)" : "var(--success)",
    color: "var(--text)",
  };

  return (
    <div className={styles.buttonGroup}>
      <Button
        className={styles.newButton}
        variant={variant}
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={buttonStyle}
      >
        {text}
      </Button>
    </div>
  );
};

ButtonComponent.propTypes = {
  variant: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  preset: PropTypes.string,
  text: PropTypes.string.isRequired,
};

ButtonComponent.defaultProps = {
  disabled: false,
  preset: "default",
};
