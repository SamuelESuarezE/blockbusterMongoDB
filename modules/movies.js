import { Connect } from "../helpers/db/connection.js";

export class Movie extends Connect{
    static instance;
    db;
    
    constructor() {
        super();
        this.db = this.client.db(this.getDbName);
        this.collection = this.db.collection('movie');
        if (!Movie.instance) {
            Movie.instance = this;
            return this;
        }
        return Movie.instance;
    }


    // 1. **Contar el numero total de copias de DVD disponibles en todos los registros:**

    async getSumTotalCopiesDVD() {
        await this.reConnect();
        const data = await this.collection.aggregate(   [
            {$unwind: '$format'},
            {$match: {"format.name": 'dvd'}},
            {$group: {
                _id: null,
                totalCopiesDVD: {$sum: "$format.copies"}
             }}
          ]).toArray();
        
        await this.client.close();
        return data[0].totalCopiesDVD;
    }



}