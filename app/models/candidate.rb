class Candidate < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :date_of_birth, presence: true
  validate :date_of_birth_in_past

  private

  def date_of_birth_in_past
    errors.add(:date_of_birth, 'must be in the past') if date_of_birth && date_of_birth > Date.today
  end
end
