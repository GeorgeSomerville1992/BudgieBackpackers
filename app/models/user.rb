class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable,:timeoutable,:omniauthable,:confirm_within => 10.minute
          # :omniauth_providers => [:google_oauth2, ]

  # Setup accessible (or protected) attributes for your model


  attr_accessible :email, :password, :password_confirmation, :remember_me ,:name, :image, :provider, :uid, :profileImage
  validates :name, presence: true
  mount_uploader :profileImage, ProfileImageUploader
  # attr_accessible :title, :body

  has_many :hostels
  has_many :attractions
  has_many :posts
  has_many :comments
  

  def set_default_role
    self.role ||= Role.find_by_name('registered')
  end
  
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

  def self.find_for_twitter_oauth(auth, signed_in_resource=nil)
      user = User.where(:provider => auth.provider, :uid => auth.uid).first
      if user
        return user
      else
      registered_user = User.where(:email => auth.uid + "@twitter.com").first
      if registered_user
        return registered_user
      else
        user = User.create(name:auth.extra.raw_info.name,
                            provider:auth.provider,
                            uid:auth.uid,
                            email:auth.uid+"@twitter.com",
                            password:Devise.friendly_token[0,20],
                          )
      end
    end
  end

def self.find_for_foursquare_oauth2(auth, signed_in_user=nil)
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








