// contracts routes
FlowRouter.route('/contracts', {
    name: 'contracts',
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_contracts',
            sidebar: 'layout_sidebar'
        });
    }
});