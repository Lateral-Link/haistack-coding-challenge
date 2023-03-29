module CandidateServices
  module V1
    module Index
      class UseCase < BaseService
        def call(_request)
          candidates = Candidate.all
          presenter = candidates.as_json(only: %i[id name email birth_date])

          Success(status: :ok, presenter: presenter)
        end
      end
    end
  end
end
