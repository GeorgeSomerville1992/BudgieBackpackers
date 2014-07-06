class UsersController < Devise::RegistrationsController
  
  def index
    if user_signed_in?
     @users = User.all
     else
     redirect_to new_user_session_path, notice: "You need to sign in or sign up before continuing."
    end 
  end
  

  def create
    # run default version defined in Devise::RegistrationsController
    super

    # then add our custom logic
    @user.role = "user"
    @user.save!
  end

  def edit
    # log the ancestors of this controller
    # to confirm that we inherit from ApplicationController
    logger.info self.class.ancestors
    super
  end

end
