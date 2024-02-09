# frozen_string_literal: true

# PaginateService is responsible for paginating a relation and returning metadata about the pagination.
class PaginateService
  DEFAULT_PAGE = 1
  DEFAULT_PER_PAGE = 20
  MAX_PER_PAGE = 100

  # Initializes a new instance of PaginateService.
  #
  # @param relation [Object] The relation object to paginate.
  # @param page [Integer] The page number to retrieve (default: 1).
  # @param per_page [Integer] The number of records per page (default: 20).
  def initialize(relation:, page: nil, per_page: nil)
    @relation = relation
    @page = page || DEFAULT_PAGE
    @per_page = [per_page || DEFAULT_PER_PAGE, MAX_PER_PAGE].min
  end

  # Paginates the relation based on the specified page and per_page values.
  #
  # @return [Object] The paginated relation.
  def call
    @relation.offset(offset).limit(per_page)
  end

  # Returns metadata about the pagination.
  #
  # @return [Hash] The metadata hash containing page, per_page, total_count, and total_pages.
  def meta
    { page: page, per_page: per_page, total_count: total_count, total_pages: total_pages }
  end

  private

  attr_reader :relation, :page, :per_page

  def offset
    (page - 1) * per_page
  end

  def total_pages
    (total_count.to_f / per_page).ceil
  end

  def total_count
    @total_count ||= relation.offset(nil).limit(nil).count
  end
end
