import { FilterQuery, Query } from "mongoose";


class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    // creating constructor
    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    // search method
    search(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find(
                {
                    $or: searchableFields?.map((field) => (
                        { [field]: { $regex: searchTerm, $options: 'i' } }
                    ) as FilterQuery<T>)
                }
            )
        }
        return this;
    }


    // filter method
    filter() {
        const queryObj = { ...this.query };

        // exclude fields
        const excludedFields = ["searchTerm", "sort", "minPrice", "maxPrice"];
        // delete the excluded fields from new object
        excludedFields.forEach((el) => delete queryObj[el])

        const priceFilter: Record<string, unknown> = {}
        // checking if there is minPrice or maxPrice added in the query
        if (this.query.minPrice) {
            priceFilter.$gte = Number(this.query.minPrice);
        }
        if (this.query.maxPrice) {
            priceFilter.$lte = Number(this.query.maxPrice);
        }

        // if minPrice and maxPrice added, then adding the 'price' object to the new queryObj
        if (Object.keys(priceFilter).length > 0) {
            queryObj["price"] = priceFilter;
        }

        // finding based on filters
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)

        return this;
    }


    // sorting method
    sort() {
        const sort = this?.query?.sort || '-createdAt';

        if (sort) {
            this.modelQuery = this.modelQuery.sort(sort as string);
        }

        return this;
    }
}


export default QueryBuilder;