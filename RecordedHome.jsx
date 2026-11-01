import React, { useEffect, useRef, useState } from "react";
import artwork from "./RecordedHomeArtwork.js";

// Reference snapshots supplied in the October 29 screen recording.
export const HOME_MARKETS = [
  { sym: "GTA6", name: "GTA6", price: .0218, chg: 228.7, mc: "22M" },
  { sym: "TTWO", name: "Take-Two Interactive", price: 197.60, chg: -1.62, mc: "3M" },
  { sym: "NVDA", name: "NVIDIA", price: 213.35, chg: -2.37, mc: "5.1M" },
  { sym: "GOOGL", name: "Alphabet", price: 283.43, chg: -12.55, mc: "37M" },
  { sym: "PONS", name: "PONS", price: .27, chg: -4.68, mc: "186M" },
  { sym: "MU", name: "Micron", price: 946.61, chg: -2.56, mc: "676K" },
  { sym: "BTC", name: "BTC", price: .00377471, chg: -19.69, mc: "3.7M" },
  { sym: "FLOAT", name: "Float", price: .00149606, chg: 2206, mc: "1.5M" },
  { sym: "STONK", name: "STONK", price: .14, chg: -2.88, mc: "112M" },
  { sym: "SPX", name: "SPX", price: .40, chg: 5.31, mc: "369M" },
  { sym: "PYTH", name: "Pyth Network", price: .0727, chg: 1.67, mc: "571M" },
  { sym: "PUMP", name: "Pump", price: .00440765, chg: 4.85, mc: "1.6B" },
  { sym: "ARC", name: "arc", price: .0443, chg: -8.59, mc: "444M" },
  { sym: "CBHYPE", name: "CBHYPE", price: 90.87, chg: 13.02, mc: "3.8M" },
  { sym: "CARDS", name: "CARDS", price: .28, chg: -6.37, mc: "246M" },
  { sym: "MET", name: "MET", price: .30, chg: -3.97, mc: "168M" },
  { sym: "BOOMER", name: "BOOMER", price: .0000369, chg: 16.31, mc: "2.5M" },
  { sym: "AXIS", name: "AXIS", price: .14, chg: -34.66, mc: "23M" },
  { sym: "PURR", name: "PURR", price: .00289622, chg: 112.8, mc: "2.8M" },
  { sym: "NEAR", name: "NEAR", price: 4.45, chg: -3.04, mc: "13M" },
].map(row => ({ ...row, img: artwork[row.sym], referenceSnapshot: true }));

const priceText = value => "$" + Number(value || 0).toLocaleString("en-US", {
  minimumFractionDigits: value >= .01 ? 2 : 0, maximumFractionDigits: value >= 1 ? 2 : 8,
});
const changeText = value => (value >= 0 ? "+" : "") + Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 }) + "%";

export default function RecordedHome({ onDeposit, onPredict, onOpen, onWatchlist, onHelp, onDisclosures, tokens, icons, Logo, showWelcome = true, children }) {
  const [banner, setBanner] = useState(() => { try { return localStorage.getItem("phantom-recorded-prediction-dismissed-v150") !== "1"; } catch { return true; } });
  const [category, setCategory] = useState("Trending");
  const [expanded, setExpanded] = useState(false);
  const dialog = useRef(null);
  const close = useRef(null);
  useEffect(() => {
    if (!expanded) return;
    const overflow = document.body.style.overflow;
    const focus = document.activeElement;
    document.body.style.overflow = "hidden";
    close.current?.focus({ preventScroll: true });
    return () => { document.body.style.overflow = overflow; focus?.focus?.({ preventScroll: true }); };
  }, [expanded]);
  const rows = category === "Trending" ? HOME_MARKETS
    : category === "Majors" ? tokens.filter(row => row.tag === "Blue Chips")
    : tokens.filter(row => row.tag === "Memes");
  const rowView = row => <button key={row.sym} className="recorded-market-row" onClick={() => { setExpanded(false); onOpen(row); }}>
    {row.img ? <img className="recorded-market-icon" src={row.img} alt="" /> : <Logo id={row.sym} size={40} />}
    <span className="recorded-market-name"><strong>{row.sym}</strong><small>${row.mc || "—"} MC</small></span>
    <span className="recorded-market-value"><strong>{priceText(row.price)}</strong><small className={row.chg >= 0 ? "recorded-positive" : "recorded-negative"}>{changeText(row.chg)}</small></span>
  </button>;
  return <>
    <div className={"recorded-home" + (!showWelcome ? " recorded-home--funded" : "")}>
      {showWelcome && <section className="recorded-welcome" aria-label="Welcome">
        <img src={artwork.welcome} alt="" />
        <h1>Welcome to Phantom</h1><p>Fund your account to start trading.</p>
        <button type="button" className="recorded-deposit" onClick={onDeposit}>Deposit</button>
      </section>}
      {banner && <section className="recorded-prediction-banner" aria-label="Prediction markets">
        <button type="button" className="recorded-banner-close" aria-label="Dismiss prediction banner" onClick={() => { setBanner(false); try { localStorage.setItem("phantom-recorded-prediction-dismissed-v150", "1"); } catch {} }}>{icons.x(14, "#96969c")}</button>
        <div className="recorded-banner-text"><small>CRYPTO, SPORTS &amp; MORE</small><p>Prediction markets<br />have landed <span role="img" aria-label="United States">🇺🇸</span></p><button type="button" onClick={onPredict}>Start predicting ›</button></div>
        <img src={artwork.prediction} alt="" />
      </section>}
      {children && <div className="recorded-portfolio">{children}</div>}
      <section className="recorded-markets" aria-label="Explore Markets">
        <button type="button" className="recorded-section-heading" onClick={() => setExpanded(true)}>Explore Markets {icons.chev(19)}</button>
        <div className="recorded-market-filters"><button type="button" aria-label="Watchlist" onClick={onWatchlist}>{icons.heart(20)}</button>
          {["Trending", "Majors", "Memes"].map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div>{rows.slice(0, 10).map(rowView)}</div>
        <button type="button" className="recorded-show-more" onClick={() => setExpanded(true)}>Show More</button>
        {category === "Trending" && <small className="recorded-reference-note">Market snapshot from the recording</small>}
      </section>
      <section className="recorded-support"><h2>Support</h2>
        <button type="button" onClick={() => onHelp("View FAQ")}>View FAQ {icons.chev(16)}</button>
        <button type="button" onClick={() => onHelp("Chat with us")}>Chat with us {icons.chev(16)}</button>
        <button type="button" className="recorded-disclosures" onClick={onDisclosures}>{icons.info(16, "#96969c")} View Disclosures</button>
      </section>
    </div>
    {expanded && <div className="recorded-market-overlay" role="dialog" aria-modal="true" aria-label={category} ref={dialog} onKeyDown={event => {
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); setExpanded(false); }
      if (event.key === "Tab") {
        const controls = [...dialog.current.querySelectorAll("button")], first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }}><div className="recorded-market-panel anim-sheet">
      <header><button ref={close} type="button" aria-label="Close market list" onClick={() => setExpanded(false)}><span /></button><div><h2>{category}</h2><button type="button" aria-label="Close market list" onClick={() => setExpanded(false)}>{icons.x(18, "#fff")}</button></div></header>
      <div className="recorded-expanded-rows">{rows.map(rowView)}{category === "Trending" && <small className="recorded-reference-note">Market snapshot from the recording</small>}</div>
    </div></div>}
  </>;
}
