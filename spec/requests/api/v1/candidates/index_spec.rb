require 'rails_helper'
require 'support/factory_bot'
require 'requests/api/v1/shared_examples/index_request'
require 'requests/api/v1/shared_examples/filters'

RSpec.describe 'Candidates' do
  describe 'Index' do
    let(:objects) { create_list(:candidate, 3) }

    context 'with no filters' do
      it_behaves_like 'index request', 'candidates'
    end

    context 'with filters' do
      let(:object) { create(:candidate) }

      it_behaves_like 'filter', 'candidates', 'name', 'no_name'
      it_behaves_like 'filter', 'candidates', 'email', 'no_email'
      it_behaves_like 'filter', 'candidates', 'date_of_birth', '0000'
    end
  end
end
