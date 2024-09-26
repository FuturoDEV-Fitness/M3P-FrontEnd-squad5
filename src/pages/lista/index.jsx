import { useContext, useEffect, useState } from 'react';
import styles from "./index.module.css"
import { useNavigate } from 'react-router-dom';
import { LocaisContext } from '../../context/LocaisContext'
import { GetLocations} from '../../services/Locais'
import {ButtonComponent} from '../../components/Button'


export const PaginaLocais = ()=> {
    const { locais, } = useContext(LocaisContext)
    const navigate = useNavigate();

    //aqui ou no context?
    useEffect(() => {
        GetLocations(); //extrair dados???
        //setLocais()
    }, []);

    function voltarCadastroLocais(id) {
        setCadLocal(false)
        setMostrarEdicaoLocal(true)
        navigate(`/cadastro/${id}`);
    }


    return (

        <div className={styles.container}>
            <div className={styles.textual}>
                <h1>Lista de Locais X</h1>
            </div>
            <div className={styles.containerRenderizador}>

                {/* era pra ser um CARD */}
                {Array.isArray(locais) && locais.length > 0 ? (
                    locais.map(local => (
                        <div key={local.id}>
                            <h3>{local.nomeLocal}</h3>
                            <p>{local.descricaoLocal}</p>
                           
                            <p>Práticas permitidas: {local.praticasEsportivas.map((praticaX, index) => (
                                <span key={index}>{index == local.praticasEsportivas.length - 1 ? `${" "}${praticaX}.` :
                                    `${" "}${praticaX},`}
                                </span>
                            ))}</p>
                             <ButtonComponent 
                            onClick={() => voltarCadastroLocais(local.id)}
                            text='Editar'/>
                            <ButtonComponent 
                            onClick={() => apagarLocal(local.id)}
                            text='Excluir'/>
                        </div>
                    ))
                ) : (
                    <p>Nenhum local disponível</p>
                )}
            </div>
        </div >
    )
}
;