module Apis
  class ExpediaApi
    attr_accessor :hostels

    API_KEY = "m5zs97x99nkugvee8pmadv7c"

      def initialize(hostellatitude,hostellongitude,hostelarrivalDate,hosteldepartureDate, hosteldistance)
        Expedia::Utils.logger = Rails.logger

        Expedia.cid = 55505
        Expedia.api_key = 'yg7cfr2k3xp3t5r22s3mhymd'
        Expedia.shared_secret = '34EkxKBu'
        Expedia.locale = 'en_GB'
        Expedia.currency_code = 'GBP'
        Expedia.minor_rev = 26
        @api = Expedia::Api.new
        @price_api = Expedia::Api.new
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

      # response.status # Response status
      # response.error_body # Complete error body
      # response.category # Value indicating the nature of the exception or the reason it occurred
      # response.presentation_message # Presentation error message returned
      # response.verbose_message # More specific detailed error message
      # response.handling # value indicating the severity of the exception and how it may be handled
      end

      def get_hostels_prices(hostellatitude,hostellongitude, hostelarrivalDate, hosteldepartureDate, hosteldistance)
         @price_api.get_list({ 
                        :latitude => hostellatitude,
                        :longitude => hostellongitude,
                        :propertyCategory => 1,
                        :arrivalDate => hostelarrivalDate.strftime("%m/%d/%Y"),
                        :departureDate => hosteldepartureDate.strftime("%m/%d/%Y"),
                        :searchRadius => hosteldistance,
                        :sort => "PRICE"

                         }).body
      end    

      # rescue
      #   error(500, method_specific_error_code, "it all done broke")
      #   ## additional error notifications here if necessary.
      # end




  end 

end 