module Apis
  class Yelp
      

      attr_accessor :attractions
      def initialize (address, attraction) 
        consumer_key = 'P7_cdbPT5-wPbBA3qqeuaw'
        consumer_secret = 'R8TM_c64tBrvZsG8hgzuTQkf89U'
        token = 'FXFXzOBlupI8XWQIT3BgqBRlQ2diyJHe'
        token_secret = 'mYRVlorubHfxVyc_QaDCfqTb9ck'
        api_host = 'api.yelp.com'





        consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => "http://#{api_host}"})
        access_token = OAuth::AccessToken.new(consumer, token, token_secret)
        path = "/v2/search?location=#{address}&term=#{attraction}&radius_filter=4000"
        @attractions = access_token.get(path).body
      end  
  end
end
 