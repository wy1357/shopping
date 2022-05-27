const joi = require('joi')
const cates_id = joi.number().integer().min(1).required()
// 验证规则对象 - 发布文章
exports.add_showImg_schema = {
    body: {
        cates_id
    },
  }