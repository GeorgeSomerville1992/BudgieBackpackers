class Post < ActiveRecord::Base
  attr_accessible :body, :date_created, :date_edited, :name, :picture, :title
  belongs_to :user
  belongs_to :hostel
  has_many :comments
end
