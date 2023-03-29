class Api::V1::CandidatesController < ApplicationController
  def index
    call_action(index_candidate)
  end

  def show
    call_action(show_candidate)
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

  def index_candidate
    CandidateServices::V1::Index::UseCase.new
  end

  def show_candidate
    CandidateServices::V1::Show::UseCase.new
  end

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
