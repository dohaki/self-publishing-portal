// contracts routes
FlowRouter.route('/contracts', {
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_contracts',
            sidebar: 'layout_sidebar'
        });
    }
});