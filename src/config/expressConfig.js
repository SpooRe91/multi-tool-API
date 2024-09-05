const express = require('express');
const routes = require('../routes');

exports.expressConfig = (app) => {
    app.use(express.urlencoded({ extended: false })); //this allows the forms and search params to be displayed
    app.use(express.json());
    app.use(routes);
};
