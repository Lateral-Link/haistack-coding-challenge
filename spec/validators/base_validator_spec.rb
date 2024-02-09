# frozen_string_literal: true

class Test
  class Validator < BaseValidator
    validates :name, presence: true
    validate :gmail_email

    def gmail_email
      return if email.to_s.ends_with?('@gmail.com')

      errors.add(:email, 'must be a Gmail address')
    end
  end
end

RSpec.describe BaseValidator do
  describe '.valid?' do
    subject(:valid?) { Test::Validator.valid?(candidate) }

    context 'when the candidate is valid' do
      let(:candidate) { build(:candidate, email: 'john@gmail.com') }

      it { is_expected.to be true }
    end

    context 'when the candidate is invalid' do
      let(:candidate) { build(:candidate, email: 'john@hotmail.com') }

      it { is_expected.to be false }
    end
  end

  describe '.validate!' do
    subject(:validate!) { Test::Validator.validate!(candidate) }

    context 'when the candidate is valid' do
      let(:candidate) { build(:candidate, email: 'john@gmail.com') }

      it { is_expected.to be true }
    end

    context 'when the candidate is invalid' do
      let(:candidate) { build(:candidate, name: '', email: 'john@hotmail.com') }

      it 'raises a ValidationError' do
        expect { validate! }.to raise_error(BaseValidator::ValidationError,
                                            "Name can't be blank, Email must be a Gmail address")
      end
    end
  end
end
