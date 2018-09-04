package it.univaq.disim.mobile.unievent.business;

import java.util.List;

/**
 * @Creator Davide Micarelli
 */
public class AdvanceSearch {


    private int minPrice;
    private int maxPrice;

    private String category;

    private List<String> serviceList;

    @Override
    public String toString() {
        return "AdvanceSearch{" +
                "minPrice=" + minPrice +
                ", maxPrice=" + maxPrice +
                ", category='" + category + '\'' +
                ", serviceList=" + serviceList +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AdvanceSearch that = (AdvanceSearch) o;

        if (getMinPrice() != that.getMinPrice()) return false;
        if (getMaxPrice() != that.getMaxPrice()) return false;
        if (getCategory() != null ? !getCategory().equals(that.getCategory()) : that.getCategory() != null)
            return false;
        return getServiceList() != null ? getServiceList().equals(that.getServiceList()) : that.getServiceList() == null;
    }

    @Override
    public int hashCode() {
        int result = getMinPrice();
        result = 31 * result + getMaxPrice();
        result = 31 * result + (getCategory() != null ? getCategory().hashCode() : 0);
        result = 31 * result + (getServiceList() != null ? getServiceList().hashCode() : 0);
        return result;
    }

    public int getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(int minPrice) {
        this.minPrice = minPrice;
    }

    public int getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(int maxPrice) {
        this.maxPrice = maxPrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List <String> getServiceList() {
        return serviceList;
    }

    public void setServiceList(List <String> serviceList) {
        this.serviceList = serviceList;
    }
}
