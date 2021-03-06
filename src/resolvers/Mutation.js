import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {getUserId} from '../util';

const APP_SECRET = 'code.crafted.hand'

export const post = (r, a, c, i) => {
  const userId = getUserId(c)
  return c.db.mutation.createLink({
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
  }, '{id}');
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

  return {token, user}
}


export const vote = async (rt, args, cont, inf) => {
  const userId = getUserId(c)
  const linkExits = await cont.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId }
  })
  if (linkExits) {
    throw new Error('You have already voted!')
  }
  return cont.db.mutation.createVote({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } }
    }
  }, inf)
}
