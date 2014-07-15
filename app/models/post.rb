class Post < ActiveRecord::Base
  attr_accessible :body, :datecreated, :dateedited, :name, :picture, :title
  belongs_to :user
  belongs_to :hostel 
end
