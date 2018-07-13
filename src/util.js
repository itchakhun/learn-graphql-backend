import jwt from 'jsonwebtoken'

const APP_SECRET = 'Blopper_News_GraphQL'

export const getUserId = context => {
  const auth = context.request.get('Authorization')
  if (auth) {
    const token = auth.replace('Bearer', '')
    const {userId} = jwt.verify(token, APP_SECRET)
    return userId
  }
  throw new Error('Auth fail!')
}
