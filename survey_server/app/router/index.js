const express = require('express');
const router = express.Router();
const surveyListControl = require('../DBsetting/controllers/surveyListControl');
const UsersListControl = require('../DBsetting/controllers/UsersListControl');
const AnswersListControl = require('../DBsetting/controllers/AnswersListControl');

router.get('/allSurveyList', surveyListControl.all);

router.get('/SearchSurveyListById', surveyListControl.byId);

router.post('/addSurveyItem', surveyListControl.create);

router.post('/delSurveyItem', surveyListControl.remove);

router.post('/uploadPic', surveyListControl.uploadPic);

router.post('/register', UsersListControl.register);

router.post('/login', UsersListControl.login);

router.post('/addAnswerItem', AnswersListControl.create);


module.exports = router;
