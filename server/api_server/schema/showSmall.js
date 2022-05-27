const joi = require('joi')
const small_id = joi.number().integer().min(1).required()
const big_id=joi.number().integer().min(1).required()
// 验证规则对象 - 发布文章
exports.add_showSmall_schema = {
    body: {
        small_id
    },
}
// 验证规则对象 - 发布文章
exports.add_showBig_schema = {
    body: {
        big_id
    },
}