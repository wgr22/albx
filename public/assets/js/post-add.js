$.ajax({
  type: 'get', //get或post
  url: '/categories', //请求的地址
  data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  dataType: 'json',
  success: function (result) { //成功的回调函数
    console.log(result)
    var html = template('categoryTpl', {
      data: result
    })
    $('#category').html(html);
  }
})
//111111
$('#feature').on('change', function () {
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  $.ajax({
    type: 'post', //get或post
    url: '/upload', //请求的地址
    contentType: false,
    processData: false,
    data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result);
      $('.thumbnail').attr('src', result[0].avatar).show();
      $('#hiddenImg').val(result[0].avatar);
    }
  })
})

$('#addForm').on('submit', function () {
  console.log($(this).serialize());
  $.ajax({
    type: 'post', //get或post
    url: '/posts', //请求的地址
    data: $(this).serialize(), //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function (result) { //成功的回调函数
      console.log(result);
      location.href = 'posts.html'
    },
    error: function (error) {
      alert('发表失败');
    }
  })
  return false;

})