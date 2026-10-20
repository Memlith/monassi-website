import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { db, getAnalyticsInstance } from './firebase';

export interface AnalyticsEventInput {
  event: string;
  label: string;
  section: string;
  mdfPattern?: string;
}

export interface LeadInput {
  name: string;
  phone?: string;
  city: 'Indaiatuba' | 'Salto' | 'Itu';
  room: string;
  mdfPattern?: string;
  timing: string;
  source?: string;
}

export interface CachedAnalyticsEvent extends AnalyticsEventInput {
  id: string;
  path: string;
  createdAtIso: string;
  syncedToFirebase: boolean;
}

export interface CachedLead extends LeadInput {
  id: string;
  status: 'novo' | 'em_atendimento' | 'concluido';
  createdAtIso: string;
  syncedToFirebase: boolean;
}

const LOCAL_EVENTS_KEY = 'monassi_analytics_events_v1';
const LOCAL_LEADS_KEY = 'monassi_leads_v1';

function appendLocalCache<T>(key: string, item: T, maxItems = 250) {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(key);
    const parsed: T[] = raw ? JSON.parse(raw) : [];
    parsed.unshift(item);
    window.localStorage.setItem(key, JSON.stringify(parsed.slice(0, maxItems)));
  } catch {
    // Ignore storage quota errors
  }
}

export function getLocalCachedEvents(): CachedAnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getLocalCachedLeads(): CachedLead[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function trackClick(input: AnalyticsEventInput): Promise<void> {
  if (typeof window === 'undefined') return;

  const path = (window.location.pathname || '/').slice(0, 120);
  const cleanEvent = input.event.trim().slice(0, 60) || 'click';
  const cleanLabel = input.label.trim().slice(0, 120) || 'button';
  const cleanSection = input.section.trim().slice(0, 80) || 'page';
  const cleanMdf = input.mdfPattern?.trim().slice(0, 80);

  const localEntry: CachedAnalyticsEvent = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    event: cleanEvent,
    label: cleanLabel,
    section: cleanSection,
    path,
    ...(cleanMdf ? { mdfPattern: cleanMdf } : {}),
    createdAtIso: new Date().toISOString(),
    syncedToFirebase: false,
  };

  try {
    // 1. Fire Firebase Analytics event if supported
    getAnalyticsInstance().then((analytics) => {
      if (analytics) {
        logEvent(analytics, cleanEvent, {
          label: cleanLabel,
          section: cleanSection,
          path,
          ...(cleanMdf ? { mdf_pattern: cleanMdf } : {}),
        });
      }
    });

    // 2. Persist to Firestore analytics_events collection
    const payload: Record<string, unknown> = {
      event: cleanEvent,
      label: cleanLabel,
      section: cleanSection,
      path,
      createdAt: serverTimestamp(),
    };
    if (cleanMdf) {
      payload.mdfPattern = cleanMdf;
    }

    const docRef = await addDoc(collection(db, 'analytics_events'), payload);
    localEntry.id = docRef.id;
    localEntry.syncedToFirebase = true;
  } catch (err) {
    console.warn('[Monassi Analytics] Event cached locally:', err);
  } finally {
    appendLocalCache(LOCAL_EVENTS_KEY, localEntry);
  }
}

export async function saveLead(input: LeadInput): Promise<{ id: string; synced: boolean }> {
  const cleanName = input.name.trim().slice(0, 100);
  const cleanPhone = input.phone?.trim().slice(0, 30) || '';
  const cleanCity = input.city;
  const cleanRoom = input.room.trim().slice(0, 80);
  const cleanMdf = input.mdfPattern?.trim().slice(0, 80) || '';
  const cleanTiming = input.timing.trim().slice(0, 60);
  const cleanSource = (input.source || 'landing_lead_form').trim().slice(0, 60);

  const localLead: CachedLead = {
    id: `lead_${Date.now()}`,
    name: cleanName,
    ...(cleanPhone ? { phone: cleanPhone } : {}),
    city: cleanCity,
    room: cleanRoom,
    ...(cleanMdf ? { mdfPattern: cleanMdf } : {}),
    timing: cleanTiming,
    source: cleanSource,
    status: 'novo',
    createdAtIso: new Date().toISOString(),
    syncedToFirebase: false,
  };

  try {
    const payload: Record<string, unknown> = {
      name: cleanName,
      city: cleanCity,
      room: cleanRoom,
      timing: cleanTiming,
      source: cleanSource,
      status: 'novo',
      createdAt: serverTimestamp(),
    };
    if (cleanPhone) payload.phone = cleanPhone;
    if (cleanMdf) payload.mdfPattern = cleanMdf;

    const docRef = await addDoc(collection(db, 'leads'), payload);
    localLead.id = docRef.id;
    localLead.syncedToFirebase = true;

    // Also log conversion click event
    void trackClick({
      event: 'lead_submit',
      label: `${cleanRoom} - ${cleanCity}`,
      section: 'lead_form',
      mdfPattern: cleanMdf || undefined,
    });

    appendLocalCache(LOCAL_LEADS_KEY, localLead);
    return { id: docRef.id, synced: true };
  } catch (err) {
    console.warn('[Monassi Leads] Lead cached locally:', err);
    appendLocalCache(LOCAL_LEADS_KEY, localLead);
    return { id: localLead.id, synced: false };
  }
}
