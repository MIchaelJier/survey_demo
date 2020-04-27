const Model = require('../model');
const { AnswersList } = Model;

const AnswersListControl = {
    // 新增
    create(req, res) {
        const requestBody = req.body;

        const newAnswersList = new AnswersList(requestBody);
    
        newSurveyList.save((err, saved) => {
            console.log({err, saved});
            AnswersList
            .findOne({ _id: newAnswersList._id })
            .exec((err, AnswersList) => res.json(AnswersList));
        });
    },
};

module.exports = AnswersListControl;