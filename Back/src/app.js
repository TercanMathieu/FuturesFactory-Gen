const express = require('express')
const cors = require('cors')

const apiRoutes = require("./routes")
const apiResponse = require("./helpers/apiResponse")

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API running')
})

app.use('/api/', apiRoutes)

app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "Not found");
});

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return apiResponse.unauthorizedResponse(res, err.message);
    }
    return apiResponse.errorResponse(res, err.message);
})

module.exports = app
