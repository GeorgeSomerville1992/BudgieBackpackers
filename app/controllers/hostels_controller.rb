class HostelsController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /hostels
  # GET /hostels.json
  def index
    @hostels = Hostel.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @hostels }
    end
  end

  # GET /hostels/1
  # GET /hostels/1.json
  def show
    @hostel = Hostel.find(params[:id])
      #gpo straight to the apis module then on to wgo- create a new object of it
      # call the address from wego... 
    # yelp = Apis::Yelp.new(@location.address)
    # @places = yelp.addresses
    # gon.places = JSON.parse @places
    expedia = Apis::ExpediaApi.new(@hostel.address,@hostel.arrivalDate,@hostel.departureDate)
    @api = expedia.get_hostels(@hostel.address,@hostel.arrivalDate,@hostel.departureDate)

    serialized = JSON.generate(@api)

    # JSON generator converts symbols to strings because JSON does not support symbols.
    # passing json document will produce a ruby hash with string keys inside
    # since we already have thus we can use symbols

    gon.hostels = JSON.parse(serialized, {:symbolize_names => true})
    gon.preference = "hello"
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @hostel }
    end
  end

  # GET /hostels/new
  # GET /hostels/new.json
  def new
    @hostel = Hostel.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @hostel }
    end
  end

  # GET /hostels/1/edit
  def edit
    @hostel = Hostel.find(params[:id])
  end

  # POST /hostels
  # POST /hostels.json
  def create
    @hostel = Hostel.new(params[:hostel])

    respond_to do |format|
      if @hostel.save
        format.html { redirect_to @hostel, notice: 'Hostel was successfully created.' }
        format.json { render json: @hostel, status: :created, location: @hostel }
      else
        format.html { render action: "new" }
        format.json { render json: @hostel.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /hostels/1
  # PUT /hostels/1.json
  def update
    @hostel = Hostel.find(params[:id])

    respond_to do |format|
      if @hostel.update_attributes(params[:hostel])
        format.html { redirect_to @hostel, notice: 'Hostel was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @hostel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /hostels/1
  # DELETE /hostels/1.json
  def destroy
    @hostel = Hostel.find(params[:id])
    @hostel.destroy

    respond_to do |format|
      format.html { redirect_to hostels_url }
      format.json { head :no_content }
    end
  end
end
