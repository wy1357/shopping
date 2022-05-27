$('#link-reg').click(function () {
  $('.reg-box').show()
  $('.login-box').hide()
})
$('#link-login').click(function () {
  $('.reg-box').hide()
  $('.login-box').show()
})
let test = " \n "
$(function () {
  //制定规则
  layui.form.verify({

    phone: [
        /^[1][3,4,5,7,8][0-9]{9}$/, '手机号不合法,请重新输入'
      ]

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
      let revalue = e.replace(/^\s*|(\s*$)/g, "")
      if (revalue.length <= 0) {
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
      url: '/api/register',
      data: {
        phone: $('.reg-box .rej [name=phone]').val(),
        password: $('.reg-box .rej [name=password]').val()
      },
      success: (res) => {
        if (res.status == 0) {
          layer.msg(res.message)
          //模拟点击
          $('#link-login').click()
        } else {
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
      url: '/api/logins',
      data: {
        phone: $('.login-box #enter [name=phone]').val(),
        password: $('.login-box #enter [name=password]').val()
      },
      success: (res) => {
        if (res.status !== 0) {
          layer.msg('用户名或密码错误')
        } else {
          localStorage.setItem('token', res.token)
          window.location.href = '../html/index.html'
        }

      }
    })
  })
})