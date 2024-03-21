require 'rails_helper'
require 'support/factory_bot'
require 'requests/api/v1/shared_examples/update_request_with_good_params'
require 'requests/api/v1/shared_examples/update_request_with_bad_params'

RSpec.describe 'Candidates' do
  describe 'Update' do
    let(:object) { create(:candidate) }

    it_behaves_like 'update request with good params', 'candidates' do
      let!(:field) { 'name' }
      let!(:expected_value) { 'new name' }
      let(:params) { { candidate: { field.to_sym => expected_value } } }
    end

    it_behaves_like 'update request with bad params', 'candidates' do
      let(:error_field) { 'email' }
      let(:params) { { candidate: { email: 'invalid_email' } } }
    end
  end
end
