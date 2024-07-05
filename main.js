import { Actor } from "./modules/actors.js";
import { Movie } from "./modules/movies.js";

let obj;
obj = new Movie();
// console.log(await obj.getSumTotalCopiesDVD()) // 1
// console.log(await obj.getDistinctGenres()); // 6
// console.log(await obj.getMoviesByActorId()); // 7
// console.log(await obj.getTotalValueOfDVDCopies()); // 8
// console.log(await obj.getAllMoviesByActorName()); // 9
// console.log(await obj.getMoviesWithMainActors()); // 13
// console.log(await obj.getTotalNumPrizesOnAllMovies()); // 14
// console.log(await obj.getAllMoviesWithJohnDoeAndBluray()) // 15
// console.log(await obj.getMoviesByScienceFictionActorId()); // 16
// console.log(await obj.getMovieWithMostDVDCopies()); // 17
// console.log(await obj.getTotalValueOfAllCopiesBluray()); 19
// console.log(await obj.getMoviesByActorId({id: 2})) // 20
obj.destructor()


obj = new Actor();
// console.log(await obj.getAllActorsWithOscars()) // 2
// console.log(await obj.getTotalAwardsByActor()) // 3
// console.log(await obj.getActorsBornAfter1980()) // 4;
// console.log(await obj.getActorWithMostAwards()) // 5;
// console.log(await obj.getNumTotalActors()) // 10
// console.log(await obj.getAvgAge()) // 11
// console.log(await obj.getAllActorsWithInstagram());//12
// console.log(await obj.getActorsWonPrizesAfterYear()); // 18
obj.destructor()






