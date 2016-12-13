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