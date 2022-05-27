//导入数据库模块
const db = require('../db/index')
// 导入处理路径的 path 核心模块
const path = require('path')
// 获取商品信息的处理函数
// c inner join img_color i on c.id=i.cate_id
exports.getProduct = (req, res) => {
    const sql = 'select * from commodity where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取商品信息成功！',
            data: results,
        })
    })
}
exports.getProductList = (req, res) => {
    const sql = `select * from commodity where content like "%${req.params.Id}%"`
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '搜索商品信息成功！',
            data: results,
        })
    })
}
// 添加商品的处理函数
exports.addProduct = (req, res) => {
    // 手动判断是否上传了商品图片
    if (!req.file || req.file.fieldname !== 'com_img') return res.cc('商品图片是必选参数！')


    const articleInfo = {
        // 商品分类名称、商品价格、商品介绍
        ...req.body,
        // 商品图片在服务器端的存放路径
        com_img: path.join('/uploads', req.file.filename)
    }
    const sql = `insert into commodity set ?`
    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('添加商品失败！')

        // 添加商品成功
        res.cc('添加商品成功', 0)
    })
}
// 根据 Id 获取商品信息的处理函数
exports.getProductById = (req, res) => {
    const sql = `select * from commodity where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取商品信息失败！')
      
        // 把数据响应给客户端
        res.send({
          status: 0,
          message: '获取商品信息成功！',
          data: results[0],
        })
      })
}
// 删除商品信息的处理函数
exports.deleteProductById = (req, res) => {
    const sql = `update commodity set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除商品信息失败！')
      
        // 删除文章分类成功
        res.cc('删除商品信息成功！', 0)
      })
  }
  // 更新商品信息的处理函数
exports.updateProductById = (req, res) => {
    const sql = `select * from commodity where id=?`
    // 执行查重操作
    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 手动判断是否上传了图片
        if (!req.file || req.file.fieldname !== 'com_img') return res.cc('请选择要更新的分类图片！')

        // 导入处理路径的 path 核心模块
        const path = require('path')
        const articleInfo = {
            ...req.body,
            com_img: path.join('/uploads', req.file.filename),
        }
        const sql = `update commodity set ? where id=?`
        db.query(sql, [articleInfo, req.body.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新商品信息失败！')

            // 更新商品颜色分类成功
            res.cc('更新商品信息成功！', 0)
        })
    })
}