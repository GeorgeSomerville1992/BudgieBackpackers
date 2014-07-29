class Hostel < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude,:arrivalDate, :departureDate,:attraction_type,:distance
  validates :address, presence: true
  validates :attraction_type, presence: true
  validates :departureDate, date: true
  validates :arrivalDate, date: true
  validates :distance, :numericality => {:only_integer => true}
  validates :departureDate,
          date: { after: :arrivalDate, message: 'you have set the departure before you have left!' }
  validates :departureDate,
          date: { before: Proc.new { Time.now + 1.month }, message: 'Im sorry but thats to far away, my api will crash - try a week :)' }

  geocoded_by :address
  after_validation :geocode, :if => :address_changed?
  belongs_to :user
  has_many :posts 
end
