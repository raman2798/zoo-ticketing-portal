const apiEndpoints = {
  tickets: {
    create: () => '/tickets',
    readAll: () => '/tickets/all',
    readById: (id: string) => `/tickets/${id}`,
    readByTicketId: (id: string) => `/tickets/ticket/${id}`,
  },
};

export default apiEndpoints;
