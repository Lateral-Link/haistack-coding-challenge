module CandidatesServices
  module Create
    class UseCase < DryService
      step :create_candidate
      step :presenter

      def create_candidate(input)
        params = input
        candidate_params = {
          name: params[:name],
          email: params[:email],
          date_of_birth: params[:date_of_birth]
        }
        candidate = Candidate.new(candidate_params)
        if candidate.save
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
