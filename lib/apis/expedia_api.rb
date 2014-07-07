module Apis
  class ExpediaApi
    attr_accessor :hostels

    API_KEY = "m5zs97x99nkugvee8pmadv7c"

    def initialize(hostellatitude,hostellongitude,hostelarrivalDate,hosteldepartureDate)
      Expedia::Utils.logger = Rails.logger

      Expedia.cid = 55505
      Expedia.api_key = 'yg7cfr2k3xp3t5r22s3mhymd'
      Expedia.shared_secret = '34EkxKBu'
      Expedia.locale = 'en_GB'
      Expedia.currency_code = 'GBP'
      Expedia.minor_rev = 26
      @api = Expedia::Api.new
      # @locations
    end 

    def get_hostels (hostellatitude,hostellongitude, hostelarrivalDate, hosteldepartureDate, hosteldistance)
      
      @api.get_list({ 
                      :latitude => hostellatitude,
                      :longitude => hostellongitude,
                      :propertyCategory => 1,
                      :arrivalDate => hostelarrivalDate.strftime("%m/%d/%Y"),
                      :departureDate => hosteldepartureDate.strftime("%m/%d/%Y"),
                      :searchRadius => hosteldistance,
                      :sort => "PRICE"

                       }).body
      #show error handling!!!
      # if result? APIError
    end

  end 

end 