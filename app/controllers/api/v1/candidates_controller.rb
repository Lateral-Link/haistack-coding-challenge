module Api
  module V1
    class CandidatesController < ApplicationController
      before_action :set_candidate, only: %i[show update destroy]
      protect_from_forgery with: :null_session

      def index
        term = params[:term]
        sanitized_term = "%#{term}%"
        order_column = params[:order_column]
        order_direction = params[:order_direction] || 'asc'
        candidates_size = Candidate.all.size
        candidates = if term.present?
                       Candidate.where('name LIKE :term OR email LIKE :term OR date_of_birth LIKE :term',
                                       term: sanitized_term)
                     else
                       Candidate.all
                     end

        candidates = case order_column
                     when 'name'
                       candidates.order(name: order_direction)
                     when 'email'
                       candidates.order(email: order_direction)
                     when 'date_of_birth'
                       candidates.order(date_of_birth: order_direction)
                     else
                       candidates.order(name: 'asc')
                     end

        candidates = candidates.page(params[:page]).per(10)
        total_pages = candidates.total_pages

        render json: { candidates: candidates, total_pages: total_pages, candidates_size: candidates_size }
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
