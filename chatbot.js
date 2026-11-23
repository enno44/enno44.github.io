// Enno's AI Assistant: chat widget for the n8n AI Agent (Unit 5.1 / Extra Credit 5.10)
// Workflow: n8n Chat Trigger -> AI Agent (Gemini 3.1 Flash-Lite + Simple Memory + SerpApi web search)
(function () {
    'use strict';

    const CONFIG = {
        webhookUrl: 'https://ennouni.app.n8n.cloud/webhook/bbf41d88-3ca7-4864-ae80-2295868e5b04/chat',
        botName: "Enno's AI Assistant",
        greeting: "Hi! 👋 I'm Enno's AI agent, built with **n8n** and **Gemini**. I can search the web, I know today's date and I remember our conversation. What would you like to know?",
        suggestions: ["What's today's date?", 'Latest news on AI agents', 'Weather in Pforzheim today', 'What can you do?'],
        timeoutMs: 60000
    };

    // ---------- storage (best effort, never required) ----------
    const store = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
        del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
    };
    const K_SESSION = 'enno_chat_session', K_HISTORY = 'enno_chat_history';

    function newSessionId() {
        if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
        return 'web-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    }
    let sessionId = store.get(K_SESSION) || newSessionId();
    store.set(K_SESSION, sessionId);

    let history = [];
    try { history = JSON.parse(store.get(K_HISTORY) || '[]'); } catch (e) { history = []; }

    // ---------- safe mini markdown ----------
    function esc(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    function inline(s) {
        return s
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
            .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');
    }
    function md(text) {
        const lines = esc(String(text || '')).replace(/\\n/g, '\n').split('\n');
        let html = '', list = null;
        const close = () => { if (list) { html += '</' + list + '>'; list = null; } };
        for (const raw of lines) {
            const line = raw.trim();
            let m;
            if ((m = line.match(/^[-*•]\s+(.*)/))) {
                if (list !== 'ul') { close(); html += '<ul>'; list = 'ul'; }
                html += '<li>' + inline(m[1]) + '</li>';
            } else if ((m = line.match(/^\d+[.)]\s+(.*)/))) {
                if (list !== 'ol') { close(); html += '<ol>'; list = 'ol'; }
                html += '<li>' + inline(m[1]) + '</li>';
            } else if ((m = line.match(/^#{1,6}\s+(.*)/))) {
                close(); html += '<p class="ea-h">' + inline(m[1]) + '</p>';
            } else if (line) {
                close(); html += '<p>' + inline(line) + '</p>';
            } else close();
        }
        close();
        return html;
    }

    // ---------- styles ----------
    const css = `
    :root{--ea-deep:#3d2f52;--ea-mid:#574571;--ea-soft:#9a89b3;--ea-gold:#caa4a4;--ea-gold2:#e3c9c9;
      --ea-cream:#f9f6f4;--ea-card:#fff;--ea-ink:#2c2733;--ea-ink2:#6b5f73;--ea-line:#ece4ea;--ea-mint:#41c79a}
    .ea-root{position:fixed;right:24px;bottom:24px;z-index:2000;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ea-ink)}
    .ea-fab{width:64px;height:64px;border-radius:50%;border:0;cursor:pointer;color:#fff;font-size:26px;
      background:linear-gradient(135deg,var(--ea-mid),var(--ea-deep));box-shadow:0 12px 30px rgba(61,47,82,.45),0 0 0 4px rgba(202,164,164,.35);
      display:flex;align-items:center;justify-content:center;transition:transform .25s ease,box-shadow .25s ease;position:relative}
    .ea-fab:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 16px 36px rgba(61,47,82,.55),0 0 0 6px rgba(202,164,164,.45)}
    .ea-fab:focus-visible,.ea-btn:focus-visible,.ea-chip:focus-visible,.ea-send:focus-visible{outline:3px solid var(--ea-gold);outline-offset:2px}
    .ea-fab .ea-dot{position:absolute;top:4px;right:4px;width:14px;height:14px;border-radius:50%;background:var(--ea-mint);border:2px solid #fff}
    .ea-fab::after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid var(--ea-gold);animation:ea-pulse 2.4s ease-out infinite}
    @keyframes ea-pulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.55);opacity:0}}
    .ea-teaser{position:absolute;right:76px;bottom:12px;white-space:nowrap;background:#fff;color:var(--ea-ink);font-size:14px;font-weight:600;
      padding:10px 14px;border-radius:14px 14px 4px 14px;box-shadow:0 8px 24px rgba(44,39,51,.18);cursor:pointer;
      animation:ea-in .4s ease .8s both}
    .ea-teaser span{color:var(--ea-mid)}
    .ea-panel{position:absolute;right:0;bottom:80px;width:390px;height:600px;max-height:calc(100vh - 120px);background:var(--ea-cream);
      border-radius:22px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 60px rgba(44,39,51,.32);
      border:1px solid rgba(202,164,164,.5);transform-origin:bottom right;animation:ea-open .28s cubic-bezier(.2,.8,.2,1)}
    .ea-panel[hidden]{display:none}
    @keyframes ea-open{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}
    @keyframes ea-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
    .ea-head{background:linear-gradient(135deg,var(--ea-deep) 0%,var(--ea-mid) 60%,#7a6496 100%);color:#fff;padding:18px 18px 16px;position:relative}
    .ea-head::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--ea-gold),var(--ea-gold2),var(--ea-gold))}
    .ea-top{display:flex;align-items:center;gap:12px}
    .ea-ava{width:44px;height:44px;border-radius:50%;flex:none;background:linear-gradient(135deg,var(--ea-gold2),var(--ea-gold));
      display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--ea-deep);box-shadow:0 0 0 3px rgba(255,255,255,.25)}
    .ea-title{flex:1;min-width:0}
    .ea-title b{display:block;font-size:16px;letter-spacing:.2px}
    .ea-status{font-size:12px;color:#e6dcef;display:flex;align-items:center;gap:6px}
    .ea-status i{width:8px;height:8px;border-radius:50%;background:var(--ea-mint);box-shadow:0 0 0 3px rgba(65,199,154,.25)}
    .ea-btn{width:34px;height:34px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;cursor:pointer;font-size:14px;transition:background .2s}
    .ea-btn:hover{background:rgba(255,255,255,.28)}
    .ea-tags{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap}
    .ea-tags span{font-size:11px;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,.13);color:#f3ecf7;border:1px solid rgba(255,255,255,.18)}
    .ea-msgs{flex:1;overflow-y:auto;padding:18px 16px 8px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
    .ea-msgs::-webkit-scrollbar{width:6px}.ea-msgs::-webkit-scrollbar-thumb{background:var(--ea-gold2);border-radius:3px}
    .ea-row{display:flex;gap:8px;align-items:flex-end;animation:ea-in .25s ease}
    .ea-row.me{justify-content:flex-end}
    .ea-mini{width:28px;height:28px;border-radius:50%;flex:none;background:linear-gradient(135deg,var(--ea-mid),var(--ea-deep));color:#fff;
      font-size:13px;display:flex;align-items:center;justify-content:center}
    .ea-bub{max-width:80%;padding:11px 14px;font-size:14.5px;line-height:1.5;word-wrap:break-word;overflow-wrap:anywhere}
    .ea-row > div:last-child{max-width:84%}
    .ea-row .ea-bub{max-width:100%}
    .ea-row.bot .ea-bub,.ea-row.err .ea-bub{background:var(--ea-card);border:1px solid var(--ea-line);border-radius:4px 16px 16px 16px;box-shadow:0 2px 8px rgba(44,39,51,.05)}
    .ea-row.me .ea-bub{background:linear-gradient(135deg,var(--ea-mid),var(--ea-deep));color:#fff;border-radius:16px 16px 4px 16px}
    .ea-row.err .ea-bub{background:#fff4f2;border-color:#f1c6bd;color:#8a3324}
    .ea-bub p{margin:0 0 6px}.ea-bub p:last-child{margin:0}
    .ea-bub ul,.ea-bub ol{margin:4px 0 6px;padding-left:20px}.ea-bub li{margin:2px 0}
    .ea-bub a{color:var(--ea-mid);font-weight:600}.ea-row.me .ea-bub a{color:#fff}
    .ea-bub code{background:var(--ea-cream);padding:1px 5px;border-radius:5px;font-size:13px}
    .ea-bub .ea-h{font-weight:700}
    .ea-time{font-size:10.5px;color:var(--ea-ink2);margin-top:4px;opacity:.8}
    .ea-row.me .ea-time{text-align:right}
    .ea-typing{display:flex;gap:5px;padding:14px 16px}
    .ea-typing span{width:7px;height:7px;border-radius:50%;background:var(--ea-soft);animation:ea-bounce 1.2s infinite ease-in-out}
    .ea-typing span:nth-child(2){animation-delay:.15s}.ea-typing span:nth-child(3){animation-delay:.3s}
    @keyframes ea-bounce{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-5px);opacity:1}}
    .ea-typing-label{font-size:12px;color:var(--ea-ink2);margin:4px 0 0 36px}
    .ea-chips{display:flex;flex-wrap:wrap;gap:8px;padding:2px 16px 10px}
    .ea-chip{border:1px solid var(--ea-gold2);background:#fff;color:var(--ea-deep);font-size:13px;padding:7px 12px;border-radius:999px;cursor:pointer;transition:all .2s}
    .ea-chip:hover{background:var(--ea-deep);color:#fff;border-color:var(--ea-deep)}
    .ea-foot{padding:10px 12px 12px;background:#fff;border-top:1px solid var(--ea-line)}
    .ea-form{display:flex;gap:8px;align-items:flex-end;background:var(--ea-cream);border:1.5px solid var(--ea-line);border-radius:16px;padding:6px 6px 6px 14px;transition:border-color .2s,box-shadow .2s}
    .ea-form:focus-within{border-color:var(--ea-soft);box-shadow:0 0 0 4px rgba(154,137,179,.18)}
    .ea-input{flex:1;border:0;background:transparent;resize:none;outline:none;font:inherit;font-size:14.5px;color:var(--ea-ink);max-height:110px;padding:8px 0;line-height:1.4}
    .ea-send{width:40px;height:40px;border-radius:12px;border:0;cursor:pointer;color:#fff;font-size:15px;flex:none;
      background:linear-gradient(135deg,var(--ea-mid),var(--ea-deep));transition:transform .15s,opacity .2s}
    .ea-send:hover{transform:scale(1.06)}.ea-send:disabled{opacity:.4;cursor:default;transform:none}
    .ea-note{font-size:10.5px;color:var(--ea-ink2);text-align:center;margin-top:7px}
    .ea-note b{color:var(--ea-mid)}
    @media (max-width:520px){
      .ea-root{right:16px;bottom:16px}
      .ea-panel{position:fixed;inset:0;width:auto;height:auto;max-height:none;border-radius:0;bottom:0}
      .ea-root.is-open .ea-fab{display:none}
      .ea-teaser{display:none}
    }
    @media (prefers-reduced-motion:reduce){.ea-root *,.ea-root *::after{animation:none!important;transition:none!important}}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // ---------- markup ----------
    const root = document.createElement('div');
    root.className = 'ea-root';
    root.innerHTML = `
      <div class="ea-teaser" id="eaTeaser">Ask my <span>AI agent</span> ✨</div>
      <section class="ea-panel" id="eaPanel" role="dialog" aria-label="${esc(CONFIG.botName)}" hidden>
        <header class="ea-head">
          <div class="ea-top">
            <div class="ea-ava" aria-hidden="true"><i class="fa-solid fa-robot"></i></div>
            <div class="ea-title"><b>${esc(CONFIG.botName)}</b>
              <div class="ea-status"><i></i><span id="eaStatus">Online · replies in seconds</span></div></div>
            <button class="ea-btn" id="eaClear" title="New conversation" aria-label="New conversation"><i class="fa-solid fa-rotate-right"></i></button>
            <button class="ea-btn" id="eaClose" title="Close" aria-label="Close chat"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="ea-tags"><span>⚙️ n8n AI Agent</span><span>✦ Gemini</span><span>🔎 Web search</span><span>🧠 Memory</span></div>
        </header>
        <div class="ea-msgs" id="eaMsgs" aria-live="polite"></div>
        <div class="ea-chips" id="eaChips"></div>
        <div class="ea-foot">
          <form class="ea-form" id="eaForm">
            <textarea class="ea-input" id="eaInput" rows="1" placeholder="Type your question…" aria-label="Message"></textarea>
            <button class="ea-send" id="eaSend" type="submit" aria-label="Send" disabled><i class="fa-solid fa-paper-plane"></i></button>
          </form>
          <div class="ea-note">Powered by <b>n8n</b> + <b>Gemini 3.1 Flash-Lite</b> · AI answers can be wrong</div>
        </div>
      </section>
      <button class="ea-fab" id="eaFab" aria-label="Open chat with Enno's AI Assistant" aria-expanded="false">
        <i class="fa-solid fa-comment-dots"></i><span class="ea-dot"></span></button>`;

    function mount() {
        document.body.appendChild(root);
        const $ = id => root.querySelector('#' + id);
        const panel = $('eaPanel'), fab = $('eaFab'), msgs = $('eaMsgs'), chips = $('eaChips'),
              form = $('eaForm'), input = $('eaInput'), send = $('eaSend'), teaser = $('eaTeaser'), status = $('eaStatus');
        let busy = false;

        const fmtTime = t => new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        function addMsg(role, text, t, save) {
            const row = document.createElement('div');
            row.className = 'ea-row ' + role;
            const body = role === 'me' ? '<p>' + esc(text).replace(/\n/g, '<br>') + '</p>' : md(text);
            row.innerHTML = (role === 'me' ? '' : '<div class="ea-mini"><i class="fa-solid fa-robot"></i></div>') +
                '<div><div class="ea-bub">' + body + '</div><div class="ea-time">' + fmtTime(t || Date.now()) + '</div></div>';
            msgs.appendChild(row);
            msgs.scrollTop = msgs.scrollHeight;
            if (save) {
                history.push({ role, text, t: t || Date.now() });
                history = history.slice(-60);
                store.set(K_HISTORY, JSON.stringify(history));
            }
        }

        function renderChips() {
            chips.innerHTML = '';
            if (history.some(h => h.role === 'me')) return;
            CONFIG.suggestions.forEach(s => {
                const b = document.createElement('button');
                b.type = 'button'; b.className = 'ea-chip'; b.textContent = s;
                b.onclick = () => ask(s);
                chips.appendChild(b);
            });
        }

        function renderAll() {
            msgs.innerHTML = '';
            addMsg('bot', CONFIG.greeting, history.length ? history[0].t : Date.now(), false);
            history.forEach(h => addMsg(h.role, h.text, h.t, false));
            renderChips();
        }

        let typingEl = null, typingTimer = null;
        function showTyping(on) {
            clearInterval(typingTimer);
            if (typingEl) { typingEl.remove(); typingEl = null; }
            if (on) {
                typingEl = document.createElement('div');
                typingEl.innerHTML = '<div class="ea-row bot"><div class="ea-mini"><i class="fa-solid fa-robot"></i></div>' +
                    '<div class="ea-bub ea-typing"><span></span><span></span><span></span></div></div>' +
                    '<div class="ea-typing-label">Thinking…</div>';
                msgs.appendChild(typingEl);
                msgs.scrollTop = msgs.scrollHeight;
                const label = typingEl.querySelector('.ea-typing-label');
                const steps = ['Thinking…', 'Searching the web…', 'Reading results…', 'Writing the answer…'];
                let i = 0;
                typingTimer = setInterval(() => { i = Math.min(i + 1, steps.length - 1); label.textContent = steps[i]; }, 2500);
                status.textContent = 'Agent is working…';
            } else {
                status.textContent = 'Online · replies in seconds';
            }
        }

        async function ask(text) {
            text = (text || '').trim();
            if (!text || busy) return;
            busy = true; send.disabled = true;
            input.value = ''; autosize();
            addMsg('me', text, Date.now(), true);
            chips.innerHTML = '';
            showTyping(true);
            const ctrl = new AbortController();
            const to = setTimeout(() => ctrl.abort(), CONFIG.timeoutMs);
            try {
                const res = await fetch(CONFIG.webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'sendMessage', sessionId, chatInput: text }),
                    signal: ctrl.signal
                });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const data = await res.json();
                const out = (Array.isArray(data) ? data[0] : data) || {};
                const reply = out.output || out.text || out.response || out.message;
                showTyping(false);
                addMsg('bot', reply || 'Sorry, I got an empty answer. Please try again.', Date.now(), true);
            } catch (e) {
                showTyping(false);
                const msg = e.name === 'AbortError'
                    ? 'That took too long. The web search may be slow, so please try again.'
                    : 'I could not reach the agent right now (' + String(e.message || e) + '). Please try again in a moment.';
                addMsg('err', msg, Date.now(), false);
            } finally {
                clearTimeout(to);
                busy = false;
                send.disabled = !input.value.trim();
                input.focus();
            }
        }

        function autosize() {
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 110) + 'px';
        }

        function open(on) {
            panel.hidden = !on;
            root.classList.toggle('is-open', on);
            fab.setAttribute('aria-expanded', String(on));
            fab.innerHTML = on ? '<i class="fa-solid fa-chevron-down"></i>' : '<i class="fa-solid fa-comment-dots"></i><span class="ea-dot"></span>';
            if (teaser.isConnected) teaser.remove();
            if (on) { msgs.scrollTop = msgs.scrollHeight; setTimeout(() => input.focus(), 50); }
        }

        fab.onclick = () => open(panel.hidden);
        teaser.onclick = () => open(true);
        $('eaClose').onclick = () => open(false);
        $('eaClear').onclick = () => {
            history = []; store.del(K_HISTORY);
            sessionId = newSessionId(); store.set(K_SESSION, sessionId);
            renderAll();
        };
        form.onsubmit = e => { e.preventDefault(); ask(input.value); };
        input.addEventListener('input', () => { autosize(); send.disabled = busy || !input.value.trim(); });
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input.value); }
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) open(false); });

        renderAll();
        window.EnnoChat = { open: () => open(true), ask };
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
    else mount();
})();
