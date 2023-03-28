module CandidateServices
  module V1
    module Create
      class UseCase < BaseService
        def call(request)
          valid_data = yield validator.call(request.params.to_h)
          candidate = yield persist.call(valid_data.to_h, :create)
          presenter = candidate.as_json(only: %i[id name email birth_date])

          Success(status: :created, presenter: presenter)
        end

        private

        # attr_reader :deserializer
        attr_reader :validator, :persist

        def initialize
          @validator = Validator.new(repository: Candidate)
          @persist = Utilities::Persist.new(Candidate)
        end
      end
    end
  end
end
