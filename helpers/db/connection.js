import { MongoClient } from "mongodb";

export class Connection {
    static instanceConnection;
    // mongodb://mongo:MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL@monorail.proxy.rlwy.net:44048

    #host;
    user;
    #password;
    #dbName;
    #cluster;
    client;


    constructor({host, user, password, dbName, cluster}={host: 'mongodb://', user: 'mongo', password: 'MvwjZZrDvXeaTaXAaIVhZLYXQkahfinL', dbName: "blockbuster",cluster: "monorail.proxy.rlwy.net:44048"}) {
        if (!Connection.instanceConnection) {
            this.setHost = host;
            this.user = user;
            this.setPassword = password;
            this.setDbName = dbName;
            this.setCluster = cluster;
            this.#open();
            Connection.instanceConnection = this;
            return Connection.instanceConnection;z

        }

        return Connection.instanceConnection;
        
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

    destructor() {
        Connection.instanceConnection = undefined
    }
    
    async #open() {
        // mongodb+srv://samuelsuarezgm:mWJPXQMW06Gcq4UQ@cluster0.bujivll.mongodb.net/
        let url = `${this.#host}${this.user}:${this.#password}@${this.#cluster}`;
        this.client = new MongoClient(url);
    }
}
