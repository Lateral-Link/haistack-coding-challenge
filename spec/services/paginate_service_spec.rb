# frozen_string_literal: true

RSpec.describe PaginateService do
  describe '#call' do
    subject(:paginate_service) { described_class.new(relation: relation, page: page, per_page: per_page) }

    let(:relation) { Candidate.all }
    let(:page) { 1 }
    let(:per_page) { 1 }

    context 'when there are records of the given relation' do
      before { create_list(:candidate, 2) }

      it 'returns first page of results' do
        expect(paginate_service.call.order(:id).map(&:attributes)).to eq([Candidate.first.attributes])
      end

      it 'returns only the number of records specified by per_page' do
        expect(paginate_service.call.count).to eq(1)
      end

      context 'when on second page' do
        let(:page) { 2 }

        it 'returns second page of results' do
          expect(paginate_service.call.order(:id).map(&:attributes)).to eq([Candidate.last.attributes])
        end
      end
    end

    context 'when the relation is empty' do
      let(:relation) { Candidate.all }

      it 'returns the relation' do
        expect(paginate_service.call).to eq([])
      end
    end
  end
end
