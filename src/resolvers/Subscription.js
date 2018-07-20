const newLinkSubscription = (parent, args, cont, inf) => {
  return cont.db.subscription.link({
    where: { mutation_in: ['CREATED'] }
  }, inf)
}

export const newLink = {
  subscribe: newLinkSubscription
}
