package it.univaq.disim.mobile.unievent.business;

import java.util.Date;

/**
 * @Creator Davide Micarelli
 */
public class BaseSearch {

    String where;
    String what;
    Date when;

    public String getWhere() {
        return where;
    }

    public void setWhere(String where) {
        this.where = where;
    }

    public String getWhat() {
        return what;
    }

    public void setWhat(String what) {
        this.what = what;
    }

    public Date getWhen() {
        return when;
    }

    public void setWhen(Date when) {
        this.when = when;
    }

    @Override
    public String toString() {
        return "BaseSearch{" +
                "where='" + where + '\'' +
                ", what='" + what + '\'' +
                ", when=" + when +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BaseSearch that = (BaseSearch) o;

        if (getWhere() != null ? !getWhere().equals(that.getWhere()) : that.getWhere() != null) return false;
        if (getWhat() != null ? !getWhat().equals(that.getWhat()) : that.getWhat() != null) return false;
        return getWhen() != null ? getWhen().equals(that.getWhen()) : that.getWhen() == null;
    }

    @Override
    public int hashCode() {
        int result = getWhere() != null ? getWhere().hashCode() : 0;
        result = 31 * result + (getWhat() != null ? getWhat().hashCode() : 0);
        result = 31 * result + (getWhen() != null ? getWhen().hashCode() : 0);
        return result;
    }
}
