class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable,:timeoutable,:omniauthable,:confirm_within => 10.minute,
         :omniauth_providers => [:google_oauth2]

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name , :image
  # attr_accessible :title, :body

  has_many :hostels
  has_many :attractions
  
    def self.find_for_google_oauth2(auth, signed_in_user=nil)
    if user = signed_in_user || User.find_by_email(auth.info.email)
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name if user.name.blank?
      user.image = auth.info.image if user.image.blank?
      user.save
      user
    else
      where(auth.slice(:provider, :uid)).first_or_create do |user|
        user.provider = auth.provider
        user.uid = auth.uid
        user.name = auth.info.name
        user.email = auth.info.email
        user.image = auth.info.image
        user.password = Devise.friendly_token[0,20]
        user.skip_confirmation! # don't require email confirmation
      end
    end
  end
end

def self.new_with_session(params,session)
  super.tap do |user|
    if auth = session["devise.google_data"]
      user.name = auth.info.name if user.name.blank?
      user.image = auth.info.image if user.image.blank?
      user.skip_confirmation!
    end 
  end #google this 
end 
