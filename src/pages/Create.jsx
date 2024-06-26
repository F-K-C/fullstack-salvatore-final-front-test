import { toast } from "react-toastify"
import { Api } from "../api/api"
import { useNavigate } from "react-router-dom"
import './Create.css'

export default function Create() {
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        const celular = {
            nome: event.target.nome.value,
            imagem: event.target.imagem.value,
            preco: event.target.preco.value
        }
        const apiUrl = Api.aparelho.create()

        const response = await Api.buildApiPostRequest(apiUrl, celular)

        if(response.ok){
            toast.success('Celular adicionado com sucesso!')
            navigate('/')
        }else{
            const body = await response.json()
            toast.error('Erro ao adicionar celular: ' + body.error)
        }
    }

    return (
        <div>
            <h1> Adicionar Celular</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome do aparelho:</label> <br />
                    <input type="text" id="nome" name="nome" placeholder="Insira o nome" />
                </div>
                <div>
                    <label htmlFor="imagem">Link da imagem (URL)*: </label> <br />
                    <input type="text" id="imagem" name="imagem" placeholder="Insira a URL da imagem" />
                </div>
                <div>
                    <label htmlFor="preco">Preço R$ (Opcional):</label> <br />
                    <input type="text" id="preco" name="preco" placeholder="Insira o preço do aparelho" />
                </div>

                <div>
                    <button type="submit">Adicionar</button>
                    <button type="reset">Reiniciar</button>
                </div>
            </form>
        </div>
    )
}