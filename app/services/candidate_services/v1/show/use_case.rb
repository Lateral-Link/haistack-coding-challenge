module CandidateServices
  module V1
    module Show
      class UseCase < BaseService
        def call(request)
          valid_data = validator.call(request.params.to_h)
          return Failure(valid_data) unless valid_data.success?
          return Failure(:not_found) unless valid_data.context[:candidate]

          presenter = valid_data.context[:candidate].as_json(only: %i[id name email birth_date])

          Success(status: :ok, presenter: presenter)
        end

        private

        attr_reader :validator

        def initialize
          @validator = Validator.new(repository: Candidate)
        end
      end
    end
  end
end
