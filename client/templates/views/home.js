
// Home routes
FlowRouter.route('/', {
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_home',
            sidebar: 'layout_sidebar'
        });
    }
});