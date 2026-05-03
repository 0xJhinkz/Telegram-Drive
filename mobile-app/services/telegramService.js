/**
 * Telegram Service - Mobile Web
 * All calls go to local proxy server (localhost:3001)
 */

const BASE_URL = 'http://localhost:3001/api';

async function api(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error || `Server error ${res.status}`);
  return data;
}

// ─── Auth ──────────────────────────────────────────────────────────────────

export async function requestLoginCode(apiId, apiHash, phone) {
  return api('/auth/request-code', { method: 'POST', body: JSON.stringify({ apiId, apiHash, phone }) });
}

export async function signInWithCode(apiId, apiHash, phone, code) {
  const data = await api('/auth/sign-in', { method: 'POST', body: JSON.stringify({ code }) });
  if (data.session) {
    localStorage.setItem('tg_session', data.session);
    localStorage.setItem('tg_api_id', apiId);
    localStorage.setItem('tg_api_hash', apiHash);
  }
  return { success: data.ok && data.nextStep === 'dashboard', nextStep: data.nextStep };
}

export async function checkPassword(password) {
  const data = await api('/auth/check-password', { method: 'POST', body: JSON.stringify({ password }) });
  if (data.session) localStorage.setItem('tg_session', data.session);
  return { success: true };
}

export async function restoreSession() {
  const session = localStorage.getItem('tg_session');
  const apiId = localStorage.getItem('tg_api_id');
  const apiHash = localStorage.getItem('tg_api_hash');
  if (!session || !apiId || !apiHash) return null;
  try {
    const data = await api('/auth/restore', { method: 'POST', body: JSON.stringify({ apiId, apiHash, session }) });
    return data.user;
  } catch {
    clearSession();
    return null;
  }
}

export async function logout() {
  await api('/auth/logout', { method: 'POST' }).catch(() => {});
  clearSession();
}

// ─── Files ─────────────────────────────────────────────────────────────────

export async function getFiles(entity = 'me', limit = 50) {
  const data = await api(`/files?entity=${encodeURIComponent(entity)}&limit=${limit}`);
  return data.files || [];
}

export async function deleteFile(messageId, folderId = null) {
  return api('/files/delete', { method: 'POST', body: JSON.stringify({ messageId, folderId }) });
}

export async function searchFiles(query, folderId = null) {
  const data = await api(`/files/search?q=${encodeURIComponent(query)}&folderId=${folderId || ''}`);
  return data.files || [];
}

// ─── Folders ───────────────────────────────────────────────────────────────

export async function getFolders() {
  const data = await api('/folders');
  return data.folders || [];
}

export async function createFolder(name) {
  const data = await api('/folders/create', { method: 'POST', body: JSON.stringify({ name }) });
  return data.folder;
}

export async function deleteFolder(folderId) {
  return api('/folders/delete', { method: 'POST', body: JSON.stringify({ folderId }) });
}

export async function syncFolders() {
  const data = await api('/folders/sync', { method: 'POST' });
  return data.folders || [];
}

// ─── Utils ─────────────────────────────────────────────────────────────────

export function clearSession() {
  localStorage.removeItem('tg_session');
  localStorage.removeItem('tg_api_id');
  localStorage.removeItem('tg_api_hash');
}

export async function checkServerHealth() {
  try {
    const data = await api('/health');
    return data.ok === true;
  } catch {
    return false;
  }
}

export function formatSize(bytes) {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
