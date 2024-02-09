# frozen_string_literal: true

module Api
  module V1
    class CandidatesController < ApiController
      def create
        candidate = Candidates::CreateUseCase.new(candidate_params).call
        return head :unprocessable_entity unless candidate

        head :created
      end

      private

      def candidate_params
        params.require(:candidate).permit(:name, :email, :birthdate)
      end
    end
  end
end
