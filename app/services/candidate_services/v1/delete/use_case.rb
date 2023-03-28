module CandidateServices
  module V1
    module Delete
      class UseCase < BaseService
        def call(request)
          valid_data = validator.call(request.params.to_h)
          return Failure(:not_found) unless valid_data.context[:candidate]
          return Failure(valid_data) unless valid_data.success?

          candidate = yield persist.call(valid_data.to_h, :delete, valid_data.context[:candidate])
          presenter = { message: 'Candidate deleted' }

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
