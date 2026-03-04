/**
 * SIGNAL — Cognitive Bias Glossary
 * Adds click-triggered definition popups to any .bias-tag element.
 * Uses event delegation so it works with dynamically shown tab panels.
 */

(function () {

  // ── DEFINITIONS ──────────────────────────────────────────────────────────
  const BIASES = {
    'Loss Aversion': {
      definition: 'People feel the pain of a loss roughly twice as intensely as the pleasure of an equivalent gain. The sting of losing $50 hurts more than the joy of finding $50.',
      example: 'A seller fixates on the risk of "selling too cheap" far more than the opportunity of the purchase they\'re moving toward — even when the numbers favour the move.'
    },
    'Recency Bias': {
      definition: 'We give disproportionate weight to recent events when predicting the future, assuming the current trend will continue indefinitely.',
      example: 'A seller who has watched prices rise for six months assumes they\'ll keep rising and refuses to list. A seller who\'s seen one month of softening panics and wants to sell immediately.'
    },
    'Anchoring': {
      definition: 'The first number we encounter becomes a reference point — an anchor — against which all subsequent figures are judged, regardless of whether the first number was accurate.',
      example: 'The first price estimate an agent gives lodges in the seller\'s mind. Every subsequent figure — from other agents, from the market — is measured against that initial anchor.'
    },
    'Worst-Case Thinking': {
      definition: 'A cognitive pattern where the mind gravitates to the most negative possible outcome, regardless of probability. The rare worst case feels more real than the likely best case.',
      example: 'The Anxious Upgrader imagines selling for less than expected and buying for more, ending up financially worse off — even when the data shows this outcome is unlikely.'
    },
    'Endowment Effect': {
      definition: 'We place a higher value on things we own than identical things we don\'t own — simply because they\'re ours.',
      example: 'Sellers consistently believe their home is worth more than comparable sold properties. The renovations they remember doing, the memories embedded in the walls — all invisible to buyers, all very real to owners.'
    },
    'Sunk Cost': {
      definition: 'The tendency to factor in past investments when making future decisions, even when those past costs are gone and irrelevant to current choices.',
      example: 'A seller insists the $80,000 kitchen renovation must be reflected in the price — even though buyers are comparing to the market, not to receipts. The cost is sunk. The market doesn\'t care.'
    },
    'Status Quo Bias': {
      definition: 'A strong preference for the current state of affairs. Change — even positive change — feels riskier than staying put, regardless of the actual risk profile.',
      example: 'The Reluctant Downsizer knows intellectually that moving makes sense. But staying requires no action, no decision, no risk. The status quo always wins unless a compelling reason to change is made very clear.'
    },
    'Emotional Priming': {
      definition: 'When an emotional state influences how subsequent information is perceived and processed. We don\'t receive information neutrally — it passes through whatever emotion we\'re already carrying.',
      example: 'The grief of leaving a family home primes a Reluctant Downsizer to interpret any process-focused conversation as coldness — even when it isn\'t. Emotion must be acknowledged before logic can be heard.'
    },
    'Confirmation Bias': {
      definition: 'The tendency to search for, interpret, and remember information in a way that confirms what we already believe — and to discount evidence that contradicts it.',
      example: 'The Cynical Veteran has decided all agents over-promise. When an agent quotes high, it confirms the theory. When an agent quotes realistically, they find a reason to distrust that too. The belief protects itself.'
    },
    'Social Proof (inverted)': {
      definition: 'Where most people follow the crowd as a shortcut to good decisions, some use an inverted version: if everyone believes it, it\'s probably wrong. Especially true for people who\'ve been burned by consensus before.',
      example: 'The agent with the most "For Sale" boards on the street triggers suspicion, not confidence, in a Cynical Veteran. Volume is evidence of marketing, not of results.'
    },
    'Authority Scepticism': {
      definition: 'A learned resistance to claims of expertise or authority — particularly common in people who have had negative experiences with those in authority positions.',
      example: 'After being over-quoted by three agents in a previous sale, a Cynical Veteran has trained themselves not to accept market expertise claims at face value. Credentials mean nothing. Evidence means everything.'
    },
    'Consistency Heuristic': {
      definition: 'We use observed past behaviour as a reliable shortcut to predict future behaviour — assuming people and institutions will act in the future as they have in the past.',
      example: 'How an agent behaves in the first interaction — whether they do exactly what they said, respond when they said they would — is used by sellers as a model for how the whole campaign will run.'
    },
    'Social Comparison': {
      definition: 'We evaluate our own status, value, and decisions by comparing ourselves to relevant others — particularly those in our peer group or social circle.',
      example: 'A Status Seller\'s price expectation is shaped not by the market data but by what their neighbour\'s house "went for" — especially if that neighbour is someone they see themselves as comparable to.'
    },
    'Halo Effect': {
      definition: 'When a positive impression in one area bleeds into assessments in completely unrelated areas. We assume that someone who excels in one thing excels in everything.',
      example: 'An agent who arrives impeccably presented with premium materials creates an assumption of excellence that extends to their negotiation, communication, and results — before a single word about the actual campaign.'
    },
    'Prestige Pricing Bias': {
      definition: 'The belief that higher price signals higher quality — and that a premium figure reflects a more sophisticated understanding of value.',
      example: 'A Status Seller is more reassured by an agent who quotes $2.1M than one who quotes $1.85M — not because the higher figure is more accurate, but because it confirms the home\'s prestige identity.'
    },
    'Identity Preservation': {
      definition: 'The drive to make decisions that are consistent with our self-concept — to protect the story we tell ourselves about who we are and what we\'ve achieved.',
      example: 'For a Status Seller, accepting a below-expectation result doesn\'t just feel like a financial loss. It threatens their identity as someone who makes good decisions and owns something remarkable.'
    },
    'Scarcity (time)': {
      definition: 'When a resource is perceived as limited, its value increases and decision-making becomes more urgent — sometimes to the point of compromising quality of choice.',
      example: 'A Pressure Seller experiencing financial distress or a tight legal timeline feels time as a scarce resource. This urgency affects every decision — often in ways that skilled agents can help them manage rather than exploit.'
    },
    'Trust Heuristic': {
      definition: 'In complex or overwhelming situations, we use feelings of trust or distrust as a mental shortcut — replacing detailed evaluation with a gut-level question: do I trust this person?',
      example: 'A Pressure Seller is too exhausted to evaluate agent credentials carefully. They default to one question: does this person feel safe? An agent who triggers that feeling wins — not on merit, but on emotional signal.'
    },
    'Vulnerability Sensitivity': {
      definition: 'When we are in a weakened or exposed position, we become acutely attuned to signals of potential exploitation — sometimes to the point of misreading neutral behaviour as threatening.',
      example: 'A Pressure Seller in financial distress reads every question about their timeline or circumstances as potential leverage. Even innocent admin questions can feel like probing for weakness.'
    },
    'Decision Fatigue': {
      definition: 'After making many decisions, the quality of our choices deteriorates. We become more likely to choose the default option, avoid trade-offs, or make impulsive choices just to stop deciding.',
      example: 'A Pressure Seller who has been navigating a divorce, legal process, and financial stress is making dozens of decisions a day. An agent who adds complexity or pressure will lose them to the agent who removes it.'
    },
    'Information Bias': {
      definition: 'The tendency to seek more information even when the additional information wouldn\'t change — or might actually worsen — the quality of the decision.',
      example: 'An Analytical Controller keeps requesting more comparable sales, more data, more time to review. The information gathering becomes a way to feel in control rather than a genuine input to a better decision.'
    },
    'Overconfidence Effect': {
      definition: 'We consistently overestimate the accuracy of our own knowledge and judgments — particularly in domains where we feel we have some expertise.',
      example: 'An Analytical Controller who has spent three weeks researching the market believes their own price model is more reliable than the agent\'s. They\'ve done the work — but they\'re missing the nuance of having sat in 40 appraisals this year.'
    },
    'Analysis Paralysis': {
      definition: 'A state where overthinking prevents timely action. The search for the optimal decision results in no decision — which is itself a costly choice.',
      example: 'An Analytical Controller can spend months comparing agents, waiting for better data, or reconsidering their timing. Every variable considered reveals another variable. The perfect moment never arrives.'
    },
    'Authority Bias': {
      definition: 'The tendency to attribute greater accuracy and trustworthiness to the opinions of authority figures — and to comply with their recommendations, even without scrutinising the evidence behind them.',
      example: 'A seller defers to the agent who has the most sold signs in the street, the biggest agency brand, or the most confident manner — because these signals read as authority. The agent\'s actual track record for similar properties may tell a different story.'
    },
    'Trust Bias': {
      definition: 'A cognitive shortcut where we extend trust based on surface signals — warmth, confidence, professional appearance — rather than track record. Once trust is formed, we discount contradictory information.',
      example: 'A seller who likes an agent in the first meeting will rationalise away early warning signs — missed callbacks, vague timelines — because the initial trust impression is sticky and hard to revise.'
    },
    'Emotional Anchoring': {
      definition: 'When an emotional experience or memory becomes the fixed reference point against which all related decisions are measured — often without conscious awareness.',
      example: 'A seller who bought during a market peak anchors emotionally to that price. Every subsequent valuation is measured against what they paid, not what the market currently supports. The purchase price is not a market fact — it is an emotional anchor.'
    },
    'Identity Bias': {
      definition: 'The tendency to make decisions that protect or reinforce our sense of who we are, rather than decisions that are purely rational or financially optimal.',
      example: 'A seller in a prestige suburb refuses a realistic price because accepting it would conflict with their identity as someone who owns a premium property. The price is not just a number — it is a statement about who they are.'
    },
    'Social Proof': {
      definition: 'The tendency to look to the behaviour of others as a signal of what is correct — particularly in uncertain situations. If others are doing it, it must be right.',
      example: 'A seller chooses the agent with the most listings on their street, the most five-star reviews, or the busiest open days. The crowd\'s choice becomes their proof of quality — regardless of whether it reflects actual outcomes.'
    },
    'Contrast Framing': {
      definition: 'We evaluate options not in isolation but relative to what was presented immediately before. A deliberately high anchor makes a subsequent offer seem reasonable by comparison.',
      example: 'An agent who presents a high potential price range first makes a slightly lower but realistic figure seem modest and safe. The seller accepts something they might have questioned if it had been presented first.'
    },
    'Novelty Bias': {
      definition: 'A preference for new, fresh, or recently introduced ideas and information — sometimes at the expense of proven approaches. Novelty is perceived as evidence of progress or sophistication.',
      example: 'A seller is drawn to the agent who presents a new digital marketing platform or a unique campaign strategy — even when traditional methods have better results for their property type. New feels like better.'
    },
    'Status Signalling': {
      definition: 'The use of choices, purchases, and associations to communicate social status and identity to others — and to oneself. The decision is partly functional, partly performative.',
      example: 'A Status Seller chooses the agent they would be comfortable naming at a dinner party. The agent\'s brand, presentation, and language are all part of a signal they intend to send — the sale itself is secondary to the story it tells.'
    },
    'Scarcity': {
      definition: 'Perceived scarcity increases the perceived value of an item or opportunity. The possibility of missing out activates a fear response disproportionate to the actual risk.',
      example: 'A seller who believes there are multiple interested buyers — even without confirmation — becomes more decisive and more flexible on terms. The fear of losing the opportunity overrides the instinct to negotiate.'
    },
    'Cognitive Ease': {
      definition: 'We prefer things that are easy to think about and process. Simple, familiar, and clearly presented information feels more trustworthy than complex or dense information — regardless of actual accuracy.',
      example: 'A Pressure Seller will choose the agent whose process is easiest to understand, whose documents are clearest, and whose language is simplest. Complexity reads as risk. Clarity reads as competence.'
    },
    'Anchoring Bias': {
      definition: 'The first number we encounter becomes a reference point — an anchor — against which all subsequent figures are judged, regardless of whether the first number was accurate or relevant.',
      example: 'The first price estimate an agent gives lodges in the seller\'s mind. Every subsequent figure — from other agents, from the market — is measured against that initial anchor. A realistic number offered second always feels like a discount.'
    }
  };

  // ── CSS ───────────────────────────────────────────────────────────────────
  var css = [
    '.bias-tag {',
    '  cursor: pointer;',
    '}',
    '.bias-tag:hover {',
    '  background: rgba(196,146,42,0.28) !important;',
    '  border-color: rgba(196,146,42,0.45) !important;',
    '}',
    '#bias-popup {',
    '  position: fixed;',
    '  z-index: 99999;',
    '  width: 320px;',
    '  max-width: calc(100vw - 20px);',
    '  background: #ffffff;',
    '  border: 1px solid #e2ddd6;',
    '  border-radius: 14px;',
    '  box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);',
    '  overflow: hidden;',
    '  opacity: 0;',
    '  transform: translateY(6px) scale(0.98);',
    '  transition: opacity 0.15s ease, transform 0.15s ease;',
    '  pointer-events: none;',
    '  display: none;',
    '}',
    '#bias-popup.bp-ready {',
    '  display: block;',
    '}',
    '#bias-popup.bp-visible {',
    '  opacity: 1;',
    '  transform: translateY(0) scale(1);',
    '  pointer-events: all;',
    '}',
    '#bias-popup .bp-head {',
    '  background: #0a0a0a;',
    '  padding: 16px 18px 14px;',
    '  display: flex;',
    '  align-items: flex-start;',
    '  justify-content: space-between;',
    '  gap: 12px;',
    '}',
    '#bias-popup .bp-label {',
    '  font-family: "Space Mono", monospace;',
    '  font-size: 9px;',
    '  letter-spacing: 0.14em;',
    '  text-transform: uppercase;',
    '  color: rgba(255,255,255,0.35);',
    '  margin-bottom: 4px;',
    '}',
    '#bias-popup .bp-name {',
    '  font-family: "Space Grotesk", sans-serif;',
    '  font-size: 15px;',
    '  font-weight: 600;',
    '  color: #ffffff;',
    '  line-height: 1.2;',
    '}',
    '#bias-popup .bp-close {',
    '  background: rgba(255,255,255,0.08);',
    '  border: none;',
    '  color: rgba(255,255,255,0.6);',
    '  width: 26px;',
    '  height: 26px;',
    '  border-radius: 50%;',
    '  cursor: pointer;',
    '  font-size: 16px;',
    '  line-height: 26px;',
    '  text-align: center;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  flex-shrink: 0;',
    '  transition: background 0.15s;',
    '}',
    '#bias-popup .bp-close:hover {',
    '  background: rgba(255,255,255,0.18);',
    '  color: #fff;',
    '}',
    '#bias-popup .bp-body {',
    '  padding: 18px;',
    '}',
    '#bias-popup .bp-def-label {',
    '  font-family: "Space Mono", monospace;',
    '  font-size: 9px;',
    '  letter-spacing: 0.14em;',
    '  text-transform: uppercase;',
    '  color: #7a7268;',
    '  margin-bottom: 8px;',
    '}',
    '#bias-popup .bp-def {',
    '  font-family: "Space Grotesk", sans-serif;',
    '  font-size: 13px;',
    '  color: #3d3830;',
    '  line-height: 1.6;',
    '  margin-bottom: 14px;',
    '}',
    '#bias-popup .bp-example-block {',
    '  background: #FFF0E8;',
    '  border-left: 3px solid #E83A0C;',
    '  border-radius: 0 8px 8px 0;',
    '  padding: 12px 14px;',
    '}',
    '#bias-popup .bp-eg-label {',
    '  font-family: "Space Mono", monospace;',
    '  font-size: 9px;',
    '  letter-spacing: 0.14em;',
    '  text-transform: uppercase;',
    '  color: #E83A0C;',
    '  margin-bottom: 6px;',
    '}',
    '#bias-popup .bp-eg {',
    '  font-family: "Space Grotesk", sans-serif;',
    '  font-size: 12px;',
    '  color: #3d3830;',
    '  line-height: 1.55;',
    '  font-style: italic;',
    '}',
    '#bias-popup .bp-foot {',
    '  padding: 10px 18px;',
    '  border-top: 1px solid #e2ddd6;',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 6px;',
    '}',
    '#bias-popup .bp-foot-dot {',
    '  width: 5px;',
    '  height: 5px;',
    '  border-radius: 50%;',
    '  background: #C4922A;',
    '  flex-shrink: 0;',
    '}',
    '#bias-popup .bp-foot-text {',
    '  font-family: "Space Mono", monospace;',
    '  font-size: 9px;',
    '  letter-spacing: 0.1em;',
    '  text-transform: uppercase;',
    '  color: #b8b0a4;',
    '}'
  ].join('\n');

  // ── INJECT STYLES ─────────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── BUILD POPUP ELEMENT ───────────────────────────────────────────────────
  var popup = document.createElement('div');
  popup.id = 'bias-popup';
  popup.setAttribute('role', 'tooltip');
  popup.innerHTML = [
    '<div class="bp-head">',
    '  <div>',
    '    <div class="bp-label">Cognitive Bias</div>',
    '    <div class="bp-name" id="bp-name">—</div>',
    '  </div>',
    '  <button class="bp-close" id="bp-close" aria-label="Close">&#x2715;</button>',
    '</div>',
    '<div class="bp-body">',
    '  <div class="bp-def-label">What it is</div>',
    '  <div class="bp-def" id="bp-def">—</div>',
    '  <div class="bp-example-block">',
    '    <div class="bp-eg-label">In real estate</div>',
    '    <div class="bp-eg" id="bp-eg">—</div>',
    '  </div>',
    '</div>',
    '<div class="bp-foot">',
    '  <div class="bp-foot-dot"></div>',
    '  <span class="bp-foot-text">Behavioural Economics — SIGNAL</span>',
    '</div>'
  ].join('');
  document.body.appendChild(popup);

  // ── STATE ─────────────────────────────────────────────────────────────────
  var activeTag = null;
  var hideTimer = null;

  // ── POSITION HELPER ───────────────────────────────────────────────────────
  function positionPopup(tagEl) {
    var rect = tagEl.getBoundingClientRect();
    var popupW = popup.offsetWidth || 320;
    var popupH = popup.offsetHeight || 280;
    var margin = 12;
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var left = rect.left;
    var top = rect.bottom + 8;

    // Clamp right edge
    if (left + popupW > vw - margin) {
      left = vw - popupW - margin;
    }
    // Clamp left edge
    if (left < margin) { left = margin; }

    // Flip above if not enough space below
    if (top + popupH > vh - margin) {
      top = rect.top - popupH - 8;
    }
    // Final top clamp
    if (top < margin) { top = margin; }

    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
  }

  // ── SHOW ──────────────────────────────────────────────────────────────────
  function showPopup(tagEl) {
    var biasName = tagEl.textContent.trim();
    var data = BIASES[biasName];
    if (!data) return;

    // Cancel any pending hide
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }

    // Populate content
    document.getElementById('bp-name').textContent = biasName;
    document.getElementById('bp-def').textContent = data.definition;
    document.getElementById('bp-eg').textContent = data.example;
    activeTag = tagEl;

    // Make it block so we can measure it, but keep opacity:0
    popup.classList.remove('bp-visible');
    popup.classList.add('bp-ready');
    popup.style.left = '-9999px';
    popup.style.top = '0px';

    // Wait one frame for layout, then position and fade in
    requestAnimationFrame(function () {
      positionPopup(tagEl);
      // Second rAF to ensure position is painted before adding transition
      requestAnimationFrame(function () {
        popup.classList.add('bp-visible');
      });
    });
  }

  // ── HIDE ──────────────────────────────────────────────────────────────────
  function hidePopup() {
    popup.classList.remove('bp-visible');
    activeTag = null;
    // Hide from layout after transition completes
    hideTimer = setTimeout(function () {
      popup.classList.remove('bp-ready');
      hideTimer = null;
    }, 200);
  }

  // ── EVENT DELEGATION — single listener handles all .bias-tag clicks ───────
  document.addEventListener('click', function (e) {
    // Did we click on a bias tag (or something inside one)?
    var tag = e.target.closest ? e.target.closest('.bias-tag') : null;

    // Fallback for older browsers without closest()
    if (!tag && e.target.classList && e.target.classList.contains('bias-tag')) {
      tag = e.target;
    }

    if (tag) {
      e.stopPropagation();
      // Toggle: click same tag again to close
      if (activeTag === tag && popup.classList.contains('bp-visible')) {
        hidePopup();
      } else {
        showPopup(tag);
      }
      return;
    }

    // Click outside popup → close it
    if (popup.classList.contains('bp-visible') && !popup.contains(e.target)) {
      hidePopup();
    }
  }, true); // useCapture:true so it fires even if child stops propagation

  // ── CLOSE BUTTON ──────────────────────────────────────────────────────────
  popup.addEventListener('click', function (e) {
    if (e.target.id === 'bp-close' || e.target.closest('#bp-close')) {
      e.stopPropagation();
      hidePopup();
    }
  });

  // ── KEYBOARD CLOSE ────────────────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup.classList.contains('bp-visible')) {
      hidePopup();
    }
  });

  // ── REPOSITION ON SCROLL / RESIZE ─────────────────────────────────────────
  window.addEventListener('resize', function () {
    if (activeTag && popup.classList.contains('bp-visible')) {
      positionPopup(activeTag);
    }
  });

  document.addEventListener('scroll', function () {
    if (activeTag && popup.classList.contains('bp-visible')) {
      positionPopup(activeTag);
    }
  }, true);

})();
