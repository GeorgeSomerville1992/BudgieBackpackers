class Hostel < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude,:arrivalDate, :departureDate,:attraction_type
  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
  belongs_to :user
end
