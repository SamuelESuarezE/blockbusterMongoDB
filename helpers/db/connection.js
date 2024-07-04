import { MongoClient } from "mongodb";

class Connect {
    static instance;
    // mongodb://mongo:MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL@monorail.proxy.rlwy.net:44048
    db;
    #host;
    user;
    #password;
    #dbName;
    #cluster;
    client;


    static async getInstance({host, user, password, dbName, cluster}={host: 'mongodb://', user: 'mongo', password: 'MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL', dbName: "blockbuster",cluster: "monorail.proxy.rlwy.net:44048"}) {
        if (!Connect.instance) {
            Connect.instance = new Connect();
            Connect.instance.#initialize(host, user, password, dbName, cluster);
            console.log("Connection initialized successfully")
            Connect.instance.db = await Connect.instance.#getDB();
        }
        return Connect.instance;
    }

    #initialize(host, user, password, dbName, cluster) {
        Connect.instance.#host = host;
        Connect.instance.user = user;
        Connect.instance.#password = password;
        Connect.instance.#dbName = dbName;
        Connect.instance.#cluster = cluster;
    }
    
    async #getDB() {
        // mongodb+srv://samuelsuarezgm:mWJPXQMW06Gcq4UQ@cluster0.bujivll.mongodb.net/
        let url = `${this.#host}${this.user}:${this.#password}@${this.#cluster}`;
        console.log("URL: " + url);
        Connect.instance.client = new MongoClient(url);
        await Connect.instance.client.connect();
        console.log("Connected");
        return Connect.instance.client.db(this.#dbName);
    }
}


// Usage
// const {db, client} = await Connect.getInstance()

// const movies = await db.collection("movie").find().toArray();
// console.log(movies);
// await client.close()
// const movies2 = await db.collection("movie").find().toArray();
// console.log(movies2);