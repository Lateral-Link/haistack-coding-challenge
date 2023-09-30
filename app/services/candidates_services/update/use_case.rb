module CandidatesServices
  module Update
    class UseCase < DryService
      step :update_candidate
      step :presenter

      def update_candidate(input)
        params, candidate = input
        candidate_params = {
          name: params[:name],
          email: params[:email],
          date_of_birth: params[:date_of_birth]
        }
        if candidate.update(candidate_params)
          Success(candidate)
        else
          Failure(candidate.errors.full_messages)
        end
      end

      def presenter(input)
        candidate = input
        Success(candidate)
      end
    end
  end
end
