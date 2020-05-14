const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;


const listSchema = Schema({
    // listId: { type: Number, index: true},
    type: Number,
    question: String,
    isNecessity: Boolean,
    content: [String],
}, {versionKey: false});

const SurveyListSchema = Schema({
    // id: ObjectId,
    createId: String,
    createDate: Date,
    questionSum: Number,
    quoteSum: Number,
    classify: Array,
    questions: {
        title: String,
        description: String,
        coverPic: String,
        list: [listSchema],
        answers: [{type: ObjectId, ref: 'AnswersList'}],
    },
}, {versionKey: false});

const AnswersSchema = Schema([{
    // id: ObjectId,
    surveyId: {type: ObjectId, ref: 'SurveyList'},
    // surveyId: String,
    sendDate: Date,
    answerList: [{
        answerId: String,
        isNecessity: Boolean,
        value: Mixed, // !!!
    }],
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
