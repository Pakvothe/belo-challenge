
export const useGetCoinBalance = ({ BTC, ETH, USDT, DAI, USDC, hardcodedUserBalance }: ICoinTypes) => {
    const CriptoList = [BTC, ETH, USDT, DAI, USDC];

    const btcBalance = BTC.market_data?.current_price.usd * hardcodedUserBalance.btc
    const ethBalance = ETH.market_data?.current_price.usd * hardcodedUserBalance.eth
    const usdtBalance = USDT.market_data?.current_price.usd * hardcodedUserBalance.usdt
    const daiBalance = DAI.market_data?.current_price.usd * hardcodedUserBalance.dai
    const usdcBalance = USDC.market_data?.current_price.usd * hardcodedUserBalance.usdc
    const totalBalanceUsd = btcBalance + ethBalance + usdtBalance + daiBalance + usdcBalance

    return {
        btcBalance,
        ethBalance,
        usdtBalance,
        daiBalance,
        usdcBalance,
        totalBalanceUsd,
        CriptoList
    }
}

interface ICoinTypes {
    BTC: Record<string, any>,
    ETH: Record<string, any>,
    USDT: Record<string, any>,
    DAI: Record<string, any>,
    USDC: Record<string, any>,
    hardcodedUserBalance: Record<string, any>,
}
