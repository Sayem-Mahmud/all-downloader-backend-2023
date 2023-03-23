const express = require('express');
const request = require('request');

const app = express();

app.get('/download', async (req, res) => {
    console.log('req', req.query);
    const url = req.query?.url?.toString() ?? '';
    const name = req.query?.name?.toString() ?? '';
    res.setHeader('Content-Disposition', `attachment; filename=${name}`);
    request
        .get(url, { encoding: null, highWaterMark: 64 * 1024 })
        .on('error', (err) => {
            console.log(err);
            res.status(500).send('Internal server error');
        })
        .pipe(res);
});

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello Doctors portal!')
})
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
