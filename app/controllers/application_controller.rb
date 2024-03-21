# frozen_string_literal: true

class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def api_response(data = {}, status_message = '', status_code = 200)
    render json: {
      data: data,
      status: status_message
    }, status: status_code
  end
end
