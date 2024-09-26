import PropTypes from "prop-types";
import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import styles from "./index.module.css";

export const InputComponent = ({
  label,
  type,
  id,
  placeholder,
  register,
  error,
  mask,
  readOnly,
  value,
  as,
  onInput,
  errorMessage,
  cep,
  onClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputGroup}>
      {type === "checkbox" && (
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkboxInput}
            type="checkbox"
            value={value}
            onInput={onInput}
            mask={mask}
            as={as}
            readOnly={readOnly}
            id={id}
            placeholder={placeholder}
            {...register}
          />
          {label}
        </label>
      )}

      {type !== "checkbox" && type !== "textarea" && (
        <>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          <div className={styles.inputContainer}>
            <input
              className={`${styles.input} ${error ? styles.error : ""}`}
              onInput={onInput}
              mask={mask}
              as={as}
              defaultValue={value}
              type={showPassword ? "text" : type}
              readOnly={readOnly}
              id={id}
              placeholder={placeholder}
              {...register}
            />
            {type === "password" && (
              <button
                className={styles.icon}
                type="button"
                onClick={handleShowPassword}
              >
                {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            )}
            {cep && (
              <button className={styles.icon} type="button" onClick={onClick}>
                <SearchOutlinedIcon />
              </button>
            )}
            {error && <span className={styles.errorSpan}>{errorMessage}</span>}
          </div>
        </>
      )}

      {type === "textarea" && (
        <>
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
          <textarea
            className={`${styles.textArea} ${error ? styles.error : ""}`}
            readOnly={readOnly}
            id={id}
            placeholder={placeholder}
            {...register}
          />
          {error && <span className={styles.errorSpan}>{errorMessage}</span>}
        </>
      )}
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  error: PropTypes.any,
  errorMessage: PropTypes.any,
  mask: PropTypes.any,
  readOnly: PropTypes.bool,
  as: PropTypes.any,
  onInput: PropTypes.func,
  cep: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.string,
};
