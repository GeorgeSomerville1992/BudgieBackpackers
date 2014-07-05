class Attraction < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude, :attraction_type
  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
  belongs_to :user
end
