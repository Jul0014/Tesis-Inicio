const Smartwatch = require('../models/smartwatchModel');

const smartwatchService = {
    syncData: async (userId, smartwatchData) => {
        try {
            const result = await Smartwatch.findOneAndUpdate(
                { userId: userId },
                { data: smartwatchData, lastSync: Date.now() },
                { new: true, upsert: true }
            );
            return result;
        } catch (error) {
            throw new Error('Error syncing smartwatch data');
        }
    }
};

module.exports = smartwatchService;