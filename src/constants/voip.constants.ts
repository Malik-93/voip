export const DATABASE_MODELS = {
    COMPANY: {
        MODEL_NAME: 'Company',
        MODEL_SCHEMA_NAME: 'Companies',
    },
    USER: {
        MODEL_NAME: 'User',
        MODEL_SCHEMA_NAME: 'Users',
    },
    CHAT: {
        MODEL_NAME: 'Chat',
        MODEL_SCHEMA_NAME: 'Chats',
    },
    ISSUES: {
        MODEL_NAME: 'Issue',
        MODEL_SCHEMA_NAME: 'Issues',
    }
}
export const REGEX = {
    EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    NAME: /[\S\s]+[\S]+/,
    PASSWORD: /[\S\s]+[\S]+/
}

export const CODES = {
    // ref => https://www.w3.org/Protocols/HTTP/HTRESP.html
    API: {
        // 2xx
        STATUS_SUCCESS: 200,
        STATUS_RECORD_CREATED: 201,
        STATUS_ACCEPTED: 202,
        STATUS_PARTIAL_INFO: 203,
        STATUS_NO_RESPONSE: 204,
        // 4xx
        STATUS_BAD_REQUEST: 400,
        STATUS_UN_AUTHORIZED: 401,
        STATUS_PAYMENT_REQUIRED: 402,
        STATUS_FORBIDDEN: 403,
        STATUS_NOT_FOUND: 404,
        // 5xx
        STATUS_INTERNAL_SERVER_ERROR: 500,
        STATUS_NOT_IMPLEMENTED: 501,
        STATUS_SERVICE_TEMP_OVERLOADED: 502,
        STATUS_GATEWAY_TIMEOUT: 503,
    },
    MONGO: {
        DUPLICATE_KEY_VALUE: 11000
    }
}
export const MESSAGES = {
    API_RESPONSE: {
        SUCCESS: "Success",
        INFO: "Info",
        ERROR: "Ooops! something went wrong!!",
        UN_AUTH: "An authorization token is required!",

    }
}

export const MULTER_DIR: string = 'uploads';

export const SOCKET_EVENTS = {
    INIT_NEW_CHAT: "INIT_NEW_CHAT",
    SEND_MESSAGE: "SEND_MESSAGE",
}
