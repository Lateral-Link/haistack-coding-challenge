# frozen_string_literal: true

RSpec.describe Candidate do
  let(:candidate) { build(:candidate) }

  context 'with valid attributes' do
    it 'creates a candidate' do
      expect { candidate.save }.to change(described_class, :count).by(1)
    end
  end

  context 'with invalid attributes' do
    context 'with a null name' do
      before { candidate.name = nil }

      it 'does not create a candidate' do
        expect { candidate.save }.to raise_error(ActiveRecord::NotNullViolation)
      end
    end

    context 'with a null email' do
      before { candidate.email = nil }

      it 'does not create a candidate' do
        expect { candidate.save }.to raise_error(ActiveRecord::NotNullViolation)
      end
    end

    context 'with a repeated email' do
      before do
        create(:candidate, email: candidate.email)
      end

      it 'does not create a candidate' do
        expect { candidate.save }.to raise_error(ActiveRecord::RecordNotUnique)
      end
    end

    context 'with a null birthdate' do
      before { candidate.birthdate = nil }

      it 'does not create a candidate' do
        expect { candidate.save }.to raise_error(ActiveRecord::NotNullViolation)
      end
    end
  end
end
