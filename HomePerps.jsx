import React from "react";

// Reference market snapshot from the supplied Home screenshot.
const MARKETS = [
  { symbol: "BTC", leverage: "40x", change: "-5.32%" },
  { symbol: "ETH", leverage: "25x", change: "-6.00%" },
  { symbol: "ZEC", change: "-7.84%" },
];

export default function HomePerps({ onOpen, Logo, icons }) {
  return <section className="home-perps-section" aria-label="Perpetual markets">
    <button type="button" className="home-perps-title" onClick={() => onOpen()}>Perps {icons.chev(20)}</button>
    <div className="home-perps-carousel">
      {MARKETS.map(market => <button type="button" className="home-perps-card" key={market.symbol} onClick={() => onOpen(market.symbol)} aria-label={`Explore ${market.symbol} perpetual markets; reference snapshot ${market.change}`}>
        {market.symbol === "ZEC" ? <svg className="home-zec-logo" width="44" height="44" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="21" fill="#F5B72C"/><path d="M14 13h17L16 30h15M21 7v6m0 17v7" fill="none" stroke="#080808" strokeWidth="4.5" strokeLinejoin="miter" /></svg> : <Logo id={market.symbol} size={44} />}
        <div className="home-perps-label"><strong>{market.symbol}</strong>{market.leverage && <span>{market.leverage}</span>}</div>
        <div className="home-perps-change">{market.change}</div>
      </button>)}
    </div>
  </section>;
}
