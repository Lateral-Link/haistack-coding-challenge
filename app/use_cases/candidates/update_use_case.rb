# frozen_string_literal: true

module Candidates
  class UpdateUseCase
    def initialize(candidate_id, params)
      @candidate_id = candidate_id
      @params = params
    end

    def call
      return unless valid?

      candidate.update!(candidate_params)
    end

    private

    def candidate
      @candidate ||= Candidate.find(@candidate_id).tap { |c| c.assign_attributes(candidate_params) }
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
