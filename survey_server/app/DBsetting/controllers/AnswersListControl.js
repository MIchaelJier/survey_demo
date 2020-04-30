const Model = require('../model');
const { AnswersList, SurveyList } = Model;
const { resBack } = require('../../utils/resBack');

const AnswersListControl = {
    // 新增
    create(req, res) {
        const requestBody = req.body;

        const newAnswersList = new AnswersList({
            surveyId: requestBody._id,
            sendDate: new Date(),
            answerList: requestBody.answerList,
        });

        newAnswersList.save((err, saved) => {

            console.log({err, saved});
            const updateQuote = 
            SurveyList
            .updateOne({ _id: requestBody._id }, { $inc: { quoteSum: 1} });

            const isSave =
            AnswersList
            .findOne({ _id: newAnswersList._id });

            Promise.all([updateQuote, isSave])
            .then(data => {
                resBack.sussess(res, data, '提交成功');
            })
            .catch(err => {
                resBack.fail(res, err, '提交失败');
            });
        });
    },
};

module.exports = AnswersListControl;