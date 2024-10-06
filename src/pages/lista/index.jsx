import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import { GetID } from '../../services/Locais'
import { getLocalStorage } from '../../helper/LocalStorageInstance'
import { AuthContext } from '../../context/AuthContext';
import { LocaisContext } from '../../context/LocaisContext';

function PaginaLista() {
   const {usuarioLocais, setUsuarioLocais} = useContext(LocaisContext)
    const { isLogged, logout } = useContext(AuthContext)
    // const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
    const fetchLocaisID = async () => {

        try {
            const token = getLocalStorage('token');
            if (!token) { //token.data.token???
                logout()
                console.log("texto: usuário não autenticado");
                navigate('/login');
                return
            }

            const response = await GetID(token.id);//jwtDecoded.id???
            setUsuarioLocais(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Erro ao buscar locais do usuário:", error);
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchLocaisID();
    }, []);


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
                        {usuarioLocais.map((local, index) => (
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