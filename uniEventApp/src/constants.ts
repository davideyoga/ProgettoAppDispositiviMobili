export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'localhost:8080/api'; //mettere indirizzo locale in caso di test su telefono
// per tony 192.168.1.2:8080/api

export const URL = {
    // LOGIN: URL_BASE + "/login",
    // LOGOUT: URL_BASE + "/logout",
    // UPDATE_PROFILO: URL_BASE + "/utente/updateprofilo",
    // NOTIZIE: URL_BASE + "/notizie",
    // INSEGNAMENTI: URL_BASE + "/insegnamenti",
    // APPELLI: URL_BASE + "/appelli"

    HOT_EVENT: URL_BASE + "/event/hot",
    EVENTS: URL_BASE + "/event/all",
    EVENT: URL_BASE + "/event",
    CITIES: URL_BASE + "/event/city",
    CATEGORIES: URL_BASE + "/category/all",
    BASE_SEARCH: URL_BASE + "/event/baseSearch",
    GET_USER_CREATED_EVENT: URL_BASE + "/user/userCreatedEvent",
    GET_EVENT_CREATED_BY_USER: URL_BASE + "/event/EventCreatedByUser",
    IMAGE: URL_BASE + '/event/image',
    LOGIN: URL_BASE + '/user/login',
    ADVANCE_SEARCH: URL_BASE + '/event/advanceSearch',
    REGISTER: URL_BASE + '/user/register'


}

export const LINGUA = 'lingua';

export const EVENTO = 'evento';

export const X_AUTH = "X-Auth";

export const AUTH_TOKEN = "auth-token";

export const UTENTE_STORAGE = "utente";
