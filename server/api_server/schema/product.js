// 导入定义验证规则的模块
const joi = require('joi')
const type_name=joi.string().required()
const price=joi.number().required()
const content=joi.string().required().allow('')
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
const Id=joi.string().required()
exports.add_product_schema={
    body:{
        type_name,
        price,
        content
    }
}
// 校验规则对象 - 根据 Id 获取商品信息
exports.get_product_schema = {
    params: {
      id,
    },
}
// 校验规则对象 - 根据 Id 获取商品信息
exports.get_list_schema = {
  params: {
    Id,
  },
}
// 校验规则对象 - 删除分类
exports.delete_product_schema = {
  params: {
    id,
  },
}
// 校验规则对象 - 更新分类
exports.update_product_schema = {
  body: {
    id: id,
    type_name,
    price,
    content,
  },
}