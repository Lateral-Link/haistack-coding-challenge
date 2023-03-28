module CandidateServices
  module V1
    module Create
      class Validator < Dry::Validation::Contract
        option :repository

        params do
          required(:name).filled(:string)
          required(:email).filled(:string)
          required(:birth_date).filled(:date)
        end

        rule(:email) do
          key.failure('email must be valid') unless value.match?(/\A[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+\z/i)
          key.failure('must be unique') if repository.exists?(email: value)
        end

        rule(:birth_date) do
          key.failure('must be in the past') if value > Date.today
        end
      end
    end
  end
end
