module CandidateServices
  module V1
    module Show
      class Validator < Dry::Validation::Contract
        option :repository

        params do
          required(:id).filled(:string)
        end

        rule(:id) do |context:|
          context[:candidate] ||= repository.find_by(id: value)
          key.failure('candidate not found') unless context[:candidate]
        end
      end
    end
  end
end
