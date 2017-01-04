import {Session} from 'meteor/session';

// Behandlung der Routen für den Bereich INSERTIONS
let insertionRoutes = FlowRouter.group({
    prefix: '/insertions',
    name: 'insertions'
});

// behandelt /insertions-Route
insertionRoutes.route('/', {
    action: () => {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_insertions',
            sidebar: 'layout_sidebar'
        });
    }
});

// behandelt /insertions/create-Route
insertionRoutes.route('/create', {
    action: (params, queryParams) => {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_insertionCreate',
            sidebar: 'layout_sidebar'
        });
    }
});

// behandelt /insertions/:id-Route
insertionRoutes.route('/:id', {
    action: (params, queryParams) => {
        Session.set('insertionId', params.id);
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_insertionDetails',
            sidebar: 'layout_sidebar'
        });
    }
});