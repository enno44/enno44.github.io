# KLARDOSIS – Multi-Agent Virtual Team (Assignment 4.7)

**Input to the CEO:** market research on German supplement providers → a new supplement brand for the German market.

**Live prototype:** [04-prototype/index.html](04-prototype/index.html)

## How it was run

The course demonstrates `@venture-team` as a Gemini Skill (needs Google AI Pro and the "Tasks" view, which is often not available in Germany/EU).
The provided `newAgent.zip` is actually a **Claude Code** agent team: one CEO skill (`venture-team/SKILL.md`) plus six agent role files.
It was therefore run with **Claude Code (Claude Opus) instead of Gemini**. Claude acted as the CEO and started each agent as a subagent with its own role file and restricted tools, strictly in sequence, passing **file paths** (not content) between the agents.

| Step | Agent | Output |
|---|---|---|
| 1 | research-agent (web search) | [01-research.md](01-research.md) – market size, 10 competitors, segments, regulation |
| 2 | strategy-agent | [02-strategy.md](02-strategy.md) – brand KLARDOSIS, positioning, GTM plan |
| 3a | copywriter-agent | [03-copywriting.md](03-copywriting.md) – slogan "The right amount. Proven." |
| 3b | developer-agent | [04-prototype/index-v1-agent.html](04-prototype/index-v1-agent.html) – first landing page |
| 4 | qa-agent (read-only) | [05-qa-report.md](05-qa-report.md) → [v2](05-qa-report-v2.md) → [v3](05-qa-report-v3.md) |
| 5 | reviewer-agent | [06-final-review.md](06-final-review.md) – integrated critical review |

**QA fix loop:** QA found an unauthorised EU health claim ("gut health", "women's health", Reg. EC 1924/2006). The developer fixed it, but QA's own suggested wording was again a claim, so a third round was needed (approved by the user beyond the skill's 2-round limit). QA v3: no 🔴 issues left.

**After the team:** the landing page was redesigned professionally with AI-generated product images. The QA-approved copy was kept word for word; a source for the Öko-Test figure and demo Impressum/Datenschutz links were added.
