module CandidatesServices
  module Show
    class UseCase < DryService
      step :presenter

      def presenter(input)
        candidate = input
        Success(candidate)
      end
    end
  end
end
