class Candidate < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validate :date_of_birth_in_past

  def date_of_birth_in_past
    return unless date_of_birth.present? && date_of_birth > Date.current

    errors.add(:date_of_birth, 'must be in the past')
  end
end
