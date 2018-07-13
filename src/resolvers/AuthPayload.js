export const user = (r,a,c,i) => c.db.query.user({where: {id: r.user.id}}, i)
