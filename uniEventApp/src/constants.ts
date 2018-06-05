export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8080/api';

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

}

export const LINGUA = 'lingua';

export const EVENTO = 'evento';

export const X_AUTH = "X-Auth";
