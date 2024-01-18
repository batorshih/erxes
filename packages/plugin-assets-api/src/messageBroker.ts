import { ISendMessageArgs, sendMessage } from '@erxes/api-utils/src/core';
import { generateModels } from './connectionResolver';

let client;

export const initBroker = async (cl) => {
  client = cl;

  const { consumeRPCQueue } = client;

  consumeRPCQueue('assets:assets.find', async ({ subdomain, data }) => {
    const models = await generateModels(subdomain);

    return {
      status: 'success',
      data: await models.Assets.find(data).lean(),
    };
  });
};

export const sendContactsMessage = (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({
    client,
    serviceName: 'contacts',
    ...args,
  });
};

export const sendFormsMessage = (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({
    client,
    serviceName: 'forms',
    ...args,
  });
};

export const sendCardsMessage = (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({
    client,
    serviceName: 'cards',
    ...args,
  });
};

export const sendCoreMessage = (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({
    client,
    serviceName: 'core',
    ...args,
  });
};

export const sendKbMessage = (args: ISendMessageArgs): Promise<any> => {
  return sendMessage({
    client,
    serviceName: 'knowledgebase',
    ...args,
  });
};

export default function () {
  return client;
}
