# Solution Brief BRD — OQ Workshop
## Facilitator agenda (60 min)

**Date:** [TBD]
**Facilitator:** Tam Danier
**Attendees:** Woody Floyd, John Geiger, Kavya Shanmuganathan, Scott Campagna
**Outcome:** Decisions captured on 14 open questions. BRD v3 produced within 24 hours. Schema locked. DISCO product team can begin scoping.

**Meeting block: 60 minutes.** Working agenda runs 45 minutes with a 15-minute buffer at the end for overflow discussion, schema implications, or scoping conversations that surface during the decisions. If we close clean at 45, the buffer absorbs into the calendar.

---

## Pre-workshop decisions (closed)

**OQ-6 — ERIM adoption.** Decided pre-workshop by Woody. Schema-level ERIM fields deferred to P3 until SA team adoption decision lands. ERIM content stays in free-text fields (`solution_differentiators`, `proposed_solution_overview`) until then. Mention briefly in the frame for context; do not re-litigate.

---

## Frame (3 min) — 0:00 → 0:03

Open with the operating model. Two sentences:

> "Recommendations are defaults. If you agree, we approve and move. If you disagree, we discuss and decide. If you need more info, we park with an owner."

State the pacing constraint plainly: **14 decisions, 45 minutes, ~3 minutes each.** This is intentional. The BRD is the deep-read; the meeting is the decide. 15 minutes held at the end as buffer.

Open the dashboard. Three buttons per OQ: **Approve recommendation** / **Decide differently** / **Park / async.** Notes capture detail.

Note OQ-6 is closed and explain why: Woody resolved pre-workshop, ERIM deferred to P3.

---

## Track 1 — Architecture & schema mechanics (15 min) — 0:03 → 0:18

The most consequential track. OQ-15 first — it sets the architecture that everything else assumes.

### OQ-15 — Option A vs Option B *(Woody + John + Kavya)*
**Recommendation:** Option A for P0/P1; promotion path to B for P2+.
**Why this first:** Every other OQ depends on this answer.
**Watch for:** John or Kavya pushing for B from the start. If they do — let them; B has real merits. If room agrees on B, the priority sequencing reorders and v3 is a bigger revision.
**Decision needed:** A, B, or "A with explicit B-promotion criteria."

### OQ-1 — DISCO field types *(John)*
**Recommendation:** Fact-finding from John.
**Watch for:** This isn't a decision — it's John telling us what's possible. Capture the answer in notes. The answer gates OQ-3.
**Decision needed:** Document John's answer. No A/B/Park here.

### OQ-2 — Assumptions field strategy *(Woody + DISCO Product)*
**Recommendation:** Additive (keep existing `assumptions`, add `confirmed_assumptions` + `unconfirmed_assumptions`).
**Watch for:** John may push for restructuring if `assumptions` is rarely used in current data. Woody's call — he flagged this in his schema doc.
**Decision needed:** Additive or restructure.

### OQ-3 — Win Themes structure *(John + Woody)*
**Recommendation:** Array if DISCO supports it (from OQ-1); 3 discrete fields if not.
**Watch for:** This decides itself once OQ-1 is answered. Just confirm path.
**Decision needed:** Array vs. 3 fields (driven by OQ-1).

### OQ-4 — project_summary overlap *(Kavya + Woody)*
**Recommendation:** Additive — both fields stay, different tabs, different audiences.
**Watch for:** Quick decision. If anyone hesitates, the question is really "should Solution Lead write Business Problem Statement before or after intake closes?" — that's a process question, not a schema question.
**Decision needed:** Additive or merged.

---

## Track 2 — Workflow, approval, versioning (15 min) — 0:18 → 0:33

### OQ-8 — Where does approval happen? *(Woody + DISCO Product)*
**Recommendation:** DISCO UI.
**Watch for:** Pushback if approval-in-skill is seen as faster. Counter: governance event ≠ authoring event; the surface should match the action.
**Decision needed:** DISCO UI or SoluB skill.

### OQ-9 — Who can approve a brief? *(Woody + Pursuit Ops)*
**Recommendation:** Pursuit lead by default; designated alternate per pursuit; Solutions VP for Tier I / Super 8.
**Watch for:** Pursuit Ops isn't in the room. If Woody can't commit, park with him as owner.
**Decision needed:** Approval authority policy.

### OQ-10 — Versioning strategy *(DISCO Product)*
**Recommendation:** Increment with snapshot.
**Watch for:** John may push for simpler overwrite if DISCO doesn't have a snapshot pattern. Counter: lossy version history blocks FORGE consumption.
**Decision needed:** Overwrite, snapshot, or branch.

### OQ-11 — [XX] placeholder handling *(Woody + DISCO Product)*
**Recommendation:** Warn at In Review; block at Approved.
**Watch for:** "Block at Approved" can be controversial — if approval is tight on deadline, blocking is a problem. Override mechanism is the answer.
**Decision needed:** Warn/block/allow at each transition.

### OQ-12 — .docx rendering location *(DISCO Product)*
**Recommendation:** Skill generates for P0/P1; DISCO regenerates as P2+.
**Watch for:** John may want DISCO-side render from the start. Counter: that's significant DISCO work; ship faster with skill-side.
**Decision needed:** Skill, DISCO, or hybrid.

---

## Track 3 — Scope boundaries, deferrals, infra (12 min) — 0:33 → 0:45

Fewer real decisions in this track. Most are status-checks or deferrals. You have an extra 3 minutes here vs. Tracks 1 and 2 — use it to absorb spillover if Tracks 1 or 2 ran long.

### OQ-5 — MCP write access timeline *(John)*
**Recommendation:** Fact-finding from John.
**Watch for:** Critical fact. P0(write)/P1 sequencing depends on John's answer.
**Decision needed:** Document John's timeline. No A/B/Park.

### OQ-7 — Delivery Brief sponsor *(Woody)*
**Recommendation:** Sponsorship decision for Woody.
**Watch for:** Out of scope for this BRD. 30-second flag, park as Woody's async item.
**Decision needed:** Owner identified (recommend parking).

### OQ-13 — Search semantics *(DISCO Product + CIP)*
**Recommendation:** Filtered for P0/P1; full-text for P1; semantic for P2+.
**Watch for:** Quick approval expected. If Kavya wants semantic earlier, that's a CIP-architecture question — park.
**Decision needed:** Sequencing.

### OQ-14 — MCP authentication *(Architecture / Security)*
**Recommendation:** Park. Architecture/Security owner needs to drive answer.
**Watch for:** Don't try to decide in the room. Confirm an owner exists.
**Decision needed:** Owner assigned.

---

## Close (3 min) — 0:45 → 0:48

Three things, in order:

1. **Confirm parked items have owners and due dates.** Read them out from the dashboard. If an owner isn't in the room, get a commitment from someone present to chase.
2. **Confirm next steps:** BRD v3 within 48 hours, schema lock after, DISCO product scoping begins.
3. **Export the summary live** — show the room what they're getting. Builds confidence the decisions won't drift.

---

## Buffer (12 min) — 0:48 → 1:00

15-minute buffer block held at the end of the meeting. Two usage modes:

**Mode A — overflow absorbed.** If the working agenda ran long (likely 5–10 min, OQ-15 is the usual culprit), the buffer covers it. Close cleanly when done; the meeting may end before 1:00.

**Mode B — extended discussion.** If decisions landed crisply but the conversation surfaced a downstream question worth exploring while everyone is in the room, use this time. Common candidates:
- Schema implications of OQ-15 decision (especially if Option B selected)
- DISCO product scoping conversation — what John would need next
- CIP RESEARCH layer dependencies (Kavya / Scott)
- SoluB skill update sequencing — when does the skill need to conform

Do **not** open a new OQ during the buffer. If a parked item or undecided OQ comes up, capture in notes and assign owner — don't try to decide.

---

## Anti-patterns to avoid as facilitator

- **Defending recommendations.** They're defaults, not your position. Let them be challenged.
- **Letting one OQ eat the clock.** If a discussion runs over 4 minutes, park it. The dashboard makes parking cheap.
- **Treating the meeting as a working session.** It isn't. Schema design happens before and after, not in the meeting.
- **Letting OQ-15 stay implicit.** Force the A vs B call early — too much downstream depends on it.
- **Letting the buffer become "let's solve OQ-14 right now."** Architecture/Security isn't in the room. The buffer is for downstream questions, not parked decisions.

---

## What you take away

- Dashboard export (markdown) → BRD v3 input
- Parked items list with owners → async follow-up
- Locked architecture (Option A or B) → DISCO product scoping unblocked
- 14 fewer open questions
- Buffer captures (if used) → notes for v3 or follow-up sessions
