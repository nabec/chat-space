json.text @message.text
json.user_name @message.user.name
json.date @message.created_at.strftime("%y/%m/%d %H:%M")
json.image @message.image
json.user_id @message.user.id
json.id @message.id