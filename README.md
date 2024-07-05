# Consultas Blockbuster

1. **Contar el numero total de copias de DVD disponibles en todos los registros:**

   ```bash
   db.movie.aggregate([
     {$unwind: '$format'},
     {$match: {"format.name": 'dvd'}},
     {$group: {
         _id: null,
         total_copias_dvd: {$sum: "$format.copies"}
      }}
   ])
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```bash
   db.actor.find({ "awards.name": "Oscar Award" }, {full_name: 1})
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```bash
   db.actor.aggregate([
            { $addFields: {    awardQuantity: {$size: '$awards'} }}, {$project: {_id: 0,full_name: 1, awardQuantity: 1}}
    ])
   ```

4. **Obtener todos los actores nacidos despues de 1980:**

   ```bash
   db.actor.find({'date_of_birth': {$gt: '1980-12-31'}})
   ```

5. **Encontrar el actor con mas premios:**

   ```bash
   db.actor.aggregate([
     {$set:{
         awardsQuantity:{
           $size: '$awards'}}},
     {$sort:{'awardsQuantity': -1}},
     {$project:{full_name: 1,}},
     {$limit: 1}
   ])
   ```

6. **Listar todos los generos de peli­culas distintos:**

   ```bash
   db.movie.distinct('genre')
   ```

7. **Encontrar peli­culas donde el actor con id 1 haya participado:**

   ```bash
   db.movie.find({"character.id_actor": id})
   ```
   
8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```bash
   db.movie.aggregate([
     {$unwind: '$format'},
     {$match: 
         {'format.name': 'dvd'}},
     {$group: {
       _id: null,
       total_valor: {$multiply: ['$format.value', '$format.copies']}}}
   ])
   ```

9. **Encontrar todas las peli­culas en las que John Doe ha actuado:**

   ```bash
   db.movie.aggregate([
     {$unwind: '$character'},
     {$lookup: {
         from: 'actor',
         localField: "character.id_actor",
         foreignField: 'id_actor',
         as: "character.id_actor"}
     },
     {$unwind: '$character.id_actor'},
     {$match: {'character.id_actor.full_name': "John Doe"}
     },
    {$project: {name: 1}}
   ])
   ```

10. **Encontrar el numero total de actores en la base de datos:**

    ```bash
    db.actor.countDocuments()
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```bash
    db.actor.aggregate([
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
    ])
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```bash
    db.actor.aggregate([
    	{
    	  $match: {
    	    "social_media.instagram": {$exists: true}
    	  }
    	}
    ])
    ```

13. **Encontrar todas las pel­culas en las que participan actores principales:**

    ```bash
    db.actor.find({"character.rol": 'principal'})
    ```

14. **Encontrar el numero total de premios que se han otorgado en todas las peliculas:**

    ```bash
    db.movie.aggregate([
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
            $sum: {$size: '$character.id_actor.awards'}
          },
    
        },
      },
    
     
    ])
    ```

15. **Encontrar todas las peli­culas en las que John Doe ha actuado y que estan en formato Blu-ray:**

    ```bash
    db.movie.aggregate([
      {$unwind: '$character'},
      {$lookup: {
          from: 'actor',
          localField: "character.id_actor",
          foreignField: 'id_actor',
          as: "character.id_actor"}
      },
      {$unwind: '$character.id_actor'},
      {$match: {'character.id_actor.full_name': "John Doe", "format.name": 'Bluray'}
      },
    ])
    ```

16. **Encontrar todas las pelÃ­culas de ciencia ficcion que tengan al actor con id 3:**

    ```bash
    [
        {
            $match: {genre: 'Ciencia FicciÃ³n', 'character.id_actor': 3}
        }
    ]
    ```

17. **Encontrar la peli­cula con mas copias disponibles en formato DVD:**

    ```bash
    [
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
    ]
    ```

18. **Encontrar todos los actores que han ganado premios despues de 2015:**

    ```bash
    [
      {
        $match: {
          	"awards.year": {$gt: 2015}
        }
      },
      {
        $project: {
          full_name: 1
        }
      }
    ]
    ```

19. **Calcular el valor total de todas las copias de Blu-ray disponibles:**

    ```bash
    [  
     {$unwind: '$format'},
     {$match:{'format.name': 'Bluray'}},
     {$group: { Â   
         _id: null, Â   
         total_valor: {$sum: '$format.value'}}}
    ]
    ```

20. **Encontrar todas las peli­culas en las que el actor con id 2 haya participado:**

    ```bash
    [
      {$match: {"character.id_actor": 2}}
    ]
    ```
