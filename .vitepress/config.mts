import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SDJ Docs",
  description: "Knowledge Base",
  lastUpdated: true,
  srcDir: './src',
  sitemap: {
    hostname: 'https://docs.sdj.pw'
  },
  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['script', { src: 'https://stats.sdj.pw/js/script.js', defer: 'defer', 'data-domain': 'docs.sdj.pw' }]
  ],
  themeConfig: {
    logo: '/images/logo.png',
    footer: {
      message: 'Released under the <a href="https://github.com/samjuk/docs.sdj.pw/blob/master/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2024-present <a href="https://github.com/samjuk">SamJUK</a>'
    },

    editLink: {
      pattern: 'https://github.com/samjuk/docs.sdj.pw/edit/master/src/:path',
      text: 'Edit this page on GitHub'
    },

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'About Me', link: 'https://www.sdj.pw/about/' },
      { text: 'Blog', link: 'https://www.sdj.pw/' }
    ],

    sidebar: [
      {
        text: 'General',
        collapsed: true,
        items: [
          { text: 'OpenVPN', collapsed: true, items: [
            { text: 'OpenVPN Installation', link: '/general/openvpn/installation' },
            { text: 'OpenVPN Split Routing', link: '/general/openvpn/split-routing' },
            { text: 'OpenVPN Static Client IPs', link: '/general/openvpn/static-client-ips' },
          ]},
          { text: 'Github', collapsed: true, items: [
            { text: 'Actions', link: '/general/github/actions' },
            { text: 'Artifact Cleanup', link: '/general/github/cleanup-artifacts' },
            { text: 'Dependabot', link: '/general/github/dependabot' },
          ]},
          { text: 'Sentry.io', collapsed: true, items: [
            { text: 'Self Hosting', link: '/general/sentry/self-hosting' },
            { text: 'Disk Space Cleanup', link: '/general/sentry/disk-space-cleanup' },
          ]},
          { text: 'Docker', collapsed: true, items: [
            { text: 'General', link: '/general/docker/docker' },
            { text: 'Orbstack', link: '/general/docker/orbstack' },
          ]},
          { text: 'Ansible', link: '/general/ansible' },
          { text: 'NewRelic', link: '/general/newrelic' },
          { text: 'Curl', link: '/general/curl' },
          { text: 'Block Tor Exit Routes', link: '/general/tor-block-exit-routes' },
          { text: 'CSP Reporting', link: '/general/csp-reporting'}
        ]
      },
      {
        text: 'Varnish',
        collapsed: true,
        items: [
          { text: 'Flushing Varnish', link: '/varnish/flush' },
          { text: 'Debug Cache Performance', link: '/varnish/debug-cache-performance' }
        ]
      },
      {
        text: 'Nginx',
        collapsed: true,
        items: [
          { text: 'Replace Polyfill.io', link: '/nginx/replace-polyfill-io' },
          { text: 'Configure Ratelimiting', link: '/nginx/ratelimiting' }
        ]
      },
      {
        text: 'Warden',
        collapsed: true,
        items: [
          { text: 'Anonymise DB', link: '/warden/anonymise-db' },
          { text: 'Install PHP-SPX', link: '/warden/php-spx' },
          { text: 'Wordpress Bedrock', link: '/warden/wordpress-bedrock' }
        ]
      },
      {
        text: 'Python',
        collapsed: true,
        items: [
          { text: 'Multiple Versions', link: '/python/multiple-versions' },
          { text: 'Virtual Environments', link: '/python/virtual-environments' },
        ]
      },
      {
        text: 'Linux',
        collapsed: true,
        items: [
          { text: 'Email Alerting', items: [
            { text: 'Low Disk', link: '/linux/email-alerts/disk-space' },
            { text: 'High Compute', link: '/linux/email-alerts/high-compute' },
            { text: 'Load Graphs', link: '/linux/email-alerts/load-graphs' },
          ]},
          { text: 'Image Optimisation', link: '/linux/image-optimisation' },
        ]
      },
      {
        text: 'Magento',
        collapsed: true,
        items: [
          { text: 'Automatic Updates', link: '/magento/auto-updates' },
          { text: 'Managing Media', link: '/magento/managing-media' },
          { text: 'CosmicSting CVE-2024-34102', link: '/magento/cosmicsting'},
          { text: 'Optimise SCD Build Process', link: '/magento/optimise-scd-build-process' },
          { text: 'Identify DB Schema Changes', link: '/magento/identify-db-schema-changes' },
          { text: 'Magepack Javascript Bundling', link: '/magento-magepack-javascript-bundling' },
          { text: 'Critical CSS', link: '/magento-critical-css' },
          { text: 'Cleanup Spam Customer Accounts', link: '/magento/spam-account-cleanup' },
          { text: 'Find noncacheable blocks', link: '/magento/non-cacheable-blocks' },
          { text: 'CLI Scratch file', link: '/magento/scratch-file'},
          { text: 'Cloud | Vars / Store Codes', link: '/magento/cloud-store-codes' }
        ]
      },
      {
        text: 'AeroCommerce',
        collapsed: true,
        items: [
          { text: 'Tinker', link: '/aero-commerce/tinker' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/samjuk' }
    ]
  }
})
