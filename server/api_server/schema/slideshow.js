// 导入定义验证规则的模块
const joi = require('joi')
const type = joi.string().required()
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()

// 验证规则对象 - 添加轮播图
exports.add_slide_schema = {
    body: {
        type
    },
}
// 校验规则对象 - 删除分类
exports.delete_slide_schema = {
    params: {
      id,
    },
}
// 校验规则对象 - 根据 Id 获取分类
exports.get_slide_schema = {
    params: {
      id
    },
}
// 校验规则对象 - 更新分类
exports.update_slide_schema = {
    body: {
      id:id,
      type
    },
  }