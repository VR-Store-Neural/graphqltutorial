const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');



// const directorsJson = [
//     { "name": "Quentin Tarantino", "age": 55 }, 63ebac86815fcbb516a85678 // 63ecfbb00063897f7c4974cb
//     { "name": "Michael Radford", "age": 72 }, 63ebaf1e815fcbb516a8567a // 63ecfc0e0063897f7c4974cc
//     { "name": "James McTeigue", "age": 51 }, 63ebafe8815fcbb516a8567c // 63ecfc330063897f7c4974cd
//     { "name": "Guy Ritchie", "age": 50 }, 63ebb029815fcbb516a8567d // 63ecfc5c0063897f7c4974ce
// ];

// const moviesJson = [
//     { "name": "Pulp Fiction", "genre": "Crime", "directorId" : "63ebae5f815fcbb516a85679"},
//     { "name": "1984", "genre": "Sci-Fi", "directorId": "63ebafa4815fcbb516a8567b" },
//     { "name": "V for vendetta", "genre": "Sci-Fi-Thriller", "directorId" : "63ebb075815fcbb516a8567e" },
//     { "name": "Snatch", "genre": "Crime-Comedy", "directorId" : "63ebb0a6815fcbb516a8567f" },
//     { "name": "Reservoir Dogs", "genre": "Crime", "directorId" : "63ebb0d2815fcbb516a85680" },
//     { "name": "The Hateful Eight", "genre": "Crime", "directorId" : "63ebb103815fcbb516a85681" },
//     { "name": "Iglourious Basterds", "genre": "Crime", "directorId" : "63ebb144815fcbb516a85682" },
//     { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "63ebb171815fcbb516a85683" },
// ];

// const movies = [
//     {id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
//     {id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
//     {id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Thriller', directorId: '3' },
//     {id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
//     {id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
//     {id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
//     {id: '7', name: 'Iglourious Basterds', genre: 'Crime', directorId: '1' },
//     {id: '8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4' },
// ];

// const directors = [
//     {id: '1', name: 'Quentin Tarantino', age: 55 },
//     {id: '2', name: 'Michael Radford', age: 72 },
//     {id: '3', name: 'James McTeigue', age: 51 },
//     {id: '4', name: 'Guy Ritchie', age: 50 },
// ];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                // return directors.find(director => director.id == parent.id); 
                return Directors.findById(parent.directorId); 
            }
        }
    }),
});


const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                // return movies.filter(movie => movie.directorId === parent.id); 
                return Movies.find({ directorId: parent.id });
            },
        },
    }),
});


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return movies.find(movie => movie.id == args.id);    
                return Movies.findById(args.id);
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return directors.find(director => director.id == args.id);
                return Directors.findById(args.id);    
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
                resolve(parent, args) {
                    // return movies;
                    return Movies.find({});    
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
                resolve(parent, args) {
                    // return directors; 
                    return Directors.find({});    
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query, 
})