namespace APPWZ {
    function UtilHelpers() {

        return {
            searchItemId: searchItemId
        };

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

           
    }

    angular
        .module("AppWooza")
        .factory("UtilHelpers", UtilHelpers);
}