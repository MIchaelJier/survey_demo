const Model = require('../model');
const { AnswersList } = Model;
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

        console.log(requestBody);
    
        newAnswersList.save((err, saved) => {
            console.log({err, saved});
            AnswersList
            .findOne({ _id: newAnswersList._id })
            .exec((err, data) => resBack.auto(res, data, err));
        });
    },
};

module.exports = AnswersListControl;