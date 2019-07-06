$.ajax({
  type: 'get', //get或post
  url: '/comments', //请求的地址
  data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数
    console.log(result);
    var html = template('commentsTpl', result);
    $('#commentsBox').html(html);
    var page = template('pageTpl', {
      display: result.display,
      page: result.page,
      pages: result.pages
    });
    $('#pageBox').html(page);
  }
})

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

// 分页

function changePage(page) {
  $.ajax({
    type: 'get', //get或post
    url: '/comments', //请求的地址
    data: {
      page: page
    }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数    
      var html = template('commentsTpl', result);
      $('#commentsBox').html(html);
      var page = template('pageTpl', {
        display: result.display,
        page: result.page,
        pages: result.pages
      });
      $('#pageBox').html(page);
    }
  })
}

//实现批准驳回功能
$('#commentsBox').on('click', '.status', function () {
  var id = $(this).attr('data-id');
  var status = $(this).attr('data-status');
  $.ajax({
    type: 'put', //get或post
    url: '/comments/' + id, //请求的地址
    data: {
      state: status == 1 ? 0 : 1
    }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result)
      location.reload()
    }
  })
  return false
})

//删除
$('#commentsBox').on('click', '.delete', function () {
  if (confirm('确定要删除吗?')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'delete', //get或post
      url: '/comments/' + id, //请求的地址
      data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
      dataType: 'json',
      success: function (result) { //成功的回调函数
        console.log(result)
        location.reload();
      }
    })
  }
})