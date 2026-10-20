"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BarChart3,
  Users,
  MousePointerClick,
  Layers,
  MapPin,
  LogIn,
  LogOut,
  CheckCircle2,
  Clock,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import {
  getLocalCachedEvents,
  getLocalCachedLeads,
  type CachedAnalyticsEvent,
  type CachedLead,
} from "@/lib/analytics";

export default function AdminAnalyticsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState<string>("");
  const [cloudLeads, setCloudLeads] = useState<CachedLead[]>([]);
  const [cloudEvents, setCloudEvents] = useState<CachedAnalyticsEvent[]>([]);
  const [localLeads, setLocalLeads] = useState<CachedLead[]>(() =>
    getLocalCachedLeads()
  );
  const [localEvents, setLocalEvents] = useState<CachedAnalyticsEvent[]>(() =>
    getLocalCachedEvents()
  );

  const refreshLocal = () => {
    setLocalLeads(getLocalCachedLeads());
    setLocalEvents(getLocalCachedEvents());
  };

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setCloudLeads([]);
        setCloudEvents([]);
      }
    });
    return () => unsubAuth();
  }, []);

  // Real-time listeners for Cloud Firestore when Admin is authenticated
  // Note: Real-time onSnapshot is used here so the stakeholder admin dashboard updates live as visitors click or submit leads.
  useEffect(() => {
    if (!user) {
      return;
    }

    const leadsQuery = query(
      collection(db, "leads"),
      orderBy("createdAt", "desc"),
      limit(100)
    );
    const eventsQuery = query(
      collection(db, "analytics_events"),
      orderBy("createdAt", "desc"),
      limit(200)
    );

    const unsubLeads = onSnapshot(
      leadsQuery,
      (snap) => {
        const rows: CachedLead[] = snap.docs.map((d) => {
          const data = d.data();
          const ts = data.createdAt?.toDate?.()
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString();
          return {
            id: d.id,
            name: data.name || "Cliente",
            phone: data.phone,
            city: data.city || "Indaiatuba",
            room: data.room || "-",
            mdfPattern: data.mdfPattern,
            timing: data.timing || "-",
            source: data.source || "site",
            status: data.status || "novo",
            createdAtIso: ts,
            syncedToFirebase: true,
          };
        });
        setCloudLeads(rows);
      },
      (err) => {
        console.warn("[Admin Firestore Leads]", err.message);
      }
    );

    const unsubEvents = onSnapshot(
      eventsQuery,
      (snap) => {
        const rows: CachedAnalyticsEvent[] = snap.docs.map((d) => {
          const data = d.data();
          const ts = data.createdAt?.toDate?.()
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString();
          return {
            id: d.id,
            event: data.event || "click",
            label: data.label || "-",
            section: data.section || "-",
            path: data.path || "/",
            mdfPattern: data.mdfPattern,
            createdAtIso: ts,
            syncedToFirebase: true,
          };
        });
        setCloudEvents(rows);
      },
      (err) => {
        console.warn("[Admin Firestore Events]", err.message);
      }
    );

    return () => {
      unsubLeads();
      unsubEvents();
    };
  }, [user]);

  const handleGoogleLogin = async () => {
    setAuthError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Ative o provedor Google em Firebase Console > Authentication para login em nuvem.";
      setAuthError(msg);
    }
  };

  const handleUpdateLeadStatus = async (
    leadId: string,
    newStatus: "novo" | "em_atendimento" | "concluido"
  ) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "leads", leadId), { status: newStatus });
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const mergedLeads = useMemo(() => {
    const map = new Map<string, CachedLead>();
    for (const l of [...cloudLeads, ...localLeads]) {
      if (!map.has(l.id)) map.set(l.id, l);
    }
    return Array.from(map.values());
  }, [cloudLeads, localLeads]);

  const mergedEvents = useMemo(() => {
    const map = new Map<string, CachedAnalyticsEvent>();
    for (const ev of [...cloudEvents, ...localEvents]) {
      if (!map.has(ev.id)) map.set(ev.id, ev);
    }
    return Array.from(map.values());
  }, [cloudEvents, localEvents]);

  const whatsappClicksCount = mergedEvents.filter(
    (e) => e.event === "whatsapp_click"
  ).length;

  const topMdfPatterns = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of mergedEvents) {
      if (e.mdfPattern) {
        counts[e.mdfPattern] = (counts[e.mdfPattern] || 0) + 1;
      }
    }
    for (const l of mergedLeads) {
      if (l.mdfPattern) {
        counts[l.mdfPattern] = (counts[l.mdfPattern] || 0) + 2;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [mergedEvents, mergedLeads]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#1C1917] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-stone-300 hover:text-white bg-stone-800 px-3.5 py-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Site</span>
            </Link>
            <div className="relative w-32 h-9 hidden sm:block">
              <Image
                src="/img/logo-monassi-v2-white.webp"
                alt="Monassi Móveis Planejados"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-[#C28839]/20 text-amber-400 border border-[#C28839]/40 px-3 py-1 rounded-full">
              Firebase Analytics & Leads
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={refreshLocal}
              className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              title="Atualizar dados locais"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-300 hidden md:inline">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={() => signOut(auth)}
                  className="bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="bg-[#C28839] hover:bg-[#A77129] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login Admin (Google)</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Firebase Connection Banner */}
        <div className="bg-white rounded-3xl p-6 border border-[#E6DFD5] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
                Painel de Cliques & Orçamentos (Projeto Firebase:{" "}
                <code className="text-sm font-mono bg-stone-100 px-2 py-0.5 rounded">
                  monassi-planejados-web
                </code>
                )
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm font-light mt-1">
                Todos os formulários e cliques são gravados automaticamente no{" "}
                <strong className="font-semibold text-[#1C1917]">
                  Cloud Firestore
                </strong>{" "}
                com regras de segurança que protegem os dados pessoais dos clientes (leitura restrita a{" "}
                <code className="text-xs font-mono">iamcaiosimonassi@gmail.com</code>
                ).
              </p>
              {authError && (
                <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-xs mt-2">
                  Nota: {authError} (Exibindo também os eventos gravados nesta sessão do navegador).
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Orçamentos Simulados</span>
              <Users className="w-4 h-4 text-[#C28839]" />
            </div>
            <div className="text-3xl font-serif font-bold text-[#1C1917]">
              {mergedLeads.length}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Salvos na coleção <code>leads</code>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total de Cliques Rastreados</span>
              <MousePointerClick className="w-4 h-4 text-[#C28839]" />
            </div>
            <div className="text-3xl font-serif font-bold text-[#1C1917]">
              {mergedEvents.length}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Salvos em <code>analytics_events</code>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Cliques para WhatsApp</span>
              <BarChart3 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-700">
              {whatsappClicksCount}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Intenções diretas de conversa
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E6DFD5] shadow-xs">
            <div className="flex items-center justify-between text-stone-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>MDF Mais Procurado</span>
              <Layers className="w-4 h-4 text-[#C28839]" />
            </div>
            <div className="text-lg font-serif font-bold text-[#1C1917] truncate">
              {topMdfPatterns[0]?.[0] || "Aguardando interações"}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {topMdfPatterns[0]
                ? `${topMdfPatterns[0][1]} interações registradas`
                : "No Catálogo Duratex 2026"}
            </p>
          </div>
        </div>

        {/* Leads Table & Events Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Leads List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DFD5] shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#1C1917]">
                  Simulações de Orçamento (Leads)
                </h2>
                <p className="text-xs text-stone-500">
                  Dados preenchidos no formulário antes do redirecionamento ao WhatsApp
                </p>
              </div>
              <span className="text-xs font-semibold bg-amber-50 text-[#A77129] px-3 py-1 rounded-full">
                {mergedLeads.length} registros
              </span>
            </div>

            {mergedLeads.length === 0 ? (
              <div className="p-10 text-center text-stone-500 text-sm">
                Nenhuma simulação registrada ainda. Preencha o formulário na{" "}
                <Link href="/#orcamento" className="text-[#C28839] underline">
                  página inicial
                </Link>{" "}
                para testar a gravação em tempo real!
              </div>
            ) : (
              <div className="divide-y divide-stone-100 max-h-[520px] overflow-y-auto">
                {mergedLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 hover:bg-stone-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1C1917]">
                          {lead.name}
                        </span>
                        <span className="text-xs bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#C28839]" />
                          {lead.city}
                        </span>
                        {lead.syncedToFirebase && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Firestore
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600">
                        Ambiente: <strong>{lead.room}</strong> • Prazo:{" "}
                        <strong>{lead.timing}</strong>
                        {lead.mdfPattern ? (
                          <>
                            {" "}
                            • MDF: <strong className="text-[#C28839]">{lead.mdfPattern}</strong>
                          </>
                        ) : null}
                      </p>
                      {lead.phone && (
                        <p className="text-xs text-stone-500">
                          WhatsApp informado: {lead.phone}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {user && (
                        <select
                          aria-label="Status do lead"
                          value={lead.status}
                          onChange={(e) =>
                            handleUpdateLeadStatus(
                              lead.id,
                              e.target.value as
                                | "novo"
                                | "em_atendimento"
                                | "concluido"
                            )
                          }
                          className="text-xs bg-[#FAF8F5] border border-[#E6DFD5] rounded-lg px-2.5 py-1.5 font-medium"
                        >
                          <option value="novo">Novo</option>
                          <option value="em_atendimento">Em Atendimento</option>
                          <option value="concluido">Concluído</option>
                        </select>
                      )}
                      <span className="text-[11px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(lead.createdAtIso).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Click Events Stream (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E6DFD5] shadow-xs overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#1C1917]">
                  Últimos Cliques & Interações
                </h2>
                <p className="text-xs text-stone-500">
                  Rastreamento em tempo real de botões, carrosséis e catálogo MDF
                </p>
              </div>
            </div>

            {mergedEvents.length === 0 ? (
              <div className="p-10 text-center text-stone-500 text-sm">
                Clique em qualquer projeto da galeria, padrão do catálogo ou botão de WhatsApp para ver os eventos aqui.
              </div>
            ) : (
              <div className="divide-y divide-stone-100 max-h-[520px] overflow-y-auto">
                {mergedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 hover:bg-stone-50/70 transition-colors flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900 text-amber-400 px-2 py-0.5 rounded">
                          {ev.event}
                        </span>
                        <span className="text-xs text-stone-400">
                          {ev.section}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#1C1917] mt-1">
                        {ev.label}
                      </p>
                      {ev.mdfPattern && (
                        <span className="inline-block text-[11px] text-[#A77129] mt-0.5">
                          MDF: {ev.mdfPattern}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-stone-400 shrink-0">
                      {new Date(ev.createdAtIso).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
