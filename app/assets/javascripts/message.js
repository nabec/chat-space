$(document).on('turbolinks:load', function() {
  $(function() {
    function buildMessage(message){
      var image = (message.image.url)? `<img class="message__image" src="${message.image.url}">`:"";
      var html = `<div class="message" data-group-id="${message.group_id}" data-message-id="${message.id}">
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
                      ${image}
                  </div>`
      return html;
    };

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
        $('#new_message')[0].reset();
        $('.submit-btn').attr('disabled',false);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        return false;
      })
      .fail(function(){
        alert('メッセージを入力してください。');
        $('.submit-btn').attr('disabled',false)
      })
    });

 
    var reloadMessages = function() {
      if (location.href.match(/\/groups\/\d+\/messages/)) {
        var last_message_id = $('.message:last').data('messageId');
        $.ajax({
          url: `api/messages`,
          type:'GET',
          dataType:'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          messages.forEach(function(message){
            var insertHTML = buildMessage(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        })
      };
    }
    setInterval(reloadMessages, 5000);
  });
});