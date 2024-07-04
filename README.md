# Consultas Blockbuster

1. **Contar el numero total de copias de DVD disponibles en todos los registros:**

   ```bash
   [
     {$unwind: '$format'},
     {$match: {"format.name": 'dvd'}},
     {$group: {
         _id: null,
         total_copias_dvd: {$sum: "$format.copies"}
      }}
   ]
   ```

2. **Encontrar todos los actores que han ganado premios Oscar:**

   ```bash
   [
     {$match: {"awards.name": 'Oscar Award'}}
   ]
   ```

3. **Encontrar la cantidad total de premios que ha ganado cada actor:**

   ```bash
   [
   	{ $addFields: {    awardQuantity: {$size: '$awards'} }}
   ]
   ```

4. **Obtener todos los actores nacidos despuÃ©s de 1980:**

   ```bash
   [
     {$match: {'date_of_birth': {$gt: '1980-12-31'}}}
   ]
   ```

5. **Encontrar el actor con mas premios:**

   ```bash
   [
     {$set:{
         awardsQuantity:{
           $size: '$awards'}}},
     {$sort:{'awardsQuantity': -1}},
     {$project:{full_name: 1,}},
     {$limit: 1}
   ]
   ```

6. **Listar todos los generos de peli­culas distintos:**

   ```bash
   [
     {$unwind: '$genre'},
     { $group: {_id: '$genre'}}
   ]
   ```

7. **Encontrar peli­culas donde el actor con id 1 haya participado:**

   ```bash
   [
     {$match: {"character.id_actor": 1}}
   ]
   ```
   
8. **Calcular el valor total de todas las copias de DVD disponibles:**

   ```bash
   [
     {$unwind: '$format'},
     {$match: 
         {'format.name': 'dvd'}},
     {$group: {
       _id: null,
       total_valor: {$sum: '$format.value'}}}
   ]
   ```

9. **Encontrar todas las peli­culas en las que John Doe ha actuado:**

   ```bash
   [
     {$unwind: '$character'},
     {$lookup: {
         from: 'actor',
         localField: "character.id_actor",
         foreignField: 'id_actor',
         as: "character.id_actor"}
     },
     {$unwind: '$character.id_actor'},
     {$match: {'character.id_actor.full_name': "John Doe"}
     }
   ]
   ```

10. **Encontrar el numero total de actores en la base de datos:**

    ```bash
    [
      {$count: 'id_actor'}
    ]
    ```

11. **Encontrar la edad promedio de los actores en la base de datos:**

    ```bash
    [
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
    ]
    ```

12. **Encontrar todos los actores que tienen una cuenta de Instagram:**

    ```bash
    [
    	{
    	  $match: {
    	    "social_media.instagram": {$exists: true}
    	  }
    	}
    ]
    ```

13. **Encontrar todas las pelÃ­culas en las que participan actores principales:**

    ```bash
    [
        {
          $match: {
            "character.rol": 'principal'
          }
        }
    ]
    
    ```

14. **Encontrar el numero total de premios que se han otorgado en todas las pelÃ­culas:**

    ```bash
    [
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
    
     
    ]
    ```

15. **Encontrar todas las peli­culas en las que John Doe ha actuado y que estan en formato Blu-ray:**

    ```bash
    [
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
    ]
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
