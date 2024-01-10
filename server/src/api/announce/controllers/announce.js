'use strict';

/**
 * announce controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::announce.announce');
