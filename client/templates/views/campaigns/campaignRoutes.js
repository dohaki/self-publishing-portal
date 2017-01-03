import {Session} from 'meteor/session';

import {getAllCampaignsFromContract} from '/client/lib/ethereum/contracts/crowdFundingContractHelper';

// Behandlung der Routen für den Bereich CAMPAIGNS
let campaignRoutes = FlowRouter.group({
    prefix: '/campaigns',
    name: 'campaigns'
});

// behandelt /campaigns-Route
campaignRoutes.route('/', {
    triggersEnter: [() => {
        getAllCampaignsFromContract();
    }],
    action: () => {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaigns',
            sidebar: 'layout_sidebar'
        });
    }
});

// behandelt /campaigns/create-Route
campaignRoutes.route('/create', {
    action: (params, queryParams) => {
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaignCreate',
            sidebar: 'layout_sidebar'
        });
    }
});

// behandelt /campaigns/:id-Route
campaignRoutes.route('/:id', {
    action: (params, queryParams) => {
        Session.set('campaignId', params.id)
        BlazeLayout.render('layout_main', {
            header: 'layout_header',
            main: 'views_campaignDetails',
            sidebar: 'layout_sidebar'
        });
    }
});