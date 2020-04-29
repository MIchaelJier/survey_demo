const Model = require('../model');
const { resBack } = require('../../utils/resBack');
const { SurveyList } = Model;
const formdable = require('formidable');
const fs = require('fs');
const path = require('path');
const { publicDir } = require('../../public/publicDir');

const surveyListControl = {
    // 查找全部 || 模糊搜索 || 分页
    all(req, res) {
        const size = parseInt(req.query.size) || 10;
        const page = ((parseInt(req.query.page) || 1) - 1)*size;
        const search = new RegExp(req.query.search || '', 'i');

        SurveyList
            .find({
                'questions.title': { $regex: search},
            })
            .limit(size)
            .skip(page)
            .exec((err, data) => {
                if (!err) {
                    let newData = [];

                    data.forEach(item => {
                        newData.push({
                            id: item._id,
                            title: item.questions.title,
                            questionNum: item.questions.list.length,
                            quoteNum: item.quoteSum,
                        });
                    });
                    resBack.sussess(res, newData, '查询成功');
                } else {
                    resBack.fail(res, err, '查询失败');
                }
                
            });
        },
    // 按id查找
    byId(req, res) {
        const idParams = req.query.id;

        console.log(`按id: ${idParams}查找`);
        SurveyList
        .findOne({ _id: idParams })
        .exec((err, data) => resBack.auto(res, data.questions, err));
    },
    // 新增 POST
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
            // console.log({fields, files});
            // console.log(publicDir);
            const extname = path.extname(files.upload.name),
                  timestamp = Date.parse(new Date()),
                  oldpath = files.upload.path,
                  newpath = `${publicDir}/upload_${timestamp + extname}`;

            // 重命名图片
            fs.rename(oldpath, newpath, function(err) {
                if (err) {
                    res.json({
                        code: 500, 
                        state: false,
                        data: '',
                    });
                    throw Error('改名失败');
                } else {
                    res.json({
                        statusCode: res.statusCode, 
                        state: true,
                        data: `${req.protocol}://${req.get('host')}/public/upload_${timestamp + extname}`,
                    });
                }
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
            .deleteOne( (err, data) => {
                resBack.auto(res, data, err, `删除id为${idParams}的数据成功`);
            } ); //err, removed
      },
};

module.exports = surveyListControl;