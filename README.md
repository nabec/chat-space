# DB設計

## uersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Association
- has_many :messages
- has_many :groups, through: members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false,|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|title|string|null: false|

### Association
- has_many :messages
- has_many :users, through :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|uesr_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group