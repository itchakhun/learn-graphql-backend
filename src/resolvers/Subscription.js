const newLinkSubscription = (parent, args, cont, inf) => {
  return cont.db.subscription.link({
    where: { mutation_in: ['CREATED'] }
  }, inf)
}

export const newLink = {
  subscribe: newLinkSubscription
}

const newVoteSubscribe = (parent, args, cont, inf) => {
  return cont.db.subscription.vote({
    where: {mutation_in:['CREATED']}
  }, inf)
}

export const newVote = {
  subscribe: newVoteSubscribe
}