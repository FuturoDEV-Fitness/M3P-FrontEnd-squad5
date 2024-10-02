import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import { GetID, Delete } from '../../services/Locais'
import { ButtonComponent } from '../../components/Button'


function PaginaLocais(local_id) { //<--???
    const { locais, setLocais } = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchLocaisID = async () => {
            try {
                const response = await GetID();;
                setLocais(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar locais do usuário:", error);
                setLoading(false);
            }
        };

        fetchLocaisID();

    }, []);

    function paginaEditarLocais(id) {
        navigate(`/cadastro/${id}`);
    }


    return (

        <div className={styles.container}>
            <div className={styles.textual}>
                <h1>Seus Locais</h1>
            </div>

            <div className={styles.containerRenderizador}> {/* ajustar com o padrão */}
                {loading ? (
                    <p>Carregando locais</p>
                ) : (
                    <>
                        <div className={styles.cardsContainer}>
                            {locais.map((local, index) => (
                                <CardLista key={index} listalocais={local} />
                            ))}
                        </div>
                        <ButtonComponent
                            onClick={() => paginaEditarLocais(locais.id)}
                            text='Editar' />
                        <ButtonComponent
                            onClick={() => Delete(locais.id)}
                            text='Excluir' />
                    </>
                )}

            </div>
        </div>

    )
}
;
export default PaginaLocais