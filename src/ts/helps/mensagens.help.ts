/**
 * Recusro para mensagens de notificação sobre os fluxos para o usuário
 */
namespace APPWZ {

    MsgInfos.$inject = [];
    function MsgInfos() {
        var box = $("main");

        return {
            success: _success,
            info: _info,
            warning: _warning,
            danger: _danger
        }

        function _geraEl(tipo, ico, msg) {
            return '<li><p class="alert alert-' + tipo + ' alert-dismissible">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<span class="glyphicon glyphicon-' + ico + '"></span> <strong>' + msg + '</strong>' +
                '</p></li>';
        };

        function _boxMsg() {
            return "<div class='alertSystem'><ul class='list-alert'></ul></div>";
        }

        function _success(msgInput) {
            _disparaAlert(_geraEl("success", "ok-sign", _checkMsg(msgInput)));
        };

        function _info(msgInput) {
            _disparaAlert(_geraEl("info", "info-sign", _checkMsg(msgInput)));
        };

        function _warning(msgInput) {
            _disparaAlert(_geraEl("warning", "alert", _checkMsg(msgInput)));
        };

        function _danger(msgInput) {
            _disparaAlert(_geraEl("danger", "remove-sign", _checkMsg(msgInput)));
        };

        function _disparaAlert(obj) {
            _removerAfterTime(_addAlert(obj));
        };

        function _checkMsg(msg) {
            if (typeof msg === "string") {
                if (msg.match(/^\[.*\]$/) !== null) {
                    return _isStringArray(msg);
                } else if (msg.match(/^\{.*\}$/) !== null) {
                    return _isStringObjeto(msg);
                }
            } else {
                if (angular.isArray(msg)) {
                    return msg.join("<br>");
                } else if (angular.isObject(msg)) {
                    return _isStringObjeto(JSON.stringify(msg));
                }
            }
            return msg;
        };

        function _isStringArray(msg) {
            var arr = JSON.parse(msg);
            return arr.join("<br>");
        };

        function _isStringObjeto(msg) {
            var arrayString = msg.replace(/^\{(.*)\}$/, "$1").split(',');
            return arrayString.join("<br>");
        };

        function _hasAlert() {
            return box.find(".alertSystem").is(":visible");
        };

        function _addAlert(obj) {
            var $tpl = $(obj).attr("id", Date.now()).hide();
            if (!_hasAlert()) {
                box.prepend(_boxMsg());
            }

            return box
                .find(".alertSystem .list-alert")
                .append($tpl)
                .find("li")
                .last()
                .fadeIn();
        };

        function _removerAfterTime(obj) {
            var id = obj.attr("id");
            var temporizer = setTimeout(function () {
                var alert = box.find(".alertSystem").find("#" + id);
                alert.fadeOut("slow", function () {
                    $(this).remove();
                    clearTimeout(temporizer);
                    removeAlertBox();
                });
            }, 6000)
        };

        function removeAlertBox() {
            if (!box.find(".alertSystem").find("li").length) {
                box.find(".alertSystem").empty().remove();
            }
        }


    };

    angular
        .module("AppWooza")
        .factory("MsgInfos", MsgInfos);
}