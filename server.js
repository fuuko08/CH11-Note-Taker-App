const { application } = require('express');
const express = require('express');
const app = express();

const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});