require 'rails_helper'
require 'support/factory_bot'
require 'requests/api/v1/shared_examples/create_request_with_good_params'
require 'requests/api/v1/shared_examples/create_request_with_bad_params'

RSpec.describe 'Candidates' do
  describe 'Create' do
    it_behaves_like 'create request with good params', 'candidates' do
      let(:params) { { candidate: attributes_for(:candidate) } }
      let(:klass) { Candidate }
    end

    it_behaves_like 'create request with bad params', 'candidates' do
      let(:candidate) { create(:candidate) }
      let(:params) { { candidate: attributes_for(:candidate, email: 'invalid_email') } }
    end
  end
end
