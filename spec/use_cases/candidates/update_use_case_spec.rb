# frozen_string_literal: true

RSpec.describe Candidates::UpdateUseCase do
  describe '.call' do
    subject(:update_use_case) { described_class.new(candidate_id, params).call }

    let(:candidate_id) { candidate.id }
    let(:params) do
      {
        name:      'John Doe',
        email:     'john@doe.com',
        birthdate: 20.years.ago
      }
    end

    let(:candidate) { create(:candidate) }

    context 'when the candidate is valid' do
      it 'updates the candidate attributes' do
        update_use_case
        expect(candidate.reload).to have_attributes(
          id:        candidate.id,
          name:      'John Doe',
          email:     'john@doe.com',
          birthdate: 20.years.ago.to_date
        )
      end
    end

    context 'when the candidate is invalid' do
      before { allow(Candidates::UpsertValidator).to receive(:valid?).and_return(false) }

      it 'does not update the candidate attributes' do
        update_use_case
        expect(candidate.reload).to have_attributes(
          id:        candidate.id,
          name:      candidate.name,
          email:     candidate.email,
          birthdate: candidate.birthdate
        )
      end
    end
  end
end
