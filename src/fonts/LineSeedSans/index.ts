import localFont from 'next/font/local';

export const lineSeedSans = localFont({
  src: [
    {
      path: './LINESeedSansTH_W_Th.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: './LINESeedSansTH_W_Rg.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './LINESeedSansTH_W_Bd.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './LINESeedSansTH_W_He.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './LINESeedSansTH_W_XBd.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-line-seed-sans',
  display: 'swap',
  preload: true,
});
