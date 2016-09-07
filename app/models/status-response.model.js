"use strict";
/**
 * Created by Hienadz on 06.09.16.
 */
var StatusResponse = (function () {
    function StatusResponse(success, message, user, token) {
        this.success = success;
        this.message = message;
        this.user = user;
        this.token = token;
    }
    StatusResponse.create = function (json) {
        return new StatusResponse(json.success, json.message, json.user, json.token);
    };
    return StatusResponse;
}());
exports.StatusResponse = StatusResponse;
//# sourceMappingURL=status-response.model.js.map