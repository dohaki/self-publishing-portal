/**
 Template Controllers
 @module Routes
 */

/**
 The app routes
 @class App routes
 @constructor
 */

// Router defaults
Router.configure({
    layoutTemplate: 'layout_main',
    //notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'},
        'layout_footer': {to: 'footer'},
        'layout_sidebar': {to: 'sidebar'},
        'layout_actionbar': {to: 'actionbar'}
    }
});

Router.onBeforeAction(function() {
    if (EthAccounts.find().fetch().length === 0) {
        this.render('views_login');
    } else {
        this.next();
    }
});

// Routes

Router.route('/', {
    template: 'views_home',
    name: 'home'
});

Router.route('/login', {
    template: 'views_login',
    name: 'login'
});

Router.route('/campaigns', {
    template: 'views_campaigns',
    name: 'campaigns'
});

Router.route('/contracts', {
    template: 'views_contracts',
    name: 'contracts'
});

Router.route('/messages', {
    template: 'views_messages',
    name: 'messages'
});