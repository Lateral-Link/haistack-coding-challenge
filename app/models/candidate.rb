# frozen_string_literal: true

class Candidate < ApplicationRecord
  def as_json(options = {})
    serializable_fields = %i[id name email birthdate]
    super(options.merge(only: serializable_fields))
  end
end
