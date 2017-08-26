interface IPlatform{
    sku: string;
    nome: string;
    descricao: string;
}

interface IPlanoWifi{
    sku: string;
    franquia: string;
    valor: string;
    ativo: boolean
}

interface IPlanoAparelho{
    sku: string;
    franquia: string;
    valor: string;
    aparelho: IAparelho;
    ativo: boolean;
}

interface IAparelho{
    nome: string;
    valor: string;
    numeroParcelas: number;
    valorParcela: string;
}

interface IModelPlatform{
    Plataforma: IPlatform;
    Plano: IPlanoAparelho | IPlanoWifi;
    Nome: string;
    Email: string;
    Nascimento: string;
    CPF: string;
    Telefone: string;
}