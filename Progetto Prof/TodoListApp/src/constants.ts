export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api/' : 'http://localhost:8080/todolist/api/';

export const URL = {
    USERS: {
        SIGNUP: "users/",
        LOGIN: "login/",
        LOGOUT: "logout/",
        UPDATE: "users/"
    },
    
    TASKS: {
        CREATE: "tasks/",
        GETALL: "tasks/",
        GET: "tasks/",
        EDIT: "tasks/",
        DELETE: "tasks/",
        ORDER: "order/"
    }
}

export const STORAGE_KEYS = {
    USER: "todolist_user"
}