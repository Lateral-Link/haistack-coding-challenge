# frozen_string_literal: true

module Candidates
  class CreateUseCase
    def initialize(params)
      @params = params
    end

    def call
      return unless valid?

      candidate.save!
    end

    private

    def candidate
      @candidate ||= Candidate.new(candidate_params)
    end

    def candidate_params
      {
        name:      @params[:name],
        email:     @params[:email],
        birthdate: @params[:birthdate]
      }
    end

    def valid?
      Candidates::UpsertValidator.valid?(candidate)
    end
  end
end
