# frozen_string_literal: true

# Base class for all validators.
# This class provides a simple interface for validating objects using ActiveModel validations.
#
# Usage:
#
#   class CreateCandidateValidator < BaseValidator
#     validates :name, presence: true
#     validates :email, presence: true, email: true
#   end
#
#   candidate = Candidate.new(name: '', email: 'john@example.com')
#   CreateCandidateValidator.valid?(candidate) # => false
#   CreateCandidateValidator.validate!(candidate) # => raises BaseValidator::ValidationError
class BaseValidator < SimpleDelegator
  class ValidationError < StandardError; end

  include ActiveModel::Validations

  # Checks if the object is valid based on the defined validations.
  #
  # @param object [Object] The object to be validated.
  # @param params [Hash] Additional parameters for validation.
  # @return [Boolean] Returns true if the object is valid, false otherwise.
  def self.valid?(object, params = {})
    new(object, params).valid?
  end

  # Validates the object and raises a ValidationError if it is not valid.
  #
  # @param object [Object] The object to be validated.
  # @param params [Hash] Additional parameters for validation.
  def self.validate!(object, params = {})
    validator = new(object, params)
    return true if validator.valid?

    raise ValidationError, validator.errors.full_messages.join(', ')
  end

  # Initializes a new instance of BaseValidator.
  #
  # @param object [Object] The object to be validated.
  # @param params [Hash] Additional parameters for validation.
  def initialize(object, params = {})
    super(object)
    @object = object
    @params = params
  end
end
