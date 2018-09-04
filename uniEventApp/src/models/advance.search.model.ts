import { Category } from "./category.model";
import { List } from "lodash";

export interface AdvanceSearchForm {

    minPrice: number;

    maxPrice: number;

    category: String;

    serviceList: List<String>;

}