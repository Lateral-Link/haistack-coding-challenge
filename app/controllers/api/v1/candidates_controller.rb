# frozen_string_literal: true

module Api
  module V1
    class CandidatesController < ApplicationController
      before_action :set_candidate, only: %i[show update destroy]

      # GET /api/v1/candidates
      def index
        limit = (params[:limit].presence || 15)
        offset = (params[:offset].presence || 0)
        candidates = Candidate.all
        candidates = Api::V1::CandidatesHelper.apply_filters_for_index(candidates, candidate_filters)

        api_response(
          {
            elements: candidates.limit(limit).offset(offset).order(created_at: :desc).as_json,
            ids: candidates.pluck(:id),
            count: candidates.count
          }, 'SUCCESS'
        )
      end

      # GET /api/v1/candidates/1
      def show
        if @candidate
          api_response(@candidate, 'SUCCESS')
        else
          api_response({}, 'NOT FOUND', 404)
        end
      end

      # POST /api/v1/candidates
      def create
        @candidate = Candidate.new(candidate_params)
        if @candidate.save
          api_response(@candidate, 'SUCCESS')
        else
          api_response({}, "ERROR: #{@candidate.errors.messages}", 422)
        end
      end

      # PATCH/PUT /api/v1/candidates/1
      def update
        if @candidate
          if @candidate.update(candidate_params)
            api_response(@candidate, 'SUCCESS')
          else
            api_response({}, "ERROR: #{@candidate.errors.messages}", 422)
          end
        else
          api_response({}, 'NOT FOUND', 404)
        end
      end

      # DELETE /api/v1/candidates/1
      def destroy
        return api_response({}, 'NOT FOUND', 404) unless @candidate
        return api_response({}, 'SUCCESS') if @candidate.destroy
      end

      private

      def set_candidate
        @candidate = Candidate.find_by(id: params[:id])
      end

      def candidate_params
        params.require(:candidate).permit(:name, :email, :date_of_birth)
      end

      def candidate_filters
        params.permit(:name, :email, :date_of_birth)
      end
    end
  end
end
