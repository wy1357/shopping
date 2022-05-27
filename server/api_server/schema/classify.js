// 导入定义验证规则的模块
const joi = require('joi')
//定义导航分类的校验规则
const cate_name = joi.required()
// 定义 分类Id 的校验规则
const id = joi.number().integer().min(1).required()
exports.add_cate_schema={
    body:{
        cate_name
    }
}
// 校验规则对象 - 删除分类
exports.delete_cate_schema = {
    params: {
      id,
    },
}
// 校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
    params: {
      id,
    },
  }
  // 校验规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
      id: id,
      cate_name
    },
  }