import { useForm } from "react-hook-form";
import { InputComponent } from "../../Input";
import { ButtonComponent } from "../../Button";
import { checkBoxOptions } from "../../../helper/selectInstance";
import styles from "../index.module.css";
import { GetNominatim, ViaCEP } from "../../../services/Geolocalizador";
import { Store } from "../../../services/Locais";

export const RegisterLocaisComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const getLocation = async () => {
    const cep = getValues("cep");

    if (cep.length === 8) {
      const data = await ViaCEP(cep);
      setValue("endereco", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("cidade", data.localidade);
      setValue("estado", data.estado);
      const latLong = await GetNominatim(
        data.logradouro,
        data.bairro,
        data.localidade,
        data.estado
      );
      setValue("latitude", latLong.latitude);
      setValue("longitude", latLong.longitude);
      console.log(latLong);
    }
  };

  const registerLocal = async (data) => {
    const store = await Store(data);
    console.log(store);
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(registerLocal)}>
        <h1 className={styles.formTitle}>Cadastrar Local</h1>
        <InputComponent
          label="Local:"
          type="text"
          placeholder="Praça XYX"
          register={register("nomeLocal", {
            required: "Necessário o preenchimento",
            maxLength: { value: 100, message: "Máximo de 100 caracteres" },
          })}
          error={errors.nomeLocal}
          errorMessage={errors.nomeLocal?.message}
        />

        <InputComponent
          label="Descrição:"
          type="textarea"
          placeholder="descrição breve"
          register={register("descricaoLocal", {
            required: "Necessária a descrição",
            maxLength: { value: 200, message: "Máximo de 200 caracteres" },
          })}
          error={errors.descricaoLocal}
          errorMessage={errors.descricaoLocal?.message}
        />

        <InputComponent
          label="CEP:"
          type="text"
          placeholder="XXXXXXXX - apenas números"
          register={register("cep", {
            onBlur: getLocation,
            required: "Necessário o preenchimento",
            maxLength: { value: 8, message: "Máximo de 8 caracteres" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Apenas números são permitidos",
            },
          })}
          error={errors.cep}
          errorMessage={errors.cep?.message}
          cep={true}
        />

        <div className={styles.formGrid}>
          <InputComponent
            label="Endereço:"
            type="text"
            placeholder="Nome da rua"
            readOnly={true}
            register={register("endereco", {})}
            error={errors.endereco}
            errorMessage={errors.endereco?.message}
          />

          <InputComponent
            label="Bairro:"
            type="text"
            readOnly={true}
            placeholder="Nome do bairro"
            register={register("bairro", {})}
            error={errors.bairro}
            errorMessage={errors.bairro?.message}
          />

          <InputComponent
            label="Cidade:"
            type="text"
            readOnly={true}
            placeholder="Nome da cidade"
            register={register("cidade", {})}
            error={errors.cidade}
            errorMessage={errors.cidade?.message}
          />

          <InputComponent
            label="Estado:"
            type="text"
            readOnly={true}
            placeholder="(XY) - apenas a sigla"
            register={register("estado", {})}
            error={errors.estado}
            errorMessage={errors.estado?.message}
          />

          <InputComponent
            label="Latitude:"
            type="text"
            placeholder="Exemplo: -27.60782774761622"
            register={register("latitude", {})}
            error={errors.latitude}
            errorMessage={errors.latitude?.message}
          />

          <InputComponent
            label="Longitude:"
            type="text"
            placeholder="Exemplo: -40.60782774761622"
            register={register("longitude", {})}
            error={errors.longitude}
            errorMessage={errors.longitude?.message}
          />
        </div>
        <div className={styles.formGrid}>
          {checkBoxOptions.map((option, index) => (
            <InputComponent
              key={index}
              label={option.label}
              type="checkbox"
              value={option.value}
              register={register("praticasEsportivas")}
            />
          ))}
        </div>
        <ButtonComponent type="submit" text="Cadastrar" variant="success" />
      </form>
    </>
  );
};
