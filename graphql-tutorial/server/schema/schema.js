const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const Movies = require('../models/movie');
const Directors = require('../models/director');



// const directorsJson = [
//     { "name": "Quentin Tarantino", "age": 55 }, 63f5e0801fa3040f6327a55f // 63f5e4071fa3040f6327a56b
//     { "name": "Michael Radford", "age": 72 }, 63f5e0991fa3040f6327a560 // 63f5e4211fa3040f6327a56c
//     { "name": "James McTeigue", "age": 51 }, 63f5e0a91fa3040f6327a561 // 63f5e42b1fa3040f6327a56d
//     { "name": "Guy Ritchie", "age": 50 }, 63f5e0b91fa3040f6327a562 // 63f5e4371fa3040f6327a56e
// ];

// const moviesJson = [
//     { "name": "Pulp Fiction", "genre": "Crime", "directorId" : "63f5e4071fa3040f6327a56b"},
//     { "name": "1984", "genre": "Sci-Fi", "directorId": "63f5e4211fa3040f6327a56c" },
//     { "name": "V for vendetta", "genre": "Sci-Fi-Thriller", "directorId" : "63f5e42b1fa3040f6327a56d" },
//     { "name": "Snatch", "genre": "Crime-Comedy", "directorId" : "63f5e4371fa3040f6327a56e" },
//     { "name": "Reservoir Dogs", "genre": "Crime", "directorId" : "63f5e4071fa3040f6327a56b" },
//     { "name": "The Hateful Eight", "genre": "Crime", "directorId" : "63f5e4071fa3040f6327a56b" },
//     { "name": "Iglourious Basterds", "genre": "Crime", "directorId" : "63f5e4071fa3040f6327a56b" },
//     { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "63f5e4371fa3040f6327a56e" },
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

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({ directorId: parent.id });
            },
        },
    }),
});

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) { 
                return Directors.findById(parent.directorId); 
            }
        }
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {    
                return Movies.findById(args.id);
                },
        },
        director: {
            type: DirectorType,
            args: { 
                id: { type: GraphQLID } },
            resolve(parent, args) {
                return Directors.findById(args.id);  
                },  
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
                resolve(parent, args) {
                    return Movies.find({});
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
                resolve(parent, args) {
                    return Directors.find({});    
            }
        },
        
    }
);

module.exports = new GraphQLSchema({
    query: Query, 
})