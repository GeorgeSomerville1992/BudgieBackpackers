class HostelsController < ApplicationController
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
