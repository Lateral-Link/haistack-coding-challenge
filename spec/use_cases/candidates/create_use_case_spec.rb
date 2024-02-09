# frozen_string_literal: true

RSpec.describe Candidates::CreateUseCase do
  describe '#call' do
    subject(:create_candidate) { described_class.new(params).call }

    let(:params) { { name: name, email: email, birthdate: birthdate } }
    let(:name) { 'John Doe' }
    let(:email) { 'email@example.com' }
    let(:birthdate) { '1990-01-01' }

    context 'when the candidate is valid' do
      before do
        allow(Candidates::CreateValidator).to receive(:valid?).and_return(true)
      end

      it 'creates a candidate' do
        expect { create_candidate }.to change(Candidate, :count).by(1)
      end

      it 'has the correct attributes' do
        create_candidate
        expect(Candidate.last).to have_attributes(name: name, email: email, birthdate: Date.parse(birthdate))
      end
    end

    context 'when the candidate is invalid' do
      before do
        allow(Candidates::CreateValidator).to receive(:valid?).and_return(false)
      end

      it 'does not create a candidate' do
        expect { create_candidate }.not_to change(Candidate, :count)
      end
    end
  end
end
