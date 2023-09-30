class DryService
  include Dry::Transaction
  include Dry::Monads[:result]

  def self.call(*args, &block)
    new.call(*args, &block)
  end

  RETURNS = [
    SUCCESS = :success,
    FAILURE = :failure
  ].freeze
end
