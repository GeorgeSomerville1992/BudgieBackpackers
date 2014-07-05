class Hostel < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude,:arrivalDate, :departureDate,:attraction_type
  validates :address, presence: true
  validates :attraction_type, presence: true
  validates :departureDate, date: true
  validates :arrivalDate, date: true
  validates :departureDate,
          date: { after: :arrivalDate, message: 'you departure before you have left!' }


  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
  belongs_to :user

end
