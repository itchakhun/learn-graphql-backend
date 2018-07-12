const Query = {
  info: () => 'This is Blopper news',
  feeds: (rot,arg,con,inf) => con.db.query.links({}, inf)
};

const Mutation = {
  post: (_, arg, con, inf) => {
    return con.db.createLink({
      data: {
        url: arg.url,
        description: arg.description
      }
    }, inf)
  },
};

module.exports = {Query, Mutation}
