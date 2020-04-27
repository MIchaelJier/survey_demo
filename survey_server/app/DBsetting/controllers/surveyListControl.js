const Model = require('../model');
const { SurveyList } = Model;

const surveyListControl = {
    // 查找全部
    all(req, res) {
        SurveyList.find({})
            .exec((err, surveyList) => res.json(surveyList) );
        },
    // 按id查找
    byId(req, res) {
        const idParams = req.query.id;

        console.log(`按id: ${idParams}查找`);
        SurveyList
        .findOne({ _id: idParams })
        .exec((err, surveyList) => res.json(surveyList));
    },
    // 新增
    create(req, res) {
        const requestBody = req.body;

        requestBody.createDate = new Date();
        const newSurveyList = new SurveyList(requestBody);
    
        newSurveyList.save((err, saved) => {
            console.log({err, saved});
            SurveyList
            .findOne({ _id: newSurveyList._id })
            .exec((err, surveyList) => res.json(surveyList));
        });
    },
    // 改
    update(req, res) {
        const idParams = req.params.id;
        let newSurveyList = req.body;
    
        SurveyList
        .updateOne({ _id: idParams }, { ...newSurveyList }, (err, updated) => {
          res.json(updated);
        });
    },
    // 删除
    remove(req, res) {
        const idParams = req.body.id;

        console.log(`删除id: ${idParams}`);
        SurveyList
            .findOne({ _id: idParams })
            .deleteOne( (err) => {
                if (err) { 
                    res.json(err); 
                }
                res.json(`删除id为${idParams}的数据成功`);
            } ); //err, removed
      },
};

module.exports = surveyListControl;