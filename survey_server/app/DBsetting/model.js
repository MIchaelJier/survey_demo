const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId;


const listSchema = Schema({
    // listId: { type: Number, index: true},
    type: Number,
    question: String,
    isNecessity: Boolean,
    content: [String],
}, {versionKey: false});

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
    // id: ObjectId,
    surveyId: String,
    sendDate: Date,
    answerList: [String],
}], {versionKey: false});

const UsersSchema = Schema([{
    // id: ObjectId,
    email: String,
    password: String,
}], {versionKey: false});

const SurveyList = model('SurveyList', SurveyListSchema);

const AnswersList = model('AnswersList', AnswersSchema);

const UsersList = model('UsersList', UsersSchema);

module.exports = { SurveyList, AnswersList, UsersList };  
