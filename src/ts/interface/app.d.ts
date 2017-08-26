interface IMgs{
    success(mensagem:string);
    info(mensagem:string);
    warning(mensagem:string);
    danger(mensagem:string);
}

interface IServicePlatform{
    Salvar(model:IModelPlatform):Promise<string>
    getPlatforms():Promise<Array<IPlatform>>,
    getPlan(plano:string):Promise<Array<IPlanoWifi | IPlanoAparelho>>
}

interface IModel{
    model():IModelPlatform;
}