# frozen_string_literal: true

module Candidates
  class CreateValidator < BaseValidator
    validates :name, presence: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :birthdate, presence: true
    validate :past_birtdate

    def past_birtdate
      return if birthdate.blank?

      errors.add(:birthdate, :future_date) if birthdate >= Date.current
    end
  end
end
