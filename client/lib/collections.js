// Basic (local) collections
// we use {connection: null} to prevent them from syncing with our not existing Meteor server
Users = new Mongo.Collection('users', {connection: null});
//new PersistentMinimongo2(Users, 'self_publishing_portal');
Users.find({}).observe({

});