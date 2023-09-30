module CandidatesServices
  module Index
    class UseCase < DryService
      step :validate_params
      step :search_candidates
      step :order_candidates
      step :presenter

      def validate_params(input)
        params = input
        contract = Contract.new
        result = contract.call(params)
        if result.success?
          Success(input)
        else
          Failure('Invalid parameters')
        end
      end

      def search_candidates(input)
        params = input
        term = params[:term]
        sanitized_term = "%#{term}%"
        candidates_size = Candidate.all.size
        candidates = if term.present?
                       Candidate.where('name LIKE :term OR email LIKE :term OR date_of_birth LIKE :term',
                                       term: sanitized_term)
                     else
                       Candidate.all
                     end
        Success([params, candidates, candidates_size])
      end

      def order_candidates(input)
        params, candidates, candidates_size = input
        order_column = params[:order_column]
        order_direction = params[:order_direction] || 'asc'

        candidates = case order_column
                     when 'name'
                       candidates.order(name: order_direction)
                     when 'email'
                       candidates.order(email: order_direction)
                     when 'date_of_birth'
                       candidates.order(date_of_birth: order_direction)
                     else
                       candidates.order(name: 'asc')
                     end

        candidates = candidates.page(params[:page]).per(10)
        total_pages = candidates.total_pages
        Success([candidates, total_pages, candidates_size])
      end

      def presenter(input)
        candidates, total_pages, candidates_size = input
        Success([candidates, total_pages, candidates_size])
      end
    end
  end
end
