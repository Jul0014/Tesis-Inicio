const smartwatchService = require('../services/smartwatchService');

const smartwatchController = {
    syncSmartwatchData: async (req, res) => {
        try {
            const { smartwatchData } = req.body;
            const result = await smartwatchService.syncData(req.user.id, smartwatchData);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ error: 'Error syncing smartwatch data' });
        }
    }
};

module.exports = smartwatchController;