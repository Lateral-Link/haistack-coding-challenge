module CandidatesServices
  module Index
    class Contract < ApplicationContract
      params do
        optional(:term).filled(:string)
        optional(:order_column).filled(:string)
        optional(:order_direction).filled(:string)
        optional(:page).filled(:string)
      end
    end
  end
end
