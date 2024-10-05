import { UsuariosContext } from '../../context/UsuariosContext';
import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import { GetID, Delete } from '../../services/Locais'
import { ButtonComponent } from '../../components/Button'
import { getLocalStorage } from '../../helper/LocalStorageInstance'
import { AuthContext } from '../../context/AuthContext';


function PaginaLista() {
    // LocaisContext??? 
    const { isLogged, logout } = useContext(AuthContext)
    // const [isLogged, setIsLogged] = useState(false);
    const [locais, setLocais] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
     
        const fetchLocaisID = async () => {

            const token = getLocalStorage('token');
            if (!token) { //token.data.token???
                logout()
                console.log("texto: usuário não autenticado");
                navigate('/login');
                return
            }
            try {
                const response = await GetID(token.id);//jwtDecoded.id???
                setLocais(response.data);
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar locais do usuário:", error);
                setLoading(false);
            }
        };

        fetchLocaisID();
    }, []);//[navigate]???



    function goToEditLocal(local_id) {
        navigate(`/cadastro/${local_id}`);
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

                    <div className={styles.cardsContainer}>
                        {locais.map((local, index) => (
                            <div key={local.id}>
                                <CardLista key={index} listalocais={local} />
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div >

    )
}

export default PaginaLista;