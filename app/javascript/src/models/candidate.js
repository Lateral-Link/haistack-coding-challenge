import dayjs from 'dayjs'

export default (candidate) => ({
  id: candidate.id,
  name: candidate.name,
  email: candidate.email,
  birthdate: dayjs(candidate.birthdate),
})
