class Api::V1::CandidatesController < ApplicationController
  def index
    @candidates = Candidate.all
    render json: @candidates.as_json(only: %i[id name email birth_date])
  end

  def show
    @candidate = Candidate.find(params[:id])
    render json: @candidate.as_json(only: %i[id name email birth_date])
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
