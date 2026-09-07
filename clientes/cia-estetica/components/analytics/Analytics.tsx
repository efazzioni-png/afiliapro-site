import Script from 'next/script';
import { siteConfig } from '@/data/site';

/**
 * Carrega GA4, Google Tag Manager e Meta Pixel — cada um apenas se o ID
 * correspondente existir nas variáveis de ambiente. Sem ID, nenhum script
 * é enviado ao navegador (bom para performance e para a LGPD).
 *
 * Todos usam `strategy="afterInteractive"`: não bloqueiam o carregamento.
 *
 * Configuração: ver .env.example
 */
export function Analytics() {
  const { ga4, gtm, metaPixel, googleAds } = siteConfig.analytics;

  return (
    <>
      {gtm && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      )}

      {(ga4 || googleAds) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4 || googleAds}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${ga4 ? `gtag('config', '${ga4}', { send_page_view: true });` : ''}
${googleAds ? `gtag('config', '${googleAds}');` : ''}`}
          </Script>
        </>
      )}

      {metaPixel && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixel}');
fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}

/** Fallback do GTM para navegadores sem JavaScript. Vai logo após <body>. */
export function GtmNoScript() {
  const { gtm } = siteConfig.analytics;
  if (!gtm) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
