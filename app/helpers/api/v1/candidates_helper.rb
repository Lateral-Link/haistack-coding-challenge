# frozen_string_literal: true

module Api
  module V1
    module CandidatesHelper
      def self.apply_filters_for_index(candidates, candidate_filters)
        candidate_filters.each do |key, value|
          case key
          when 'date_of_birth'
            candidates = candidates.where('date_of_birth', value) if value.present?
          when 'name'
            candidates = candidates.where('name LIKE ?', "#{value}%") if value.present?
          when 'email'
            candidates = candidates.where('email LIKE ?', "#{value}%") if value.present?
          end
        end
        candidates
      end
    end
  end
end
