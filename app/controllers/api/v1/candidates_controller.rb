# frozen_string_literal: true

module Api
  module V1
    class CandidatesController < ApiController
      def index
        paginated_candidates = PaginateService.new(
          relation: Candidate.all,
          page:     params[:page]&.to_i,
          per_page: params[:per_page]&.to_i
        )

        render json: {
          candidates: paginated_candidates.call,
          meta:       paginated_candidates.meta
        }
      end

      def show
        candidate = Candidate.find(params[:id])
        render json: candidate
      end

      def create
        candidate = Candidates::CreateUseCase.new(candidate_params).call
        return head :unprocessable_entity unless candidate

        render json: {}, status: :created
      end

      def update
        candidate = Candidates::UpdateUseCase.new(params[:id], candidate_params).call
        return head :unprocessable_entity unless candidate

        render json: {}, status: :ok
      end

      def destroy
        candidate = Candidate.find(params[:id])
        candidate.destroy

        render json: {}, head: :ok
      end

      private

      def candidate_params
        params.require(:candidate).permit(:name, :email, :birthdate)
      end
    end
  end
end
