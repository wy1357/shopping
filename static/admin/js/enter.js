$('#link-reg').click(function () {
  $('.reg-box').show()
  $('.login-box').hide()
})
$('#link-login').click(function () {
  $('.reg-box').hide()
  $('.login-box').show()
})
let test=" \n "
$(function () {
  //制定规则
  layui.form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\'';
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字';
      }
      if (/\s/.test(value)) {
        return '用户名不能出现空格';
      }
      //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
      if (value === 'xxx') {
        layer.msg('用户名不能为敏感词')
        return true;
      }
    }

      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      ,
    pwd: [
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (e) {
      if (e != $('.rej [type=password]').val()) {
        layer.msg('两次输入的密码不一致')
      }
      let revalue=e.replace(/^\s*|(\s*$)/g,"")
      if(revalue.length<=0) {
        layer.msg('密码全为空格')
      }
    }
  })
  //监听注册表单
  $('.reg-box .rej').on('submit', function (event) {
    var e = event || window.event
    e.preventDefault()
    $.ajax({
      method: "post",
      url: '/api/reguser',
      data: {
        username: $('.reg-box .rej [name=username]').val(),
        password: $('.reg-box .rej [name=password]').val()
      },
      success: (res) => {
        if (res.status == 0) {
          layer.msg(res.message)
          //模拟点击
          $('#link-login').click()
        }
        else {
          layer.msg(res.message)
        }
      }
    })
  })
  //监听登录表单
  $('.login-box #enter').on('submit', function (event) {
    var e = event || window.event
    e.preventDefault()
    $.ajax({
      method: "post",
      url: '/api/login',
      data: {
        username: $('.login-box #enter [name=username]').val(),
        password: $('.login-box #enter [name=password]').val()
      },
      success: (res) => {
        if (res.status !== 0) {
          layer.msg('手机号或密码错误')
        } else {
          localStorage.setItem('token', res.token)
          window.location.href = '../html/index.html'
        }

      }
    })
  })
})