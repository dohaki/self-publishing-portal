export function upsertInsertion(insertionId, insertion, cb) {
    Insertions.upsert({_id: insertionId}, insertion, function (error) {
        if (error) console.error(error);
        else {
            console.info('upserted insertion');
            if (cb) cb();
        }
    });
}

export function updateInsertion(insertionId, changes, cb) {
    Insertions.update({_id: insertionId}, changes, function (error) {
        if (error) console.error(error);
        else {
            console.info('updated insertion');
            if (cb) cb();
        }
    });
}