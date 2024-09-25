import { axiosInstance } from "../helper/axiosInstance";
import { setLocalStorage } from "../helper/LocalStorageInstance"

export const lerUsuarios = async () => {
    try {
        const data = await axiosInstance
            .get("/usuarios")
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("Erro durante a requisição: ", error);
            });
        return data;
    } catch (error) {
        console.log("Erro ao buscar usuários: ", error);
    }
};
// Função verificar CPF 
//porém é feita pelo backend agora!!!
//   export const buscarCpf = async (novoUsuario) => {
//     try {
//       const { data } = await axiosInstance.get("usuarios");
//       const cpfExistente = data.some(user => user.cpf === novoUsuario.cpf);

//       if (cpfExistente) {
//         alert("CPF já cadastrado. Por favor, insira um CPF único.");
//       } else {
//         await cadastrarUsuario(novoUsuario);
//       }
//     } catch (error) {
//       console.log("Erro ao verificar CPF: ", error);
//       alert("Erro ao buscar usuários.");
//     }
//   };

// Função para buscar um usuário pelo ID


export const lerUsuariosPorId = async (id) => {
    try {
        const response = await axiosInstance.get(`/usuarios/${id}`);
        return response.data;
        
    } catch (error) {
        console.error("Erro ao buscar usuário por ID:", error);
        throw error;
    }
};

export const procurarUsuario = async (email, senha) => {
    try {
        const response = await axiosInstance.post('/login', {
            email,
            senha,
        });
        const { token, id } = response.data;
        setLocalStorage('token', token)


        return { token, id }; 
    } catch (error) {
        if (error.response) {
            
            console.error("Erro no login:", error.response.data.mensagem);
            throw new Error(error.response.data.mensagem);
        } else {
           
            console.error("Erro ao realizar a solicitação:", error.message);
            throw new Error("Erro ao realizar a solicitação.");
        }
    }
};

// Função para cadastrar um novo usuário
export const cadastrarUsuario = async (novoUsuario) => {
    await axiosInstance
        .post(`/users`, novoUsuario
      
    )
        .then(() => {
            return "Usuário cadastrado com sucesso";
        })
        .catch((err) => {
            console.log("err: ", err.response.data);
            console.log(`Erro ao cadastrar: ${err.response.data.message}`);
        });
};

// Função para deletar um usuário pelo ID
export const deletarUsuario = async (id) => {
    try {
        await axiosInstance.delete(`usuarios/${id}`);
        return "Usuário removido com sucesso";
    } catch (error) {
        console.log("Erro ao deletar usuário: ", error);
    }
};

// Função para editar os dados de um usuário
export const editarUsuario = async (id, dadosUsuario) => {
    try {
        await axiosInstance.put(`usuarios/${id}`, dadosUsuario);
        alert("Usuário atualizado com sucesso!");
        await lerUsuarios(); //Atualiza a lista de usuários???
    } catch (error) {
        console.log("Erro ao atualizar usuário: ", error);
        alert("Erro ao atualizar usuário!");
    }
};