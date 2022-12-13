const makeName = (x, y) => {
    return [x, y].sort().join('_');
}

const Subscription = {
    message: {
      subscribe: (parent, { from, to }, { pubsub }) => {
        const chatBoxName = makeName(from, to);
        return pubsub.subscribe(`chatBox ${chatBoxName}`);
  }, },
};

export {Subscription as default};