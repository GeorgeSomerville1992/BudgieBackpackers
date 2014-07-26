class HostelsController < ApplicationController
  before_filter :authenticate_user!
  include Yelp::V2::Search::Request
  
  # GET /hostels
  # GET /hostels.json
  def index
    @hostels = Hostel.all

    @posts = Post.all

    client = Foursquare2::Client.new(:client_id => 'PJOVUMNXMNMSCGSYVETRKZ23WN2LUR31M0AD04AMKTJAKI5I', 
                                    :client_secret => '3GG355R0B5D4KMH1J1UIUFXH2ZZCFH4ISOW5WTNYV11JJTDV',
                                    :api_version => '20120610',

                                    ) 
    # @foursquareFriends = client.user_friends(:user_id => 'self',
    #                                          :limit => 30
    #                                          )
    # serialized_foursquare = JSON.generate(@foursquareFriends)
    # gon.foursquareFreinds = JSON.parse(serialized_foursquare,{:symbolize_names => true})

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @hostels }
    end
  end

  # GET /hostels/1
  # GET /hostels/1.json

  # def search
  #   client = Yelp::Client.new

  #    request = GeoPoint.new(
  #                :term => 'thai',
  #                :category_filter => 'food,restaurants',
  #                :limit => 20,
  #                :radius_filter => 8047,
  #                :latitude => 37.782093,
  #                :longitude => -122.483230)
  #    @hostel_attractions = client.search(request)





  # end 


  def show
    @hostel = Hostel.find(params[:id])
      #gpo straight to the apis module then on to wgo- create a new object of it
      # call the address from wego... 
    # yelp = Apis::Yelp.new(@location.address)
    # @places = yelp.addresses
    # gon.places = JSON.parse @places
    expedia = Apis::ExpediaApi.new(@hostel.latitude, @hostel.longitude,@hostel.arrivalDate,@hostel.departureDate,@hostel.distance)
    @api = expedia.get_hostels(@hostel.latitude,@hostel.longitude,@hostel.arrivalDate,@hostel.departureDate,@hostel.distance)

    # order by descending distance to user
    @api["HotelListResponse"]["HotelList"]["HotelSummary"].sort_by! { |hs| hs["proximityDistance"] }

    # add index of each hotel summary
    @api["HotelListResponse"]["HotelList"]["HotelSummary"].each_with_index { |hs, indx| hs["indx"] = indx + 1 }

    serialized = JSON.generate(@api)

      
    gon.hostels = JSON.parse(serialized, {:symbolize_names => true})

    expedia_prices = Apis::ExpediaApi.new(@hostel.latitude, @hostel.longitude,@hostel.arrivalDate,@hostel.departureDate,@hostel.distance)
    @price_api = expedia_prices.get_hostels_prices(@hostel.latitude,@hostel.longitude,@hostel.arrivalDate,@hostel.departureDate,@hostel.distance)

    serialized_price = JSON.generate(@price_api)

    gon.hostel_price_sort = JSON.parse(serialized_price, {:symbolize_names => true})

    # yelp = Apis::Yelp.new(@hostel.attraction_type, @hostel.address)
    #   @hostel_attractions_deals = yelp.hostel_attractions_deals
      
    #   yelp = Apis::Yelp.new(@hostel.attraction_type,@hostel.address)
    # # request = GeoPoint.new(
    # #          :latitude => 37.782093,
    # #          :longitude => -122.483230)

    # # yelp = Yelp.client.search(@borough, { 
    # #     :latitude => @hostel.latitude,
    # #          :longitude => @hostel.longitude
    # #  })
    # # binding.pry                         
    
    #   @hostel_attractions = yelp.hostel_attractions
    #   gon.hostel_attractions = JSON.parse @hostel_attractions


    # request = GeoPoint.new(
    #          :latitude => 37.782093,
    #          :longitude => -122.483230)

    # yelp = Yelp.client.search(@borough, { 
    #     :latitude => @hostel.latitude,
    #          :longitude => @hostel.longitude
    #  })
                         
    
      

     client = Foursquare2::Client.new(:client_id => 'PJOVUMNXMNMSCGSYVETRKZ23WN2LUR31M0AD04AMKTJAKI5I', 
                                    :client_secret => '3GG355R0B5D4KMH1J1UIUFXH2ZZCFH4ISOW5WTNYV11JJTDV',
                                    :api_version => '20120610',

                                    ) 


       # @foursquare = client.search_venues(:ll => '@hostel.latitude,@hostel.longitude', 
       #  :query => @hostel.attraction_type)

    #begin 
    @foursquare = client.explore_venues(:near => @hostel.address, 
        :query => @hostel.attraction_type ,:price => 1,
        :venuePhotos => :true
        )
    @foursquare["groups"][0]["items"].each_with_index { |hs, indx| hs["indxx"] = indx + 1 }
    # Foursquare2::APIError server_error: Foursquare servers are experiencing problems.


    serialized_foursquare = JSON.generate(@foursquare)
    gon.hostel_attraction_foursquare = JSON.parse(serialized_foursquare,{:symbolize_names => true})
    

    @foursquare_topPics = client.explore_venues(:near => @hostel.address,
      :secion => 'topPicks', :venuePhotos => :true, :limit => 3
      )   
    serialized_foursquare_topPics = JSON.generate(@foursquare_topPics)
    gon.hostel_attraction_foursquare_topPics = JSON.parse(serialized_foursquare_topPics,{:symbolize_names => true})


    # yelp = Apis::Yelp.new(@hostel.attraction_type, @hostel.address )

    # JSON generator converts symbols to strings because JSON does not support symbols.
    # passing json document will produce a ruby hash with string keys inside
    # since we already have thus we can use symbols
    
    
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
