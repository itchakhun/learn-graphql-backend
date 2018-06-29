const links = [
  {
    id: 'LINK1',
    description: 'asd',
    url: 'www.sadasd.com'
  }
];

export const Query = {
  info: () => 'This is Blopper news',
  feeds: () => links,
  link: (_, { id }) => links.find(e => e.id === id)
};

export const Mutation = {
  post: (_, args) => {
    const { description, url } = args;
    const link = {
      id: `LINK${links.length + 1}`,
      description,
      url
    };
    links.push(link);
    return link;
  },
  put: (_, args) => {
    const { id } = args;
    const index = links.findIndex(e => e.id === id);
    if (index > -1) {
      links[index] = args;
      return links[index];
    }
    throw new Error('Fail to update');
  },
  delete: (_, args) => {
    const { id } = args;
    const index = links.findIndex(e => e.id === id);
    if (index > -1) {
      const remove = links[index];
      links.splice(index, 1);
      return remove;
    }
    throw new Error('Fail to update');
  }
};
