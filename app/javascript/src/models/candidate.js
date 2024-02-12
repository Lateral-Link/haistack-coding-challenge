import dayjs from 'dayjs'

export default (candidate) => ({
  id: candidate.id,
  name: candidate.name,
  email: candidate.email,
  birthdate: dayjs(candidate.birthdate),

  toForm: () => ({
    name: candidate.name,
    email: candidate.email,
    birthdate: dayjs(candidate.birthdate),
    errors: {},
  }),
})

export const candidateMeta = (meta) => ({
  page: meta.page,
  perPage: meta.per_page,
  totalCount: meta.total_count,
  totalPages: meta.total_pages,
})
