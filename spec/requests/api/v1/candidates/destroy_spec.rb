require 'rails_helper'
require 'support/factory_bot'
require 'requests/api/v1/shared_examples/destroy_request'

RSpec.describe 'Candidates' do
  describe 'Destroy' do
    let(:object) { create(:candidate) }

    it_behaves_like 'destroy request', 'candidates'
  end
end
