'use strict';

/**
 * kikitok service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::kikitok.kikitok');
