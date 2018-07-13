import bcrypt from 'bcryptjs';
import {getUserId} from '../util';

export const post = (r, a, c, i) => {
  const userId = getUserId(c)
  return c.db.createLink({
    data: {
      url: a.url,
      description: a.description,
      postedBy: {connect:{id: userId}}
    }
  }, i)
}

export const signup = async (r,a,c,i) => {
  const password = await bcrypt.hash(a.password, 10)
  const user = await c.db.mutation.createUser({
    data: Object.assign(a, {password})
  });
  const token = await jwt.sign({userId: user.id}, APP_SECRET)

  return {
    token, user
  }
}

export const login = async (r,a,c,i) => {
  const user = await c.db.query.user({where: {email: a.email}}, '{ id password }')
  if (!user) {
    throw new Error('No user found!')
  }

  const valid = await bcrypt.compare(a.password, user.password)

  if (!valid) {
    throw new Error('Wrong password!')
  }

  const token = jwt.sign({userId: user.id}, APP_SECRET)

  return {toekn, user}
}
