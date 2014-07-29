class Post < ActiveRecord::Base

  attr_accessible :body, :date_created, :date_edited, :name, :picture, :title, :location
  mount_uploader :picture, PictureUploader

  belongs_to :user
  belongs_to :hostel
  has_many :comments
end
