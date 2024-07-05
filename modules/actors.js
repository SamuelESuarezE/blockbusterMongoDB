import { Connect } from "../helpers/db/connection.js";

export class Actor extends Connect{
    static instance;
    db;
    
    constructor() {
        super();
        this.db = this.client.db(this.getDbName);
        this.collection = this.db.collection('actor');
        if (!Actor.instance) {
            Actor.instance = this;
            return this;
        }
        return Actor.instance;
    }
    // 2. **Encontrar todos los actores que han ganado premios Oscar:**

    async getAllActorsWithOscars() {
        await this.reConnect();
        const data = await this.collection.find({ "awards.name": "Oscar Award" }).toArray();
        await this.client.close()
        return data;
    }
}