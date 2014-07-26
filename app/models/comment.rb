class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :post
  attr_accessible :body, :date_logged, :name , :user, :post_id
end
