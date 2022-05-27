// 导入定义验证规则的模块
const joi = require('joi')
const cate_id = joi.number().integer().min(1).required()
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
// 验证规则对象 - 发布文章
exports.add_colorImg_schema = {
    body: {
        cate_id
    },
}
// 校验规则对象 - 删除分类
exports.delete_colorImg_schema = {
    params: {
      id,
    },
}
// 校验规则对象 - 根据 Id 获取分类
exports.get_colorImg_schema = {
    params: {
      id,
    },
}
// 校验规则对象 - 更新分类
exports.update_colorImg_schema = {
    body: {
      id: id,
      cate_id
    },
  }