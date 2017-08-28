/**
 * Funções que serão reaproveitadas durante a vida do app
 */
namespace APPWZ {
    function UtilHelpers() {

        return {
            searchItemId: searchItemId,
            getIcon: getIcon
        };

        /**
         * Busca em uma lista o item pesquisado pela id. 
         * Algoritmo usa divisão da lista para uma busca mais rápida
         * @param lista {Array} - Lista com todos os items
         * @param idItem {any} - id do item a ser buscado
         */
        function searchItemId(lista: Array<any>, idItem: number) {
            lista.sort((a, b) => {
                return a.id > b.id;
            });

            let listaTamanho = lista.length,
                meioLista = Math.round(listaTamanho / 2),
                posiStart = idItem <= meioLista ? 0 : meioLista;

            for (let i = posiStart; i < idItem; i++) {
                if (lista[i].id === idItem) {
                    return lista[i];
                }
            }
            return null;
        }

        /**
         * Função retorna o icone para o tipo especificado
         * @param idclass classe de complementação para o icone
         */
        function getIcon(idclass:string):string{
            let icon = {
                computador: "laptop",
                tablet: "tablet",
                wifi: "connection"
            }
            return icon[idclass.toLowerCase().replace(/\-/g, '')];            
        }

           
    }

    angular
        .module("AppWooza")
        .factory("UtilHelpers", UtilHelpers);
}