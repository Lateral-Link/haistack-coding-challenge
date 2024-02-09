# frozen_string_literal: true

module Candidates
  class UpsertValidator < BaseValidator
    validates :name, presence: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :birthdate, presence: true
    validate :past_birtdate
    validate :unique_email

    def past_birtdate
      return if birthdate.blank?

      errors.add(:birthdate, :future_date) if birthdate >= Date.current
    end

    def unique_email
      return if email.blank?
      return unless email_changed?

      errors.add(:email, :taken) if Candidate.exists?(email: email)
    end
  end
end
