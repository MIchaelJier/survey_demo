const express = require('express');
const router = express.Router();
const surveyListControl = require('../DBsetting/controllers/surveyListControl');

router.get('/allSurveyList', surveyListControl.all);

router.get('/SearchSurveyListById', surveyListControl.byId);

router.post('/addSurveyItem', surveyListControl.create);

router.post('/delSurveyItem', surveyListControl.remove);

module.exports = router;
