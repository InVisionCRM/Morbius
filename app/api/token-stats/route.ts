import { NextResponse } from 'next/server';

const TOKEN_ADDRESS = '0xB7d4eB5fDfE3d4d3B5C16a44A49948c6EC77c6F1';
const TRADING_ADDRESS = '0x6538A83a81d855B965983161AF6a83e616D16fD5';
const SCAN_BASE_URL = 'https://scan.pulsechain.box/api';

interface TokenTransfer {
  from: string;
  to: string;
  value: string;
  tokenDecimal: string;
  blockNumber: string;
  timeStamp: string;
  hash: string;
}

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: string;
  totalSupply: string;
  type: string;
}

interface TokenHolder {
  address: string;
  value: string;
}

export async function GET() {
  try {
    // Fetch token info (includes total supply)
    const tokenInfoResponse = await fetch(
      `${SCAN_BASE_URL}?module=token&action=getToken&contractaddress=${TOKEN_ADDRESS}`
    );
    const tokenInfoData = await tokenInfoResponse.json();

    console.log('Token Info API Response:', JSON.stringify(tokenInfoData, null, 2));

    if (tokenInfoData.status !== '1') {
      throw new Error(`Failed to fetch token info: ${tokenInfoData.message || 'Unknown error'}`);
    }

    const tokenInfo: TokenInfo = tokenInfoData.result;

    // Fetch token holders
    const holdersResponse = await fetch(
      `${SCAN_BASE_URL}?module=token&action=getTokenHolders&contractaddress=${TOKEN_ADDRESS}`
    );
    const holdersData = await holdersResponse.json();

    console.log('Token Holders API Response:', JSON.stringify(holdersData, null, 2));

    if (holdersData.status !== '1') {
      throw new Error(`Failed to fetch token holders: ${holdersData.message || 'Unknown error'}`);
    }

    const holders: TokenHolder[] = holdersData.result;

    // Fetch token transfers for the trading address (pump.tires contract)
    const transfersResponse = await fetch(
      `${SCAN_BASE_URL}?module=account&action=tokentx&address=${TRADING_ADDRESS}&contractaddress=${TOKEN_ADDRESS}&startblock=0&endblock=99999999&sort=asc`
    );
    const transfersData = await transfersResponse.json();

    console.log('Transfers API Response:', JSON.stringify(transfersData, null, 2));

    // Handle case where there are no transfers yet or API returns different status
    let allTransfers: TokenTransfer[] = [];

    if (transfersData.status === '1' && Array.isArray(transfersData.result)) {
      allTransfers = transfersData.result;
    } else if (transfersData.status === '0' && transfersData.message === 'No transactions found') {
      // No transfers yet, that's okay
      console.log('No token transfers found yet');
      allTransfers = [];
    } else {
      console.error('Unexpected transfers response:', transfersData);
      throw new Error(`Failed to fetch token transfers: ${transfersData.message || 'Unknown error'}`);
    }

    // Calculate volume based on buys and sells
    // Buy = transfer FROM trading address TO any wallet
    // Sell = transfer TO trading address FROM any wallet
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;
    const threeDaysAgo = now - 72 * 60 * 60;
    const sevenDaysAgo = now - 7 * 24 * 60 * 60;

    let volume24h = { buys: BigInt(0), sells: BigInt(0), buyCount: 0, sellCount: 0 };
    let volume72h = { buys: BigInt(0), sells: BigInt(0), buyCount: 0, sellCount: 0 };
    let volume7d = { buys: BigInt(0), sells: BigInt(0), buyCount: 0, sellCount: 0 };
    let volumeTotal = { buys: BigInt(0), sells: BigInt(0), buyCount: 0, sellCount: 0 };

    allTransfers.forEach((transfer) => {
      const timestamp = parseInt(transfer.timeStamp);
      const value = BigInt(transfer.value);
      const isBuy = transfer.from.toLowerCase() === TRADING_ADDRESS.toLowerCase();
      const isSell = transfer.to.toLowerCase() === TRADING_ADDRESS.toLowerCase();

      if (isBuy) {
        volumeTotal.buys += value;
        volumeTotal.buyCount++;
        if (timestamp >= sevenDaysAgo) { volume7d.buys += value; volume7d.buyCount++; }
        if (timestamp >= threeDaysAgo) { volume72h.buys += value; volume72h.buyCount++; }
        if (timestamp >= oneDayAgo) { volume24h.buys += value; volume24h.buyCount++; }
      } else if (isSell) {
        volumeTotal.sells += value;
        volumeTotal.sellCount++;
        if (timestamp >= sevenDaysAgo) { volume7d.sells += value; volume7d.sellCount++; }
        if (timestamp >= threeDaysAgo) { volume72h.sells += value; volume72h.sellCount++; }
        if (timestamp >= oneDayAgo) { volume24h.sells += value; volume24h.sellCount++; }
      }
    });

    const totalVolumeInTokens = volumeTotal.buys + volumeTotal.sells;

    // Convert to human-readable format
    const decimals = parseInt(tokenInfo.decimals);
    const volume = Number(totalVolumeInTokens) / Math.pow(10, decimals);
    const totalSupply = Number(BigInt(tokenInfo.totalSupply)) / Math.pow(10, decimals);

    return NextResponse.json({
      success: true,
      data: {
        tokenInfo: {
          name: tokenInfo.name,
          symbol: tokenInfo.symbol,
          decimals: tokenInfo.decimals,
          totalSupply: totalSupply.toLocaleString(),
          totalSupplyRaw: tokenInfo.totalSupply,
        },
        holders: {
          count: holders.length,
          topHolders: holders.slice(0, 10).map(holder => ({
            address: holder.address,
            balance: (Number(BigInt(holder.value)) / Math.pow(10, decimals)).toLocaleString(),
            balanceRaw: holder.value,
          })),
        },
        volume: {
          total: volume.toLocaleString(),
          totalRaw: totalVolumeInTokens.toString(),
          transferCount: allTransfers.length,
          breakdown: {
            '24h': {
              buys: (Number(volume24h.buys) / Math.pow(10, decimals)).toLocaleString(),
              sells: (Number(volume24h.sells) / Math.pow(10, decimals)).toLocaleString(),
              total: (Number(volume24h.buys + volume24h.sells) / Math.pow(10, decimals)).toLocaleString(),
              buyCount: volume24h.buyCount,
              sellCount: volume24h.sellCount,
            },
            '72h': {
              buys: (Number(volume72h.buys) / Math.pow(10, decimals)).toLocaleString(),
              sells: (Number(volume72h.sells) / Math.pow(10, decimals)).toLocaleString(),
              total: (Number(volume72h.buys + volume72h.sells) / Math.pow(10, decimals)).toLocaleString(),
              buyCount: volume72h.buyCount,
              sellCount: volume72h.sellCount,
            },
            '7d': {
              buys: (Number(volume7d.buys) / Math.pow(10, decimals)).toLocaleString(),
              sells: (Number(volume7d.sells) / Math.pow(10, decimals)).toLocaleString(),
              total: (Number(volume7d.buys + volume7d.sells) / Math.pow(10, decimals)).toLocaleString(),
              buyCount: volume7d.buyCount,
              sellCount: volume7d.sellCount,
            },
            allTime: {
              buys: (Number(volumeTotal.buys) / Math.pow(10, decimals)).toLocaleString(),
              sells: (Number(volumeTotal.sells) / Math.pow(10, decimals)).toLocaleString(),
              total: volume.toLocaleString(),
              buyCount: volumeTotal.buyCount,
              sellCount: volumeTotal.sellCount,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching token stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch token stats'
      },
      { status: 500 }
    );
  }
}
