import 'react-native-get-random-values';
import { TelegramClient } from 'telegram';
import { MemorySession } from 'telegram/sessions';

const DEFAULT_API_ID = process.env.TELEGRAM_API_ID || 'YOUR_API_ID';
const DEFAULT_API_HASH = process.env.TELEGRAM_API_HASH || 'YOUR_API_HASH';

let client = null;
let session = null;

export async function initTelegramClient(apiId = DEFAULT_API_ID, apiHash = DEFAULT_API_HASH) {
  if (!apiId || apiId === 'YOUR_API_ID' || !apiHash || apiHash === 'YOUR_API_HASH') {
    console.warn('Telegram API credentials are missing. Set TELEGRAM_API_ID and TELEGRAM_API_HASH or update androidintegration.txt.');
    return null;
  }

  if (!client) {
    session = new MemorySession();
    client = new TelegramClient(session, apiId, apiHash, {
      connectionRetries: 5,
    });
  }

  if (!client.session.authKey) {
    await client.start({
      phoneNumber: async () => '',
      password: async () => '',
      phoneCode: async () => '',
    }).catch(() => {
      console.warn('Telegram auth flow not completed in mobile stub.');
    });
  }

  return client;
}

export async function getFiles(channel, limit = 50) {
  if (!client) return [];
  try {
    const messages = await client.getMessages(channel, { limit });
    return messages;
  } catch (error) {
    console.warn('getFiles failed', error);
    return [];
  }
}

export async function uploadFile(channel, filePath) {
  if (!client) return null;
  try {
    const result = await client.sendFile(channel, { file: filePath });
    return result;
  } catch (error) {
    console.warn('uploadFile failed', error);
    return null;
  }
}

export async function downloadFile(message) {
  if (!client) return null;
  try {
    const file = await client.downloadMedia(message);
    return file;
  } catch (error) {
    console.warn('downloadFile failed', error);
    return null;
  }
}

export async function deleteFile(messageIds) {
  if (!client) return null;
  try {
    const result = await client.deleteMessages(messageIds);
    return result;
  } catch (error) {
    console.warn('deleteFile failed', error);
    return null;
  }
}

export function isConnected() {
  return !!client;
}
