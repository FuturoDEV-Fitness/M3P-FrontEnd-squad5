import PropTypes from "prop-types";
import styles from "./index.module.css";

export const SelectComponent = ({
  register,
  error,
  helperText,
  label,
  option,
  id,
}) => {
  const selectClass = error ? styles.danger : styles.select;

  return (
    <div className={styles.selectGroup}>
      <label
        className={`${styles.selectLabel} ${error && styles.danger}`}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className={`${styles.formSelect} ${error && styles.danger}`}
        id={id}
        {...register}
      >
        {option &&
          option.map((item, index) => (
            <option className={selectClass} key={index} value={item?.value}>
              {item?.label}
            </option>
          ))}
      </select>
      {error && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

SelectComponent.propTypes = {
  register: PropTypes.any,
  option: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

SelectComponent.defaultProps = {
  error: false,
  helperText: "",
  option: [],
};
