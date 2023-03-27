# spec/routing/api/v1/candidates_routing_spec.rb
require 'rails_helper'

RSpec.describe Api::V1::CandidatesController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/api/v1/candidates').to route_to('api/v1/candidates#index')
    end

    it 'routes to #show' do
      expect(get: '/api/v1/candidates/1').to route_to('api/v1/candidates#show', id: '1')
    end

    it 'routes to #create' do
      expect(post: '/api/v1/candidates').to route_to('api/v1/candidates#create')
    end

    it 'routes to #update via PUT' do
      expect(put: '/api/v1/candidates/1').to route_to('api/v1/candidates#update', id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/api/v1/candidates/1').to route_to('api/v1/candidates#update', id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/api/v1/candidates/1').to route_to('api/v1/candidates#destroy', id: '1')
    end
  end
end
