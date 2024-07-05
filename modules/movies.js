import { Connection } from "../helpers/db/connection.js";

export class Movie extends Connection {
  static instanceMovie;
  db;

  constructor() {
    if (!Movie.instanceMovie) {
      super();
      this.db = this.client.db(this.getDbName);
      this.collection = this.db.collection("movie");
      Movie.instanceMovie = this;
      return Movie.instanceMovie;
    }
    return Movie.instanceMovie;
  }

  destructor() {
    Connection.instanceConnection = undefined;
    Movie.instanceMovie = undefined;
  }
  // 1. **Contar el numero total de copias de DVD disponibles en todos los registros:**

  async getSumTotalCopiesDVD() {
    await this.client.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$format" },
        { $match: { "format.name": "dvd" } },
        {
          $group: {
            _id: null,
            totalCopiesDVD: { $sum: "$format.copies" },
          },
        },
      ])
      .toArray();

    await this.client.close();
    return data[0].totalCopiesDVD;
  }

  // 6. **Listar todos los generos de peli­culas distintos:**
  async getDistinctGenres() {
    await this.client.connect();
    const data = await this.collection.distinct("genre");
    await this.client.close();
    return data;
  }

  // 7. **Encontrar peli­culas donde el actor con id 1 haya participado:**
  // 20. **Encontrar todas las peli­culas en las que el actor con id 2 haya participado:**
  async getMoviesByActorId({ id } = { id: 1 }) {
    await this.client.connect();
    const data = await this.collection
      .find({ "character.id_actor": id })
      .project({ name: true })
      .toArray();
    await this.client.close();
    return data;
  }

  // 8. **Calcular el valor total de todas las copias de DVD disponibles:**

  async getTotalValueOfDVDCopies() {
    await this.client.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$format" },
        { $match: { "format.name": "dvd" } },
        {
          $group: {
            _id: null,
            total_valor: {
              $sum: { $multiply: ["$format.value", "$format.copies"] },
            },
          },
        },
      ])
      .toArray();
    await this.client.close();
    return data[0].total_valor;
  }

  // 9. **Encontrar todas las peli­culas en las que John Doe ha actuado:**

  async getAllMoviesByActorName({ actorName } = { actorName: "John Doe" }) {
    await this.client.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$character" },
        {
          $lookup: {
            from: "actor",
            localField: "character.id_actor",
            foreignField: "id_actor",
            as: "character.id_actor",
          },
        },
        { $unwind: "$character.id_actor" },
        { $match: { "character.id_actor.full_name": "John Doe" } },
        { $project: { name: 1 } },
      ])
      .toArray();
    await this.client.close();
    return data;
  }

  // 13. **Encontrar todas las pel­culas en las que participan actores principales:**

  async getMoviesWithMainActors() {
    await this.client.connect();
    const data = await this.collection
      .find({ "character.rol": "principal" })
      .project({ name: true })
      .toArray();
    await this.client.close();
    return data;
  }

  // 14. **Encontrar el numero total de premios que se han otorgado en todas las peliculas:**

  async getTotalNumPrizesOnAllMovies() {
    await this.client.connect();
    const data = await this.collection
      .aggregate([
        {
          $unwind: "$character",
        },
        {
          $lookup: {
            from: "actor",
            localField: "character.id_actor",
            foreignField: "id_actor",
            as: "character.id_actor",
          },
        },
        {
          $unwind: "$character.id_actor",
        },
        {
          $group: {
            _id: null,
            totalNumPrizes: {
              $sum: { $size: "$character.id_actor.awards" },
            },
          },
        },
      ])
      .toArray();
    await this.client.close();
    return data[0].totalNumPrizes;
  }

  // 15. **Encontrar todas las peli­culas en las que John Doe ha actuado y que estan en formato Blu-ray:**

  async getAllMoviesWithJohnDoeAndBluray() {
    await this.client.connect();
    const data = await this.collection
      .aggregate([
        { $unwind: "$character" },
        {
          $lookup: {
            from: "actor",
            localField: "character.id_actor",
            foreignField: "id_actor",
            as: "character.id_actor",
          },
        },
        { $unwind: "$character.id_actor" },
        {
          $match: {
            "character.id_actor.full_name": "John Doe",
            "format.name": "Bluray",
          },
        },
        {
          $project: { name: 1 },
        },
      ])
      .toArray();
    await this.client.close();
    return data;
  }

  // 16. **Encontrar todas las pelÃ­culas de ciencia ficcion que tengan al actor con id 3:**

  async getMoviesByScienceFictionActorId({ id } = { id: 3 }) {
    await this.client.connect()
    const data =  await this.collection.find({genre: "Ciencia Ficción", "character.id_actor": 3}).toArray()
    await this.client.close()
    return data
  }

  // 17. **Encontrar la peli­cula con mas copias disponibles en formato DVD:**

  async getMovieWithMostDVDCopies() {
    await this.client.connect()
    const data =  await this.collection.aggregate([
      {
        $unwind: '$format'
      },
      {
        $match: {
          "format.name": 'dvd'
        }
      },
      {
        $sort: {
          "format.copies": -1
        }
      },
      {
        $limit: 1
      }
    ]).toArray()
    await this.client.close()
    return data[0].name
  }

  // 19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

  async getTotalValueOfAllCopiesBluray() {
    await this.client.connect()
    const data = await this.collection.aggregate([
      {
        $unwind: "$format"
      },
      {
        $match: {
          "format.name":'Bluray'
        }
      },
      {
        $set: {
          total_valor_copias: {$multiply: ["$format.value","$format.copies"]}
        }
      },
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: "$total_valor_copias"
          }
        }
      }
    ]).toArray()
    await this.client.close()
    return data[0].totalValue
  }


}
