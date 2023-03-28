class Api::V1::CandidatesController < ApplicationController
  def index
    @candidates = Candidate.all
    render json: @candidates
  end

  def show
    render json: @candidate
  end

  def create
    call_action(create_candidate)
  end

  def update
    call_action(update_candidate)
  end

  def destroy
    call_action(delete_candidate)
  end

  private

  def create_candidate
    CandidateServices::V1::Create::UseCase.new
  end

  def update_candidate
    CandidateServices::V1::Update::UseCase.new
  end

  def delete_candidate
    CandidateServices::V1::Delete::UseCase.new
  end
end
