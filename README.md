# DB設計

## uersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: members
- has_many :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users, through :members
- has_many :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|references|null: false, foreign_key: true|
|uesr_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group