//获取文章列表
$.ajax({
  type: 'get', //get或post
  url: '/posts', //请求的地址
  data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数
    //头像上传
    $('#modifyBox').on('change', '#feature', function () {
      var formData = new FormData();
      formData.append('thumbnail', this.files[0])
      $.ajax({
        type: 'post', //get或post
        url: '/upload', //请求的地址
        contentType: false,
        processData: false,
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (resultImg) { //成功的回调函数
          console.log(resultImg[0].thumbnail)
          $('#thumbnail').attr('src', resultImg[0].thumbnail).show()
          $('#hiddenImg').val(resultImg[0].thumbnail);
        },
        error: function (error) {
          alert('上传失败');
        }
      })
    })
    // console.log(result.records);
    var html = template('postsTpl', {
      data: result.records
    })
    $('#postsBox').html(html);
    var page = template('pageTpl', result);
    $('#pageBox').html(page);
  }
})
// 分页

function changePage(page) {
  $.ajax({
    type: 'get', //get或post
    url: '/posts', //请求的地址
    data: {
      page: page
    }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数    
      // console.log(result.records);
      var html = template('postsTpl', {
        data: result.records
      })
      $('#postsBox').html(html);
      var page = template('pageTpl', result);
      $('#pageBox').html(page);
    }
  })
}

//格式化日期
template.defaults.imports.dateFormat = function (date) {
  date = date.split('-')
  date = date.join('')
  var year = date.substr(0, 4);
  var month = date.substr(4, 2);
  var day = date.substr(6, 2);
  var hour = date.substr(9, 2);
  var minute = date.substr(12, 2);
  var seconds = date.substr(15, 2);

  return year + '年' + month + '月' + day + '日' + hour + '时' + minute + '分' + seconds + '秒';
  // return year + '年' + month + '月' + day + '日';
}



//删除
$('#postsBox').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  var isConfirm = confirm('你真的要删除吗');
  console.log(id)
  if (isConfirm) {
    $.ajax({
      type: 'delete', //get或post
      url: '/posts/' + id, //请求的地址
      data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',
      success: function (result) { //成功的回调函数
        // console.log(result);
        location.reload();
      }
    })
  }
})

//修改页面
$('#postsBox').on('click', '.edit', function () {
  var id = $(this).attr('data-id')
  console.log(id)
  $.ajax({
    type: 'put', //get或post
    url: '/posts/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      $.ajax({
        type: 'get', //get或post
        url: '/categories', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (categories) { //成功的回调函数
          result.categories = categories;
          // console.log(result);
          var html = template('modifyFormTpl', result);
          $('#modifyBox').html(html);
        }
      })

    }
  })
})

// 修改功能
$('#modifyBox').on('submit', '#modifyForm', function () {
  console.log($(this).serialize);
  var id = $(this).attr('data-id');
  var isConfirm = confirm('你真的要修改吗');
  console.log(id);
  if (isConfirm) {
    $.ajax({
      type: 'put', //get或post
      url: '/posts/' + id, //请求的地址
      data: $(this).serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',
      success: function (result) { //成功的回调函数
        // console.log(result)
        location.reload();
      }
    })
  }
  return false;
})