import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { isProduction } from '../../environment/config';

const driftScript = `"use strict";

! function () {
  var t = window.driftt = window.drift = window.driftt || [];

  if (!t.init) {
    if (t.invoked) return void(window.console && console.error && console.error("Drift snippet included twice."));
    t.invoked = !0, t.methods = ["identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on"],
      t.factory = function (e) {
        return function () {
          var n = Array.prototype.slice.call(arguments);
          return n.unshift(e), t.push(n), t;
        };
      }, t.methods.forEach(function (e) {
        t[e] = t.factory(e);
      }), t.load = function (t) {
        var e = 3e5,
          n = Math.ceil(new Date() / e) * e,
          o = document.createElement("script");
        o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
        var i = document.getElementsByTagName("script")[0];
        i.parentNode.insertBefore(o, i);
      };
  } else {
    document.querySelector('#drift-widget-container').hidden = false;
  }
}();
drift.config({
  messages: {
    welcomeMessage: 'Segíthetünk? Ha kérdésed van, írj bátran!'
   },
   enableCampaigns: false
});
drift.SNIPPET_VERSION = '0.3.1';
drift.load('dzw4g36p7k4z');
`;

const hotjarScript = `
(function(h,o,t,j,a,r){
  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
  h._hjSettings={hjid:1636816,hjsv:6};
  a=o.getElementsByTagName('head')[0];
  r=o.createElement('script');r.async=1;
  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
  a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`;

type HeadProps = {
  title?: string;
  description?: string;
  imageURL?: string;
};

export const Head = ({ title, description, imageURL }: HeadProps) => (
  <Helmet>
    {title && <title>{title}</title>}
    {title && <meta property="og:title" content={title} />}
    {description && <meta name="description" content={description} />}
    {description && <meta property="og:description" content={description} />}
    {imageURL && <meta property="og:image" content={imageURL} />}
    <meta property="og:url" content={window.location.href} />
  </Helmet>
);

// Setup <meta> tags based on https://css-tricks.com/essential-meta-tags-social-media/
export const RootHead = () => {
  const { t } = useTranslation('core');

  return (
    <Helmet titleTemplate="%s | cogito" defaultTitle="cogito">
      <meta name="description" content={t('meta.description')} />
      <meta property="og:description" content={t('meta.description')} />

      {isProduction && <script>{driftScript}</script>}
      {isProduction && <script>{hotjarScript}</script>}
    </Helmet>
  );
};
