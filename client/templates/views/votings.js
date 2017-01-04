// Home routes
FlowRouter.route('/votings', {
    name: 'votings',
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_votings',
            sidebar: 'layout_sidebar'
        });
    }
});