package it.univaq.disim.mobile.unievent.business.web;

public class Login {

    private String token;
    private String email;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Login{" +
                "token='" + token + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Login login = (Login) o;

        if (getToken() != null ? !getToken().equals(login.getToken()) : login.getToken() != null) return false;
        return getEmail() != null ? getEmail().equals(login.getEmail()) : login.getEmail() == null;
    }

    @Override
    public int hashCode() {
        int result = getToken() != null ? getToken().hashCode() : 0;
        result = 31 * result + (getEmail() != null ? getEmail().hashCode() : 0);
        return result;
    }
}
