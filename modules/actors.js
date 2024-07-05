import { Connection } from "../helpers/db/connection.js";

export class Actor extends Connection{
    static instanceActor;
    db;
    
    constructor() {

        if (!Actor.instanceActor) {
            super();
            this.db = this.client.db(this.getDbName);
            this.collection = this.db.collection('actor');
            Actor.instanceActor = this;
            return Actor.instanceActor;
        }

        return Actor.instanceActor;
    }
    
    destructor() {
        Connection.instanceConnection = undefined
        Actor.instanceActor = undefined
    }
    // 2. **Encontrar todos los actores que han ganado premios Oscar:**
    async getAllActorsWithOscars() {
        await this.client.connect();
        const data = await this.collection.find({ "awards.name": "Oscar Award" }).project({full_name: true}).toArray();
        await this.client.close()
        return data;
    }

    // 3. **Encontrar la cantidad total de premios que ha ganado cada actor:**
    async getTotalAwardsByActor() {
        await this.client.connect();
        const data = await this.collection.aggregate([
            { $addFields: {    awardQuantity: {$size: '$awards'} }}, {$project: {full_name: 1, awardQuantity: 1}}
        ]).toArray();
        await this.client.close();
        return data;
    }

    // 4. **Obtener todos los actores nacidos despues de 1980:**
    async getActorsBornAfter1980() {
        await this.client.connect();
        const data = await this.collection.find({'date_of_birth': {$gt: '1980-12-31'}}).project({full_name: 1}).toArray();
        await this.client.close();
        return data;
    }

    // 5. **Encontrar el actor con mas premios:**
    async getActorWithMostAwards() {
        await this.client.connect();
        const data = await this.collection.aggregate([
            {$set:{
                awardsQuantity:{
                  $size: '$awards'}}},
            {$sort:{'awardsQuantity': -1}},
            {$project:{full_name: 1,}},
            {$limit: 1}
          ]).toArray();
        await this.client.close();
        return data;
    }

    // 10. **Encontrar el numero total de actores en la base de datos:**

    async getNumTotalActors() {
        await this.client.connect()
        const data = this.collection.countDocuments()
        return data
    }

    // 11. **Encontrar la edad promedio de los actores en la base de datos:**

    async getAvgAge() {
        await this.client.connect()
        const data = await this.collection.aggregate([
            {
               $addFields: {
                 age: {
                   $dateDiff: {
                     startDate: { $dateFromString: {
                       dateString: '$date_of_birth',
                       format: '%Y-%m-%d'
                     }},
                     endDate: new Date(),
                     unit: "year"
                   }
                 }
               }
             },
             {
               $group: {
                 _id: null,
                 avg_age_actors: {$avg: '$age'}
               }
             }
           ]).toArray()
        await this.client.close()
        return data[0].avg_age_actors
    }

    //12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    async getAllActorsWithInstagram() {
        await this.client.connect()
        const data = await this.collection.aggregate([
            {
              $match: {
                "social_media.instagram": {$exists: true}
              }
            },
            {
                $project: {full_name: true}
            }
        ]).toArray()
        await this.client.close()
        return data
    }

      // 18. **Encontrar todos los actores que han ganado premios despues de 2015:**

      async getActorsWonPrizesAfterYear({year}={year: 2015}) {
        await this.client.connect()
        const data = await this.collection.find({"awards.year": {$gt: year}}).project({full_name: true}).toArray()
        await this.client.close()
        return data
      }

      

}