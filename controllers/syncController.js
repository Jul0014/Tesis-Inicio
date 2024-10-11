const syncService = require('../services/syncService');

const syncController = {
    syncData: async (req, res) => {
        try {
            const result = await syncService.sync(req.body.data);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ error: 'Error during sync' });
        }
    }
};

module.exports = syncController;