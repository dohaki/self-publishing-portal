// Home routes
FlowRouter.route('/insertions', {
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_insertions',
            sidebar: 'layout_sidebar'
        });
    }
});