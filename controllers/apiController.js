const syncService = require('../services/syncService');

const apiController = {
    fetchData: async (req, res) => {
        try {
            const data = await syncService.getData(req.user.id);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching data' });
        }
    }
};

module.exports = apiController;