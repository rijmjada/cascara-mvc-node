
const { response } = require('express');

const users_Get = (req, res = response) => {
    res.status(200).json({
        message: "GET API - Controller"
    })
}

const users_Post = (req, res = response) => {
    res.status(200).json({
        message: "POST API - Controller"
    })
}
const users_Put = (req, res = response) => {
    res.status(200).json({
        message: "PUT API - Controller"
    })
}
const users_Delete = (req, res = response) => {
    res.status(200).json({
        message: "DELETE API - Controller"
    })
}

module.exports = {
    users_Get,
    users_Post,
    users_Put,
    users_Delete
};