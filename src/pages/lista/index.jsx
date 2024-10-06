import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import { GetID } from '../../services/Locais'
import { getLocalStorage } from '../../helper/LocalStorageInstance'
import { AuthContext } from '../../context/AuthContext';
import { LocaisContext } from '../../context/LocaisContext';
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import CardLista from '../../components/CardLista';

function PaginaLista() {
    const { usuarioLocais, setUsuarioLocais } = useContext(LocaisContext);
    const { isLogged, logout } = useContext(AuthContext)
    // const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const fetchLocaisID = async () => {

        try {
            console.log("testando");
            const token = getLocalStorage('token');
            if (!token) { 
                logout()
                console.log("texto: usuário não autenticado");
                navigate('/login');
                return
            }
            const jwtDecoded = jwtDecode(token);
            const userId = jwtDecoded.id;
            const response = await GetID(userId);
            if (response && response.status === 200) {
                console.log("Dados:", response.data);
                setUsuarioLocais([response.data]);
                setLoading(false);
            } else {
                toast.error(response.data.mensagem, {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error("Erro ao buscar locais do usuário:", error);
            setLoading(false);
            toast.error(error, {
                position: "top-center",
                theme: "colored",
                autoClose: 2000,
            });
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