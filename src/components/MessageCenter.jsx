import React from 'react';
import { Icon } from './Icon.jsx';

// MessageCenter — secure conversations between the client and the firm.
// Three message kinds:
//   1. "client"   — a query the client sent to us (incoming)
//   2. "firm"     — a reply / info we send back to the client (outgoing)
//   3. "internal" — a note our team records about the thread; the client never sees it
// The composer lets staff switch between replying to the client and posting an internal note.

function initials(name) {
  return (name || "?").split(" ").filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("");
}

function MessageCenter({ clientName, cpaName }) {
  const CPA = cpaName || "Daniel Mercer, CPA";
  const CLIENT = clientName || "Avery Whitfield";

  const seed = React.useMemo(() => ([
    {
      id: "t1",
      subject: "CP2000 notice — 2024 Form 1040",
      tag: "IRS notice response",
      messages: [
        { id: 1, type: "client", author: CLIENT, time: "Jun 3 · 9:14 AM",
          body: "Hi — I just received a CP2000 notice from the IRS saying I underreported $4,200 of dividend income for 2024. I don't think that's right. What should I do?" },
        { id: 2, type: "firm", author: CPA, time: "Jun 3 · 11:42 AM",
          body: "Thanks for flagging this right away, " + CLIENT.split(" ")[0] + ". A CP2000 is a proposed change, not a bill — no need to worry. Please upload the notice plus any 1099-DIV forms you received and I'll reconcile it against what we filed. We have until the response date on page 1, so there's time." },
        { id: 3, type: "internal", author: "Priya Nair", role: "Reviewer", time: "Jun 3 · 11:55 AM",
          body: "Pulled the 2024 workpapers — the $4,200 is a Fidelity 1099-DIV that arrived after we filed. Looks like a legitimate omission, not an IRS error. Recommend a 1040-X rather than a dispute letter. Flagging for partner review before we advise the client." },
        { id: 4, type: "client", author: CLIENT, time: "Jun 4 · 8:02 AM",
          body: "Just uploaded the notice and the Fidelity form to my documents. Let me know what you find!" },
      ],
    },
    {
      id: "t2",
      subject: "Q2 estimated payment — how much?",
      tag: "Tax planning",
      messages: [
        { id: 1, type: "client", author: CLIENT, time: "May 28 · 3:20 PM",
          body: "What should I send in for my Q2 estimated payment? Income is running higher than last year." },
        { id: 2, type: "firm", author: CPA, time: "May 28 · 5:06 PM",
          body: "Based on your year-to-date numbers, send $6,800 by June 16 to stay inside the safe harbor. I'll email a voucher with the IRS Direct Pay link." },
        { id: 3, type: "internal", author: "You", role: "Internal", time: "May 28 · 5:10 PM",
          body: "Reminder to revisit Q3 once the consulting 1099 lands — withholding may need a bump." },
      ],
    },
  ]), [CLIENT, CPA]);

  const [threads, setThreads] = React.useState(seed);
  const [activeId, setActiveId] = React.useState(seed[0].id);
  const [mode, setMode] = React.useState("client"); // "client" (reply) | "internal" (note)
  const [draft, setDraft] = React.useState("");
  const [toasts, setToasts] = React.useState([]);
  const threadRef = React.useRef(null);

  function pushToast(t) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 4200);
  }

  const active = threads.find((t) => t.id === activeId) || threads[0];

  React.useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [activeId, threads]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    const msg = mode === "internal"
      ? { id: Date.now(), type: "internal", author: "You", role: "Internal", time: "Just now", body: text }
      : { id: Date.now(), type: "firm", author: CPA, time: "Just now", body: text };
    setThreads((prev) => prev.map((t) => t.id === active.id ? { ...t, messages: [...t.messages, msg] } : t));
    setDraft("");
    pushToast(mode === "internal"
      ? { kind: "internal", title: "Your team was notified", sub: "An email alert was sent to the reviewers on this file." }
      : { kind: "client", title: CLIENT + " was notified", sub: "We emailed " + CLIENT.split(" ")[0] + " a secure link to your reply." });
  }

  function onKey(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(); }
  }

  function preview(t) {
    const m = t.messages[t.messages.length - 1];
    const who = m.type === "client" ? CLIENT.split(" ")[0] : m.type === "internal" ? "Internal note" : "You";
    return who + ": " + m.body.slice(0, 46) + (m.body.length > 46 ? "…" : "");
  }

  return (
    <div className="msg-center">
      <div className="msg-center-head">
        <div className="section-eyebrow">Messages</div>
        <h1>Conversations with your CPA</h1>
      </div>

      {/* Thread list */}
      <aside className="msg-threadlist">
        <div className="msg-threadlist-head">
          <div className="msg-threadlist-title">Conversations</div>
          <div className="msg-threadlist-sub">{threads.length} active threads</div>
        </div>
        {threads.map((t) => (
          <button
            key={t.id}
            type="button"
            className={"msg-thread-item" + (t.id === activeId ? " active" : "")}
            onClick={() => setActiveId(t.id)}
          >
            <div className="msg-thread-item-subject">{t.subject}</div>
            <div className="msg-thread-item-tag">{t.tag}</div>
            <div className="msg-thread-item-preview">{preview(t)}</div>
          </button>
        ))}
      </aside>

      {/* Conversation */}
      <section className="msg-conv">
        <header className="msg-conv-head">
          <div>
            <div className="msg-conv-subject">{active.subject}</div>
            <div className="msg-conv-meta">
              <Icon name="user" size={13} />
              <span>{CLIENT}</span>
              <span className="msg-dot">•</span>
              <Icon name="briefcase" size={13} />
              <span>{active.tag}</span>
            </div>
          </div>
          <div className="msg-conv-badges">
            <div className="msg-conv-badge alerts">
              <Icon name="bell" size={13} />
              Email alerts on
            </div>
            <div className="msg-conv-badge">
              <Icon name="shield-check" size={13} />
              Encrypted
            </div>
          </div>
        </header>

        <div className="msg-thread" ref={threadRef}>
          {active.messages.map((m) => {
            if (m.type === "internal") {
              return (
                <div key={m.id} className="msg-internal">
                  <div className="msg-internal-head">
                    <Icon name="lock" size={13} />
                    <span className="msg-internal-label">Internal note</span>
                    <span className="msg-internal-who">{m.author + (m.role ? " · " + m.role : "")}</span>
                    <span className="msg-internal-time">{m.time}</span>
                  </div>
                  <div className="msg-internal-body">{m.body}</div>
                  <div className="msg-internal-delivery">
                    <Icon name="mail" size={11} />
                    Team notified by email · not sent to client
                  </div>
                </div>
              );
            }
            const isClient = m.type === "client";
            return (
              <div key={m.id} className={"msg-row " + (isClient ? "client" : "firm")}>
                <div className={"msg-avatar " + (isClient ? "client" : "firm")}>{initials(m.author)}</div>
                <div className="msg-bubble-wrap">
                  <div className="msg-byline">
                    <strong>{m.author}</strong>
                    <span className="msg-time">{m.time}</span>
                  </div>
                  <div className="msg-bubble">{m.body}</div>
                  <div className="msg-delivery">
                    <Icon name="mail-check" size={11} />
                    {isClient ? "Preparer notified by email" : CLIENT.split(" ")[0] + " notified by email"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Composer */}
        <div className={"msg-composer" + (mode === "internal" ? " internal" : "")}>
          <div className="msg-modes">
            <button type="button" className={"msg-mode-btn" + (mode === "client" ? " active" : "")} onClick={() => setMode("client")}>
              <Icon name="send" size={14} />
              Reply to client
            </button>
            <button type="button" className={"msg-mode-btn internal" + (mode === "internal" ? " active" : "")} onClick={() => setMode("internal")}>
              <Icon name="lock" size={14} />
              Internal note
            </button>
          </div>

          {mode === "internal" ? (
            <div className="msg-internal-hint">
              <Icon name="eye-off" size={13} />
              Only your team can see internal notes — <strong>{CLIENT} will never see this.</strong>
            </div>
          ) : null}

          <div className="msg-input-row">
            <textarea
              className="msg-input"
              rows={2}
              value={draft}
              placeholder={mode === "internal"
                ? "Record a note for your team about this conversation…"
                : "Write a reply to " + CLIENT.split(" ")[0] + "…"}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKey}
            />
            <button
              type="button"
              className={"msg-send" + (mode === "internal" ? " internal" : "")}
              onClick={send}
              disabled={!draft.trim()}
            >
              <Icon name={mode === "internal" ? "lock" : "send"} size={16} />
              {mode === "internal" ? "Add note" : "Send"}
            </button>
          </div>
          <div className="msg-composer-foot">Press ⌘ / Ctrl + Enter to send</div>
        </div>
      </section>

      <div className="msg-toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={"msg-toast" + (t.kind === "internal" ? " internal" : "")}>
            <span className="msg-toast-icon"><Icon name="mail" size={18} /></span>
            <div className="msg-toast-body">
              <div className="msg-toast-title">{t.title}</div>
              <div className="msg-toast-sub">{t.sub}</div>
            </div>
            <button type="button" className="msg-toast-close" onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}>
              <Icon name="x" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MessageCenter };
