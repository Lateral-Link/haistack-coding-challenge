module CandidatesServices
  module Destroy
    class UseCase < DryService
      step :destroy_candidate

      def destroy_candidate(input)
        candidate = input
        if candidate.destroy
          Success(candidate)
        else
          Failure(candidate.errors.full_messages)
        end
      end
    end
  end
end
