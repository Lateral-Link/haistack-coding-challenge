module Api
  module V1
    class CandidatesController < ApplicationController
      before_action :set_candidate, only: %i[show update destroy]
      protect_from_forgery with: :null_session

      def index
        candidates = Candidate.all
        render json: candidates
      end

      def show
        render json: @candidate
      end

      def create
        candidate = Candidate.new(candidate_params)
        if candidate.save
          render json: candidate, status: :created
        else
          render json: { error: candidate.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @candidate.update(candidate_params)
          render json: @candidate
        else
          render json: { error: @candidate.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        if @candidate.destroy
          head :no_content
        else
          render json: { error: @candidate.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_candidate
        @candidate = Candidate.find(params[:id])
      end

      def candidate_params
        params.require(:candidate).permit(:name, :email, :date_of_birth)
      end
    end
  end
end
