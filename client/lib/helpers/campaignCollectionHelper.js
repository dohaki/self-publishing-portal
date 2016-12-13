export const campaignCategories = [{
    category: 'Art',
    subCategories: ['Conceptual Art', 'Digital Art', 'Illustration', 'Installations', 'Mixed Media', 'Drawing', 'Action Art', 'Sculpting']
}, {
    category: 'Comics',
    subCategories: ['Comic Books', 'Events', 'Comic Novels', 'Web Comics']
}, {
    category: 'Design',
    subCategories: ['Architecture', 'Graphic Design', 'Interactive Design', 'Product Design', 'Typography']
}, {
    category: 'Fashion',
    subCategories: ['Accessories', 'Jewelry', 'Shoes', 'Wear']
}, {
    category: 'Journalism',
    subCategories: ['Audio', 'Photos', 'Print', 'Video', 'Web']
}, {
    category: 'Music',
    subCategories: ['Blues', 'Classical', 'Country and Folk', 'Electronic', 'Spiritual', 'Hip-Hop', 'Indie', 'Jazz', 'Child', 'Latin', 'Metal', 'Pop', 'Punk', 'R&B', 'Rock']
}, {
    category: 'Photography',
    subCategories: ['Animals', 'Nature', 'People', 'Books', 'Places']
}, {
    category: 'Publishing',
    subCategories: ['Education', 'Anthology', 'Journal', 'Juvenile Literature', 'Belletristic', 'Radio and Podcasts', 'Non-fictional Literature', 'Electronic Journal', 'Mystery']
}];

export function getCategory(subCategory) {
    for (let i = 0; i < campaignCategories.length; i++) {
        for (let j = 0; j < campaignCategories[i].subCategories.length; j++) {
            if (campaignCategories[i].subCategories[j] === subCategory) {
                return campaignCategories[i].category;
            }
        }
    }
}

export function insertMockCampaign(campaign) {
    Campaigns.insert(campaign);
}

export function removeMockCampaign(campaign, cb) {
    Campaigns.remove({
        beneficiary: campaign.beneficiary,
        title: campaign.title,
        description: campaign.description,
        category: campaign.category,
        subCategory: campaign.subCategory,
        amountRaised: 0,
        status: 'PENDING'
    }, function (error) {
        if (error) console.error(error);
        if (cb) cb();
    });
}

export function upsertCampaign(campaignId, campaign, cb) {
    Campaigns.upsert({_id: campaignId}, campaign, function (error) {
        if (error) console.error(error);
        else {
            console.info('upserted campaign');
            if (cb) cb();
        }
    });
}

export function updateCampaign(campaignId, changes, cb) {
    Campaigns.update({_id: campaignId}, changes, function (error) {
        if (error) console.error(error);
        else {
            console.info('updated campaign');
            if (cb) cb();
        }
    });
}