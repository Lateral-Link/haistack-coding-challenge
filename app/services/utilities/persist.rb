module Utilities
  class Persist < BaseService
    def initialize(repository)
      @repository = repository
    end

    def call(action = nil, args = nil , record = nil)
      case action
      when :create
        record = @repository.create!(args)
      when :update
        record.assign_attributes(args)
        record.update!(args) if record.changed?
      when :delete
        record.destroy!
      else
        raise ArgumentError, "Invalid action: #{action.inspect}"
      end
      Success(record)
    rescue StandardError
      Failure(:internal_server_error)
    end
  end
end
