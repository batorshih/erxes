import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { IFetchElkArgs } from '@erxes/api-utils/src/types';

import { initBroker } from './messageBroker';
import { initMemoryStorage } from './inmemoryStorage';
import {
  generateModels,
} from './connectionResolver';
import logs from './logUtils';
import { getSubdomain } from '@erxes/api-utils/src/core';

export let mainDb;
export let debug;
export let graphqlPubsub;
export let serviceDiscovery;

export let es: {
  client;
  fetchElk(args: IFetchElkArgs): Promise<any>;
  getMappings(index: string): Promise<any>;
  getIndexPrefix(): string;
};

export default {
  name: 'internalnotes',
  graphql: async sd => {
    serviceDiscovery = sd;

    return {
      typeDefs: await typeDefs(sd),
      resolvers: await resolvers(sd)
    };
  },
  apolloServerContext: async (context, req) => {
    const subdomain = getSubdomain(req.hostname);

    context.models = await generateModels(subdomain);
    context.subdomain = subdomain;

    return context;
  },
  onServerInit: async options => {
    mainDb = options.db;

    initBroker(options.messageBrokerClient);

    initMemoryStorage();

    graphqlPubsub = options.pubsubClient;
    debug = options.debug;
    es = options.elasticsearch;
  },
  meta: {
    logs: { providesActivityLog: true, consumers: logs }
  }
};
