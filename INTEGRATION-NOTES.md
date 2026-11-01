# Account, Cash, and Home design update

Base: the user-supplied phantom-ulrta-aX-main(1).zip. The canonical project is at the archive root. Thirty-five byte-identical files from the nested ph4ntom-v2-main copy were omitted to avoid shipping two conflicting project entry points.

## Included

- Full-screen account switcher from Home, the sidebar, and Settings > Manage Accounts.
- Create and rename accounts, select accounts, receive entry points, and account-specific profile pictures, including a camera file input.
- The Cash page with balance, pastel card, Receive Stablecoins, Buy Instantly, Bank Transfer, and activity.
- Plus > Add Cash opens the amount-entry screen directly. Cash-page funding returns to Cash after the existing payment review. The ZIP's order-funding review/return flow is preserved.
- The new English Home layout follows the October 30 screenshot: account and balance, readable small balances/changes, Send/Deposit pills, matching dark Cash and holding cards, and wide Perps positioning cards. The market positioning examples are labeled sample activity.

## Preserved charts

The uploaded LineChart and Candles implementations, full token/chart screen, trade-model.js, InteractionUI.jsx, base styles, and supplied React runtime were compared against the original ZIP and remain byte-identical. The new Home styles are scoped; they do not restyle token charts.

## Data and build

The startup rule that forcibly replaced the first saved account's handle, photo, and cash was removed. Account operations persist to the existing storage keys and keep balances separated. Account selection is blocked while an existing trade is being committed.

The build retains the provided React 19.3 runtime and exposes its matching portal export for the account switcher. New feature styles are bundled into www/styles.css and the standalone preview. The GitHub IPA workflow rebuilds web assets and adds camera/photo usage descriptions before compiling iOS.

## Validation

Production build and JavaScript syntax checks passed. Interaction checks cover saved-account preservation, account switching/creation/renaming, profile/camera controls, Settings entry, account-scoped funding review, returning to Cash, direct Plus funding, Send/Deposit entry points, and persistence after reload. The supplied runtime's portal export was verified. Chart/trading source comparisons passed. Workflow YAML and embedded Python parse successfully.

No GitHub IPA build or physical-device visual test was run during this update. Payment, receive, chat, and trade behavior retain the supplied project's local-demo scope.

## October 29 recording: empty-account Home

Reference: ScreenRecording_10-29-2026 08-58-58_1.mp4, supplied by the user. The user explicitly chose to retain balances and tokens on funded accounts' Home.

Empty accounts now show the recording-inspired welcome card and Deposit button, dismissible prediction-markets banner, three navigation pills, Explore Markets with watchlist/Trending/Majors/Memes filters, a market list, Show More sheet, support links, and the smaller bottom-search label. Funded accounts retain the preceding portfolio Home, including Send, Deposit, Cash, holdings, and Perps cards. To preview the new welcome layout, select or create an empty account.

RecordedHomeArtwork.js embeds welcome art, prediction artwork, and visible market icons extracted from the user's video. Icon crops include their original ranking badges where visible. Market values are historical reference snapshots, labeled in the interface; they are not presented as a current live feed. Existing canonical assets are used when opening a matching known token.

Interaction checks passed for empty/funded branching, three empty-account nav pills, Deposit/Cash, both market filters, expanded list/scroll lock/Escape, market-detail navigation, support, persistent banner dismissal, and small funded holdings. The account and Cash integration checks also passed. The uploaded chart components and full token-detail screen remain unchanged. Build/syntax checks passed. Layout sizes were measured from recording frames; no physical-iPhone visual test was run.

## Home v150 correction

The recorded banner, market filters/list, and support section now apply to funded accounts as well as empty accounts. Funded accounts keep their balance, Send/Deposit actions, Cash, owned tokens, and stock positions. The banner appears above the holdings and the recorded market list follows them. The previous wide Perps/prediction/watchlist stacks were removed from funded Home. Empty accounts continue to use the welcome card. All accounts now use the three-tab navigation from the recording.

This supersedes the earlier empty-only layout restriction. A fresh campaign-dismissal key makes the new banner visible on this revision without changing wallet storage. Checks passed for the funded banner/holdings/markets order, balances/precision, account and funding flows, and empty-account behavior. The stable preview and fresh v150 preview contain the exact same build.


## Home v151: October 31 portfolio screenshot

The new supplied screenshot replaces v150 on funded accounts. Home now orders account/balance, Send and Deposit, Cash, owned tokens, and the compact horizontal BTC/ETH/ZEC Perps cards. The prediction banner and Explore Markets stack are restricted to the existing empty-account welcome. Card spacing, side insets, typography and search bar follow the latest reference. Account name/photo, actual saved balances and holdings are preserved; reference balances are not written into storage. Perps cards show the supplied reference snapshot and route to the existing Perps trading view. Stock holdings remain below Perps when present.

Build/syntax and focused account/funding/Home interaction checks passed. The supplied chart components, full token screen, trade model and trade dialogs remain unchanged. The workflow retains the macos-15 runner correction. No browser rendering, physical-device test or live GitHub IPA build was performed.


## Home v152: design-only refinement

Clarification: match the screenshot visually, preserving account content and behavior. Adjusted Home typography and balance scale, nav pill dimensions, neutral card surfaces and subtle top edges, token text density, percentage badge, Perps type and bottom search treatment. No account migration or balance changes. Build/syntax and Home interaction checks passed; no browser or physical-device visual verification was performed.
