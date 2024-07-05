import { MongoClient } from "mongodb";

export class Connect {
    static instance;
    // mongodb://mongo:MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL@monorail.proxy.rlwy.net:44048

    #host;
    user;
    #password;
    #dbName;
    #cluster;
    client;


    constructor({host, user, password, dbName, cluster}={host: 'mongodb://', user: 'mongo', password: 'MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL', dbName: "blockbuster",cluster: "monorail.proxy.rlwy.net:44048"}) {
        if (!Connect.instance) {
            this.setHost = host;
            this.user = user;
            this.setPassword = password;
            this.setDbName = dbName;
            this.setCluster = cluster;
            this.#open();
            Connect.instance = this;
            return Connect.instance;

        }

        return Connect.instance;
        
    }


    get getHost() {
        return this.#host;
    }

    get getDbName() {
        return this.#dbName;
    }




    set setHost(value) {
        this.#host = value;
    }

    set setDbName(value) {
        this.#dbName = value;
    }

    set setPassword(value) {
        this.#password = value
    }

    set setCluster(value) {
        this.#cluster = value;
    }


    async reConnect() {
        await this.client.connect();
        console.log("Connected successfully")
    }
    
    async #open() {
        // mongodb+srv://samuelsuarezgm:mWJPXQMW06Gcq4UQ@cluster0.bujivll.mongodb.net/
        let url = `${this.#host}${this.user}:${this.#password}@${this.#cluster}`;
        console.log("URL: " + url);
        this.client = new MongoClient(url);
        console.log("Client opened");

    }
}
