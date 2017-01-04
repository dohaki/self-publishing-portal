// Home routes
FlowRouter.route('/shop', {
    name: 'shop',
    action: function () {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_shop',
            sidebar: 'layout_sidebar'
        });
    }
});