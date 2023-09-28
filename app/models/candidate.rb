class Candidate < ApplicationRecord
  self.primary_key = :id
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validate :date_of_birth_in_past
  validate :minimum_age
  validate :maximum_age

  def date_of_birth_in_past
    return unless date_of_birth.present? && date_of_birth > Date.current

    errors.add(:date_of_birth, 'must be in the past')
  end

  def minimum_age
    return unless date_of_birth.present? && date_of_birth > 16.years.ago.to_date

    errors.add(:date_of_birth, 'must be at least 16 years old')
  end

  def maximum_age
    return unless date_of_birth.present? && date_of_birth < 70.years.ago.to_date

    errors.add(:date_of_birth, 'must be at most 70 years old')
  end
end
