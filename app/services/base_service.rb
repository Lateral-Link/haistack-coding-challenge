require 'dry/monads'
require 'dry/matcher/result_matcher'

Dry::Validation.load_extensions(:monads)

class BaseService
  include Dry::Monads[:do, :result, :try]
end
