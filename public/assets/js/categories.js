$('#addCategory').on('submit',function(){
  console.log($(this).serialize());
  $.ajax({
    type:'post',//get或post
    url:'/categories',//请求的地址
    data:$(this).serialize(),//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false;
})

$.ajax({
  type:'get',//get或post
  url:'/categories',//请求的地址
  // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
  // dataType:'json',
  success:function(result){//成功的回调函数
    // console.log(result)
    var html = template('categoryListTpl', { data: result });
    // console.log(html);
    $('#categoryBox').html(html);
  }
})
//修改按钮
$('#categoryBox').on('click','.edit',function(){
  var id = $(this).attr('data-id');
  $.ajax({
    type:'get',//get或post
    url:'/categories/' + id,//请求的地址
    // data:{},//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      var html = template('modifyCategoryTpl',result);
      $('#formBox').html(html);
    }
  })
})
// 保存修改
$('#formBox').on('submit','#modifyCategory',function(){
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type:'put',//get或post
    url:'/categories/' + id,//请求的地址
    data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    // dataType:'json',
    success:function(result){//成功的回调函数
      // console.log(result)
      location.reload();
    }
  })
  return false;
})

//删除按钮
$('#categoryBox').on('click','.delete',function(){
  if(confirm('您真的要执行删除操作吗')) {
    var id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',
      url: '/categories/' + id,
      success: function() {
        location.reload();
      }
    })
  }
})


