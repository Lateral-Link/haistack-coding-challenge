# frozen_string_literal: true

class PaginateService
  DEFAULT_PAGE = 1
  DEFAULT_PER_PAGE = 20
  MAX_PER_PAGE = 100

  def initialize(relation:, page: DEFAULT_PAGE, per_page: DEFAULT_PER_PAGE)
    @relation = relation
    @page = page
    @per_page = [per_page, MAX_PER_PAGE].min
  end

  def call
    @relation.offset(offset).limit(per_page)
  end

  def meta
    { page: page, per_page: per_page, total_entries: total_entries, total_pages: total_pages }
  end

  private

  attr_reader :relation, :page, :per_page

  def offset
    (page - 1) * per_page
  end

  def total_pages
    (total_entries.to_f / per_page).ceil
  end

  def total_entries
    @total_entries ||= relation.offset(nil).limit(nil).count
  end
end
