// 导入定义验证规则的模块
const joi = require('joi')

// 定义 原价、现价、内容、商品功能 的验证规则
const old_price = joi.number().required()
const new_price = joi.number().required()
const content = joi.string().required().allow('')
const product_gn = joi.string().required().allow('')
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
// 验证规则对象 - 发布文章
exports.add_detail_schema = {
  body: {
    old_price,
    new_price,
    content,
    product_gn,
  },
}
// 校验规则对象 - 根据 Id 获取分类
exports.get_detail_schema = {
  params: {
    id,
  },
}
// 校验规则对象 - 删除分类
exports.delete_detail_schema = {
  params: {
    id,
  },
}
// 校验规则对象 - 更新分类
exports.update_detail_schema = {
  body: {
    id: id,
    old_price,
    new_price,
    content,
    product_gn,
  },
}