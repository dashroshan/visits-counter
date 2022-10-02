const visitsBadgeSchema = require('./schema.js');

module.exports.visitsBadge = async function (uniqueID) {
    const badge = await visitsBadgeSchema.findOneAndUpdate(
        { uniqueID: uniqueID },
        {
            $setOnInsert: {
                uniqueID: uniqueID,
            },
            $inc: { visitsCount: 1 },
        },
        { new: true, upsert: true }
    ).select({ visitsCount: 1 });
    return badge.visitsCount;
}