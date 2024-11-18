const smartwatchService = require('../services/smartwatchService');

const smartwatchController = {
    /*syncSmartwatchData: async (req, res) => {
        try {
            const { smartwatchData } = req.body;
            const result = await smartwatchService.syncData(req.user.id, smartwatchData);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ error: 'Error syncing smartwatch data' });
        }
    },*/

    startSync: async (req, res) => {
        try {
            const result = await smartwatchService.startBluetoothSync();
            res.status(200).json({ success: true, message: result });
        } catch (error) {
            res.status(500).json({ error: 'Error starting Bluetooth sync', details: error.message });
        }
    },
};

module.exports = smartwatchController;
