module CandidateServices
  module V1
    module Update
      class Validator < Dry::Validation::Contract
        option :repository

        params do
          required(:id).filled(:string)
          optional(:name).filled(:string)
          optional(:email).filled(:string)
          optional(:birth_date).filled(:date)
        end

        rule(:id) do |context:|
          context[:candidate] ||= repository.find_by(id: value)
          key.failure('candidate not found') unless context[:candidate]
        end

        rule(:email) do
          key.failure('email must be valid') unless value&.match?(/\A[\w+\-.]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]+\z/i)
          if repository.where(email: value).where.not(id: _context[:candidate]&.id).exists?
            key.failure('must be unique')
          end
        end

        rule(:birth_date) do
          key.failure('must be in the past') if value&.>(Date.today)
        end
      end
    end
  end
end
