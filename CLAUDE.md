# CLAUDE.md — Project Instructions for Portfolio Website

## 🎯 Role & Context
**User**: n8n Automation Specialist (Michael Estrella)
**Target**: Full-time/contract roles via onlinejobs.ph
**Stack**: React 19 + Vite + Tailwind + Framer Motion → Cloudflare Workers
**Current**: 3 n8n case studies + 2 voice AI assets (Retell, VAPI) not yet showcased

---

## 🔴 MANDATORY RULES (Non-Negotiable)

### 1. Challenge My Ideas — Don't Sugarcoat
- If a plan is bad, say so directly with reasoning
- If a feature wastes time, flag it
- If metrics are weak, tell me how to strengthen them
- Default to "no" on scope creep; make me justify additions

### 2. Explain Vision Back Before Writing
- Before any code/file changes, summarize what you understand I want
- Confirm the "why" and "what success looks like"
- Only proceed after I confirm or correct

### 3. Research First, Build Second
- For any new section/feature: research 5-10 competitor portfolios first
- Extract patterns, then design something better — not just different
- Document findings in the PR/commit or a research artifact

### 4. n8n Workflow Documentation Standard
Every project must have (in the modal detail):
| Section | Required | Format |
|---------|----------|--------|
| What it is | ✅ | 1-2 sentences, non-technical |
| Setup/Steps | ✅ | 4-6 bullet points, employer-readable |
| Problem Solved | ✅ | Concrete metrics (time saved, revenue ↑, errors ↓) |
| Architecture | ✅ | 3-5 phase breakdown (see current projects) |
| Tools/Stack | ✅ | Exact node names + versions where relevant |
| Error Handling | ✅ | Retry logic, fallback paths, alerting |
| Demo/Proof | ⚠️ | Loom link, deployed URL, or n8n template export |

### 5. onlinejobs.ph Employer Lens
- Filipino employers value: **reliability, communication, cost savings, speed to value**
- Lead with: "I saved X hours/week" or "Reduced manual work by Y%"
- Avoid: Purely technical jargon without business outcome
- Show: Long-term client relationships (Goods+Gadgets = 2 projects)

---

## 📁 Project Structure Reference

```
src/
├── components/
│   ├── Projects.jsx      # ← Main focus: add voice projects here
│   ├── Services.jsx      # 6 service cards
│   ├── Hero.jsx          # Landing
│   ├── About.jsx         # Bio
│   ├── Testimonial.jsx   # 2 client quotes
│   ├── Navbar.jsx
│   └── Footer.jsx
├── config.js             # Name, role, links
├── App.jsx               # Routes sections
└── assets/               # Images
public/
├── project-screenshots/  # 13 project images + 2 voice assets
└── project-screenshots/RetellGHLVoiceReceptionist.png
public/
└── project-screenshots/VAPIVoiceReceptionist.png
```

---

## 🎯 Immediate Priorities (This Session)

1. **Add 2 voice projects** to Projects.jsx using existing images
2. **Research competitor portfolios** (automation specialists on onlinejobs.ph/Upwork/LinkedIn)
3. **Improve Projects architecture** based on research
4. **Ensure every project has error handling section** (critical for n8n credibility)

---

## 🛠️ n8n-Specific Standards (from AGENTS.md)

- Use `@n8n-as-code/skills` tools for any workflow creation/editing
- Follow GitOps sync: `list` → `fetch` → `pull` → `edit` → `push`
- Validate with `./n8nac-skills validate` before finishing
- Node types: full package prefix (e.g., `n8n-nodes-base.httpRequest`)
- Use highest `typeVersion` from schema

---

## 📝 Notes for Future Sessions

- User has n8n workflow JSON files for all 5 projects (will send later)
- Target deployment: Cloudflare Workers via `npm run deploy`
- No TypeScript yet — keep JSX for now
- Framer Motion for all animations
- Tailwind config: custom colors (`#0A0A0A`, `#0E0E12`, `#16161C`, violet/fuchsia accents)