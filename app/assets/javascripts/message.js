$(function() {


  function buildMessage(message){
    var MessageImage = '';
    if (message.image.url){
      MessageImage = `<img class="message__image" src="${message.image.url}">`
    }
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    ${message.text}
                  </p>
                    ${MessageImage}
                </div>`
    return html;
  }


  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#message_text').val('');
      // $('#message_image').attr('name','');
      $('.submit-btn').attr('disabled',false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      return false;
    })
    .fail(function(){
      alert('メッセージを入力してください。');
      $('.submit-btn').attr('disabled',false)
    })
  })
});