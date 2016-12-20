var express = require('express');
var router = express.Router();
var UserHelper = require('../helpers/UserHelper.js');
var UserFacade = require('../facades/UserFacade.js');
var QuestionCreator = require('../helpers/QuestionCreator.js');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'CrowdLector' });
});

router.post('/', function (req, res, next) {
	var session = req.session;
	var user = {
		Email: req.body.email,
		Name: req.body.name,
		Surname: req.body.surname
	};
	if (UserHelper.checkUser(user)) {
		UserFacade.findByEmail({ email: user.Email }, function (err, data) {
			if (err) {
				if (err.code === 404) {
					UserFacade.create({ newObj: user }, function (err, data) {
						if (err) {
							res.render('error', {
								message: "Database error"
							});
						} else {
							session.user = data._id;
                            QuestionCreator.generate(data._id, function (err, data) {
                                if (err) {
                                    res.render('error', err);
                                } else {
                                    res.render('questions', {
                                        title: 'CrowdLector',
                                        example: "Sono una domanda di esempio",
                                        questions: [
                                            { _id: 2, question: "ciaoone" },
                                            { _id: 6, question: "pippo" },
                                            { _id: 74, question: "pluto" },
                                            { _id: 79, question: "qui, quo, qua" }]
                                    });
                                }
                            });
						}
					});
				} else {
					res.render('error', {
						message: "Database error"
					});
				}
			} else {
				//TODO verifica che l'utente sia corretto
				session.user = data._id;
				QuestionCreator.generate(data._id, function (err, data) {
					if (err) {
						res.render('error', err);
					} else {
                        res.render('questions', {
                            title: 'CrowdLector',
                            example: "Sono una domanda di esempio",
                            questions: [
                                { _id: 2, question: "ciaoone" },
                                { _id: 6, question: "pippo" },
                                { _id: 74, question: "pluto" },
                                { _id: 79, question: "qui, quo, qua" }]
                        });
					}
				});
			}
		});
	} else {
		res.render('error', {
			message: "Data inserted not corrected"
		});
	}

});

router.post('/saveAnswers', function (req, res, next) {
	var session = req.session;
	//Verificare che le domande tornate siano le stesse mandate e persisterle nel db
	console.log(req.body);
	//console.log(req.session);
});

module.exports = router;
