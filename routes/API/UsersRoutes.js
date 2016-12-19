var express = require('express');
var router = express.Router();
var UsersHelper = require('../Helpers/API/UsersHelper.js');

/*
 * GET
 */
router.get('/', UsersHelper.list);

/*
 * GET
 */
router.get('/:id', UsersHelper.show);

/*
 * POST
 */
router.post('/', UsersHelper.create);

/*
 * PUT
 */
router.put('/:id', UsersHelper.update);

/*
 * DELETE
 */
router.delete('/:id', UsersHelper.remove);

module.exports = router;
