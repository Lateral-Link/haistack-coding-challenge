module CandidateServices
  module V1
    module Update
      class UseCase < BaseService
        def call(request)
          valid_data = validator.call(request.params.to_h)
          return Failure(:not_found) unless valid_data.context[:candidate]
          return Failure(valid_data) unless valid_data.success?

          candidate = yield persist.call(valid_data.to_h, :update, valid_data.context[:candidate])
          presenter = candidate.as_json(only: %i[id name email birth_date])

          Success(status: :ok, presenter: presenter)
        end

        private

        attr_reader :validator, :persist

        def initialize
          @validator = Validator.new(repository: Candidate)
          @persist = Utilities::Persist.new(Candidate)
        end
      end
    end
  end
end
