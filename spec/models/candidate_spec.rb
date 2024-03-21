require 'rails_helper'

RSpec.describe Candidate, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:date_of_birth) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to allow_value('valid_email@example.com').for(:email) }
    it { is_expected.not_to allow_value('invalid_email').for(:email) }
  end

  describe 'validates date of birth' do
    it 'date of birth is in the past' do
      future_date = Time.zone.today + 1
      candidate = build(:candidate, date_of_birth: future_date)
      expect(candidate).not_to be_valid
    end

    it 'includes an appropriate error message for date of birth' do
      future_date = Time.zone.today + 1
      candidate = build(:candidate, date_of_birth: future_date)
      candidate.valid?
      expect(candidate.errors[:date_of_birth]).to include('must be in the past')
    end
  end
end
