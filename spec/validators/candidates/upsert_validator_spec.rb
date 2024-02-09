# frozen_string_literal: true

RSpec.describe Candidates::UpsertValidator do
  describe '.valid?' do
    subject { described_class.valid?(candidate) }

    let(:candidate) { build(:candidate) }

    context 'when the candidate is valid' do
      it { is_expected.to be true }
    end

    context 'when the name is blank' do
      before { candidate.name = '' }

      it { is_expected.to be false }
    end

    context 'when the email is blank' do
      before { candidate.email = '' }

      it { is_expected.to be false }
    end

    context 'when the email is invalid' do
      before { candidate.email = 'my.email.at.example.com' }

      it { is_expected.to be false }
    end

    context 'when the email is already taken' do
      before { create(:candidate, email: candidate.email) }

      it { is_expected.to be false }
    end

    context 'when the birthdate is blank' do
      before { candidate.birthdate = nil }

      it { is_expected.to be false }
    end

    context 'when the birthdate is in the future' do
      before { candidate.birthdate = 1.day.from_now }

      it { is_expected.to be false }
    end

    context 'when the birthdate is today' do
      before { candidate.birthdate = Date.current }

      it { is_expected.to be false }
    end
  end
end
