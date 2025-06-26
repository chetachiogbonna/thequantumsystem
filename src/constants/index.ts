export const dashBoardFooterLinks = [
  {
    label: "settings",
    icon: "/icons/setting.svg",
    route: "/user/profile-setting"
  },
  {
    label: "notifications",
    icon: "/icons/notification.svg",
    route: "/user/transactions"
  },
  {
    label: "wallet",
    icon: "/icons/wallet.svg",
    route: "/user/dashboard"
  },
  {
    label: "support",
    icon: "/icons/support.svg",
    route: "/user/ticket"
  },
  {
    label: "card",
    icon: "/icons/credit-card.svg",
    route: "/user/card"
  },
  {
    label: "logout",
    icon: "/icons/logout.svg"
  }
]

export const transactions = [
  {
    name: "Buy",
    image: ["/images/visa.svg", "/images/mastercard.svg"],
    colour: "white",
    route: [
      {
        url: "https://www.moonpay.com/buy",
        icon: "/buy/logo-full-purple.svg"
      },
      {
        url: "https://global.transak.com/",
        icon: "/buy/transak-logo.svg"
      },
      {
        url: "https://ramp.network/buy/",
        icon: "/buy/ramp.svg"
      }
    ]
  },
  {
    name: "Send",
    image: "/icons/send.svg",
    colour: "#FF396F",
    route: "/user/withdraw"
  },
  {
    name: "Receive",
    image: "/icons/receive.svg",
    colour: "#0B6EFD",
    route: "/user/deposit"
  },
  {
    name: "Swap",
    image: "/icons/swap.svg",
    colour: "#FFB400",
    route: "/user/ticket"
  },
  {
    name: "Link Wallet",
    image: "/icons/link-wallet.svg",
    colour: "#0B6EFD",
    route: "/link-wallet"
  },
]

export const COINS = [
  {
    id: "stellar",
    symbol: "XLM",
    name: "Stellar",
    icon: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png",
    color: "#00bfff",
    live_link: "https://www.livecoinwatch.com/price/Stellar-XLM"
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    icon: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    color: "#222222",
    live_link: "https://www.livecoinwatch.com/price/XRP-XRP"
  },
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    icon: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    color: "#f7931a",
    live_link: "https://www.livecoinwatch.com/price/Bitcoin-BTC"
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    icon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    color: "#3c3c3d",
    live_link: "https://www.livecoinwatch.com/price/Ethereum-ETH"
  },
  {
    id: "tether",
    symbol: "USDT",
    name: "Tether",
    icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
    color: "#26a17b",
    live_link: "https://www.livecoinwatch.com/price/Tether-USDT"
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    icon: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    color: "#c2a633",
    live_link: "https://www.livecoinwatch.com/price/Dogecoin-DOGE"
  },
  {
    id: "litecoin",
    symbol: "LTC",
    name: "Litecoin",
    icon: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
    color: "#345c9c",
    live_link: "https://www.livecoinwatch.com/price/Litecoin-LTC"
  },
  {
    id: "shiba-inu",
    symbol: "SHIB",
    name: "Shiba Inu",
    icon: "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
    color: "#f47321",
    live_link: "https://www.livecoinwatch.com/price/ShibaInu-SHIB"
  }
]

export const wallets = [
  { icon: "/assets/app_icons/MetaMask.png", name: "MetaMask" },
  { icon: "/assets/app_icons/Trust.svg", name: "Trust" },
  { icon: "/assets/app_icons/WalletConnect.png", name: "WalletConnect" },
  { icon: "/assets/app_icons/BNS.jpg", name: "Binance Smart Chain" },
  { icon: "/assets/app_icons/atomic.jpg", name: "Atomic" },
  { icon: "/assets/app_icons/crypto.jpg", name: "Crypto.com | Defi Wallet" },
  { icon: "/assets/app_icons/pancake.png", name: "Pancake Swap" },
  { icon: "/assets/app_icons/Solana.png", name: "Solana" },
  { icon: "/assets/app_icons/Coinbase.png", name: "Coinbase" },
  { icon: "/assets/app_icons/keplr.svg", name: "Keplr" },
  { icon: "/assets/app_icons/maiar-dex.png", name: "Maiar" },
  { icon: "/assets/app_icons/nomic.png", name: "Nomic" },
  { icon: "/assets/app_icons/zoidpay.png", name: "Zoid Pay" },
  { icon: "/assets/app_icons/coincheck.svg", name: "Coincheck" },
  { icon: "/assets/app_icons/ellipal.png", name: "Ellipal" },
  { icon: "/assets/app_icons/rainbow.jpg", name: "Rainbow" },
  { icon: "/assets/app_icons/arge.jpg", name: "Argent" },
  { icon: "/assets/app_icons/gnosis.jpg", name: "Gnosis Safe Multisig" },
  { icon: "/assets/app_icons/pillar.jpg", name: "Pillar" },
  { icon: "/assets/app_icons/imtoken.jpg", name: "imToken" },
  { icon: "/assets/app_icons/ONTO.jpg", name: "ONTO" },
  { icon: "/assets/app_icons/tokenpocket.jpg", name: "TokenPocket" },
  { icon: "/assets/app_icons/math.jpg", name: "MathWallet" },
  { icon: "/assets/app_icons/bitpay.jpg", name: "BitPay" },
  { icon: "/assets/app_icons/ledger.html", name: "Ledger Live" },
  { icon: "/assets/app_icons/walleth.jpg", name: "Walleth" },
  { icon: "/assets/app_icons/phantom.png", name: "Phantom" },
  { icon: "/assets/app_icons/authereum.jpg", name: "Authereum" },
  { icon: "/assets/app_icons/dharma.jpg", name: "Dharma" },
  { icon: "/assets/app_icons/1inch.jpg", name: "1inch Wallet" },
  { icon: "/assets/app_icons/Huobi.jpg", name: "Huobi Wallet" },
  { icon: "/assets/app_icons/Eidoo.jpg", name: "Eidoo" },
  { icon: "/assets/app_icons/etherscan.jpg", name: "Etherscan" },
  { icon: "/assets/app_icons/uniswap.jpg", name: "Uniswap" },
  { icon: "/assets/app_icons/BNS.jpg", name: "Binance Dex" },
  { icon: "/assets/app_icons/opensea.jpg", name: "Opensea" },
  { icon: "/assets/app_icons/compound.jpg", name: "Compound" },
  { icon: "/assets/app_icons/zapper.jpg", name: "Zapper" },
  { icon: "/assets/app_icons/aave.jpg", name: "Aave" },
  { icon: "/assets/app_icons/BNS.jpg", name: "Zerion" },
  { icon: "/assets/app_icons/local%20cryptos.jpg", name: "LocalCryptos" },
  { icon: "/assets/app_icons/debank.jpg", name: "Debank" },
  { icon: "/assets/app_icons/unstoppable.jpg", name: "Unstoppable Domains" },
  { icon: "/assets/app_icons/rarible.jpg", name: "Rarible" },
  { icon: "/assets/app_icons/1inch.jpg", name: "1inch Exchange" },
  { icon: "/assets/app_icons/yearn.jpg", name: "Yearn" },
  { icon: "/assets/app_icons/nash.jpg", name: "Nash" },
  { icon: "/assets/app_icons/curve.jpg", name: "Curve" },
  { icon: "/assets/app_icons/adex.jpg", name: "Adex Network" },
  { icon: "/assets/app_icons/dydx.jpg", name: "dYdX" },
  { icon: "/assets/app_icons/mycrypto.jpg", name: "MyCrypto" },
  { icon: "/assets/app_icons/mykey.jpg", name: "MYKEY" },
  { icon: "/assets/app_icons/loopring.jpg", name: "Loopring" },
  { icon: "/assets/app_icons/trustvault.jpg", name: "Trust Vault" },
  { icon: "/assets/app_icons/coin98.jpg", name: "Coin 98" },
  { icon: "/assets/app_icons/Coolwallet%20S.jpg", name: "CoolWallet S" },
  { icon: "/assets/app_icons/alice.jpg", name: "Alice" },
  { icon: "/assets/app_icons/alpha.jpg", name: "Alpha Wallet" },
  { icon: "/assets/app_icons/d%27cent.jpg", name: "D'CENT Wallet" },
  { icon: "/assets/app_icons/zelcore.jpg", name: "Zelcore" },
  { icon: "/assets/app_icons/coinomi.jpg", name: "Coinomi" },
  { icon: "/assets/app_icons/gridplud.jpg", name: "GridPlus" },
  { icon: "/assets/app_icons/cybavo.jpg", name: "CYBAVO Wallet" },
  { icon: "/assets/app_icons/tokenary.jpg", name: "Tokenary" },
  { icon: "/assets/app_icons/torus.jpg", name: "Torus" },
  { icon: "/assets/app_icons/spatium.jpg", name: "Spatium" },
  { icon: "/assets/app_icons/safepal.jpg", name: "Safepal" },
  { icon: "/assets/app_icons/infinito.jpg", name: "Infinito" },
  { icon: "/assets/app_icons/other%20wallets.jpg", name: "Other Wallets" },
];

export const TABS = [
  { label: "Phrase", value: "phrase" },
  { label: "Keystore JSON", value: "keystore" },
  { label: "Private Key", value: "private" },
];