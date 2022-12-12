const express = require('express');

const apiRoutes = require('./routes/api-routes');
const noteRoutes = require('./routes/note-routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', noteRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
});