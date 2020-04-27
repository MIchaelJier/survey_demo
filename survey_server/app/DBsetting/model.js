const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;


const listSchema = Schema({
    listId: ObjectId,
    type: Number,
    question: String,
    isNecessity: Boolean,
    content: [String],
});

const SurveyListSchema = Schema({
    id: ObjectId,
    createId: String,
    createDate: Date,
    questionSum: Number,
    quoteSum: Number,
    classify: Array,
    questions: [{
        title: String,
        description: String,
        coverPic: String,
        list: [listSchema],
    }],
}, {versionKey: false});

const AnswersSchema = Schema([{
    id: ObjectId,
    surveyId: String,
    sendDate: Date,
    answerList: [String],
}]);

const SurveyList = model('SurveyList', SurveyListSchema);

const AnswersList = model('AnswersList', AnswersSchema);

module.exports = { SurveyList, AnswersList };  
