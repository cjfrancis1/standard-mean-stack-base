"use strict";

let helper = {
    template: function (data) {
        if (data.status === 200 && !data.errors) {
            return {
                "status": data.status,
                "recordCount": data.recordCount && typeof data.response === 'object' && data.response.length ? data.response.length : null,
                "response": data.response,
                "errors": []
            };
        } else {
            return {
                "status": data.status,
                "recordCount": null,
                "response": null,
                "errors": data.errors
            };
        }
    }
};

module.exports = helper;