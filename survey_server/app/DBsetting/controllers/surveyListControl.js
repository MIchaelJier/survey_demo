const Model = require('../model');
const { resBack } = require('../../utils/resBack');
const { SurveyList } = Model;
const formdable = require('formidable');
const fs = require('fs');
const path = require('path');
const { publicDir } = require('../../public/publicDir');

const surveyListControl = {
    // 查找全部
    all(req, res) {
        SurveyList.find({})
            .exec((err, data) => {
                resBack.auto(res, data, err);
                //  res.json(surveyList);
            });
        },
    // 按id查找
    byId(req, res) {
        const idParams = req.query.id;

        console.log(`按id: ${idParams}查找`);
        SurveyList
        .findOne({ _id: idParams })
        .exec((err, data) => resBack.auto(res, data, err));
    },
    // 新增
    create(req, res) {
        const requestBody = req.body;

        requestBody.createDate = new Date();
        // 图片
        const newSurveyList = new SurveyList(requestBody);
    
        newSurveyList.save((err, saved) => {
            console.log({err, saved});
            SurveyList
            .findOne({ _id: newSurveyList._id })
            .exec((err, data) => resBack.auto(res, data, err));
        });
    },
    uploadPic(req, res) {
        const form = new formdable.IncomingForm();

        // 编码
        form.encoding = 'utf-8'; 
        // 保留扩展名
        form.keepExtensions = true;
        form.uploadDir = path.join(__dirname, '../../public/');

        form.parse(req, function(err, fields, files) {
            console.log({fields, files});
            console.log(publicDir);
            const extname = path.extname(files.upload.name),
                  timestamp = Date.parse(new Date()),
                  oldpath = files.upload.path,
                  newpath = `${publicDir}/${timestamp + extname}`;

            fs.rename(oldpath, newpath, function(err) {
                if (err) {
                    throw Error('改名失败');
                }
            });
            res.json({
                code: 200, 
                state: true,
                data: `${req.protocol}://${req.get('host')}/public/${timestamp + extname}`,
            });
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