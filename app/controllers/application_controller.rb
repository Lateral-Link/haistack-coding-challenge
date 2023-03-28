# frozen_string_literal: true

require 'dry/matcher/result_matcher'

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  private

  def call_action(use_case)
    Dry::Matcher::ResultMatcher.call(use_case.call(request)) do |on|
      on.success { |status:, presenter:| render json: presenter, status: status }

      on.failure(Dry::Validation::Result) do |validation|
        render json: { errors: validation.errors.to_h }, status: :unprocessable_entity
      end

      on.failure(:not_found) do
        render json: { error: 'not found' }, status: :not_found
      end

      on.failure do
        render json: { error: 'internal server error' }, status: :internal_server_error
      end
    end
  end
end
