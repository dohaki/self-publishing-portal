import {Session} from 'meteor/session';

// Behandlung der Routen für den Bereich CONTRACTS
let contractRoutes = FlowRouter.group({
    prefix: '/contracts',
    name: 'contracts'
});

// behandelt /contracts Route
contractRoutes.route('/', {
    action: () => {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_contracts',
            sidebar: 'layout_sidebar'
        });
    }
});

// behandelt /contracts/create Route
contractRoutes.route('/create', {
    action: (params, queryParams) => {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_contractCreate',
            sidebar: 'layout_sidebar'
        });
    }
});

// behandelt /contracts/create Route
contractRoutes.route('/:id', {
    action: (params, queryParams) => {
        Session.set('contractId', params.id);
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_contractDetails',
            sidebar: 'layout_sidebar'
        });
    }
});