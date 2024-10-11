const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const smartwatchRoutes = require('./routes/smartwatch'); 

const app = express();
app.use(express.json());

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

app.use('/api', apiRoutes);
app.use('/smartwatch', smartwatchRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
