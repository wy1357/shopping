// 导入数据库操作模块
const db = require('../db/index')
// 获取商品信息的处理函数
exports.getDetails = (req, res) => {
    const sql = `select * from details where is_delete=0 order by id asc`
    db.query(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: '获取商品详情信息成功！',
            data: results,
        })
    })
}
// 添加商品详细的处理函数
exports.addDetails = (req, res) => {
    const articleInfo = {
        // 原价、现价、内容、商品功能
        ...req.body
    }
    const sql = `insert into details set ?`
    // 执行 SQL 语句
    db.query(sql, articleInfo, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('商品信息添加失败！')

        // 发布文章成功
        res.cc('添加商品信息成功', 0)
    })
}
// 根据 Id 获取商品详细信息的处理函数
exports.getDetailsById = (req, res) => {
    const sql = `select * from details where id=?`
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
// 删除商品详细信息的处理函数
exports.deleteDetailById = (req, res) => {
    const sql = `update details set is_delete=1 where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('删除商品详细信息失败！')
      
        // 删除商品详细信息成功
        res.cc('删除商品详细信息成功！', 0)
      })
}
// 更新商品详细信息的处理函数
exports.updateDetailById = (req, res) => {
    const sql = `select * from details where id=?`
    // 执行查重操作
    db.query(sql, req.body.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        const articleInfo = {
            ...req.body
        }
        const sql = `update details set ? where id=?`
        db.query(sql, articleInfo, (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新商品详细信息失败！')

            // 更新商品详细信息成功
            res.cc('更新商品详细信息成功！', 0)
        })
    })
}