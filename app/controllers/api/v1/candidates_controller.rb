module Api
  module V1
    class CandidatesController < ApplicationController
      before_action :set_candidate, only: %i[show update destroy]
      protect_from_forgery with: :null_session

      def index
        CandidatesServices::Index::UseCase.call(params) do |on|
          on.failure { |result| render json: { message: result }, status: :bad_request }
          on.success do |result|
            render json: { candidates: result[0], total_pages: result[1], candidates_size: result[2] }, status: :ok
          end
        end
      end

      def show
        CandidatesServices::Show::UseCase.call(@candidate) do |on|
          on.failure { |result| render json: { message: result }, status: :bad_request }
          on.success { |result| render json: result, status: :ok }
        end
      end

      def create
        CandidatesServices::Create::UseCase.call(candidate_params) do |on|
          on.failure { |result| render json: { error: result }, status: :unprocessable_entity }
          on.success { |result| render json: result, status: :created }
        end
      end

      def update
        CandidatesServices::Update::UseCase.call([candidate_params, @candidate]) do |on|
          on.failure { |result| render json: { error: result }, status: :unprocessable_entity }
          on.success { |result| render json: result, status: :ok }
        end
      end

      def destroy
        CandidatesServices::Destroy::UseCase.call(@candidate) do |on|
          on.failure { |result| render json: { error: result }, status: :unprocessable_entity }
          on.success { head :no_content }
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
