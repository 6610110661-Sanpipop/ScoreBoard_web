'use strict';

/**
 * announce service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::announce.announce');
