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
    // 统计查询
    async sumById(req, res) {
        try {
            const idParams = req.query.id;
            const answers = await AnswersList.find({ 'surveyId': idParams }, {_id: 0, answerList: 1});
            const question = await SurveyList.findOne({ _id: idParams });
            let all = []; // 各题答案 数组

            if (answers.length === 0) {
                resBack.sussess(res, {question, answer: []} );
                
return;
            }
            answers.forEach(item => {
                item.answerList.forEach((inner, index) => {
                    // 1 1 
                    // 1 0
                    // 0 1
                    // 0 0
                    switch (parseInt(Array.isArray(all[index])*10 + (Array.isArray(inner.value)), 2)) {
                        case 3:
                            all[index].push(...inner.value);
                            break;
                        case 2:
                            all[index].push(inner.value);
                            break;
                        case 1:
                            all[index] = inner.value;
                            break;
                        case 0:
                            all[index] = [inner.value];
                            break;
                        default:
                            break;
                    }
                });
            });
            const answer = [];

            question.questions.list.forEach((item, index) => {
                // 选择题 打分题 统计
                if (item.type < 3 || item.type === 4) {
                    const names = item.type === 4 ? ['0星', '1星', '2星', '3星', '4星', '5星'] : item.content;
                    const values = all[index];
                    const ans = names.map(name => ({name, value: 0}));

                    values.forEach(inner => {
                        ans[inner].value ++; 
                    });
                    answer.push(ans);
                } else if (item.type === 5) {
                    const timer = [];
                    const values = all[index];

                   for (let i = 0 ; i < 24 ; i ++) {
                       timer.push(0);
                   }
                   values.forEach(inner => {
                     timer[parseInt(inner.split(':')[0])] ++;
                   });
                   answer.push(timer);
                } else {
                    let ans = [{name: '未重复项', value: 0}];
                    const ansMap = all[index].reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());

                    for (let [key, value] of ansMap.entries()) {
                        if (value > 1) {
                            ans.push({name: key, value});
                        } else {
                            ans[0].value ++;
                        }
                    }
                    // 取最多数量的前5个
                    answer.push(ans.sort((a, b) => (a.value - b.value)).slice(0, 5));
                }
                    
return item;
                
            });
            resBack.sussess(res, {question, answer} );
        } catch (err) {
            resBack.fail(res, err);
            // next(err)
        }
        

        // });
        // AnswersList
        // .find({ 'surveyId': idParams }, {_id: 0, answerList: 1})
        // .exec((err, data) => {
        //     let all = [];

        //     SurveyList.findOne({ _id: idParams })
        //     .exec((err, surveyList) => {
        //         if (err) {
        //             resBack.fail(res, err);
        //         } else {
        //             return surveyList;
        //         }
        //     })
        //     .then(surveyList => {
                
        //     });
            
        // });
        // SurveyList
        // .find({ _id: idParams })
        // .populate({
        //     path: 'surveyId',
        //     populate: { path: 'answers' }, 
        //   })
        // .exec((err, data) => {
        //     // resBack.auto(res, data, err)
        //     const questionList = questions.list,
        //           promiseArr = []
        //     questionList.forEach(item => {
        //         AnswersList
        //         .find({ 'surveyId': idParams }, {_id: 0, answerList: 1})
        //         .aggregate([
        //             { $match: {_id: item._id}}
        //             { $group: {_id: item._id,total: {$push : ''}} }
        //         ])
        //     })
        // });
    },
};

module.exports = AnswersListControl;