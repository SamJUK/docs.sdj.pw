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
          { text: 'Github', collapsed: true, items: [
            { text: 'Actions', link: '/general/github/actions' },
            { text: 'Artifact Cleanup', link: '/general/github/cleanup-artifacts' },
            { text: 'Dependabot', link: '/general/github/dependabot' },
          ]},
          { text: 'Bitbucket', collapsed: true, items: [
            { text: 'Renovate', link: '/general/bitbucket/renovate-mend' },
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
          { text: 'Block Tor Exit Routes', link: '/general/tor-block-exit-routes' },
          { text: 'CSP Reporting', link: '/general/csp-reporting'},
        ]
      },
      { 
        text: 'Software',
        collapsed: true,
        items: [
          { text: 'OpenVPN', collapsed: true, items: [
            { text: 'OpenVPN Installation', link: '/software/openvpn/installation' },
            { text: 'OpenVPN Split Routing', link: '/software/openvpn/split-routing' },
            { text: 'OpenVPN Static Client IPs', link: '/software/openvpn/static-client-ips' },
          ]},
          { text: 'Varnish', collapsed: true, items: [
            { text: 'Flushing Varnish', link: '/software/varnish/flush' },
            { text: 'Reloading the VCL', link: '/software/varnish/reloading-the-vcl' },
            { text: 'Debug Cache Performance', link: '/software/varnish/debug-cache-performance' }
          ]},
          { text: 'Nginx', collapsed: true, items: [
            { text: 'Nginx Replace Polyfill.io', link: '/software/nginx/replace-polyfill-io' },
            { text: 'Nginx Rate Limiting', link: '/software/nginx/rate-limiting' }
          ]},
          { text: 'Composer', collapsed: true, items: [
            { text: 'Composer Patches', link: '/software/composer/patches' },
            { text: 'Composer Artifacts', link: '/software/composer/artifacts' }
          ]},
          { text: 'Curl', link: '/software/curl' },
        ]
      },
      { text: 'Warden', collapsed: true, items: [
        { text: 'Anonymise DB', link: '/warden/anonymise-db' },
        { text: 'Install PHP-SPX', link: '/warden/php-spx' },
        { text: 'Wordpress Bedrock', link: '/warden/wordpress-bedrock' }
      ]},
      {
        text: 'Python',
        collapsed: true,
        items: [
          { text: 'Multiple Versions', link: '/python/multiple-versions' },
          { text: 'Virtual Environments', link: '/python/virtual-environments' },
          { text: 'Poetry', link: '/python/poetry' },
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
          { text: 'Ubuntu', link: '/linux/ubuntu' }
        ]
      },
      {
        text: 'Magento',
        collapsed: true,
        items: [
          { text: 'General', collapsed: true, items: [
            { text: 'CLI Scratch file', link: '/magento/scratch-file'},
          ]},
          { text: 'Operations', collapsed: true, items: [
            { text: 'Automatic Updates', link: '/magento/auto-updates' },
            { text: 'Optimise SCD Build Process', link: '/magento/optimise-scd-build-process' },
            { text: 'Managing Media', link: '/magento/managing-media' },
            { text: 'Magepack Javascript Bundling', link: '/magento-magepack-javascript-bundling' },
            { text: 'Critical CSS', link: '/magento-critical-css' },
            { text: 'Cleanup Spam Customer Accounts', link: '/magento/spam-account-cleanup' },
          ]},
          { text: 'Development', collapsed: true, items: [
            { text: 'App/Code', link: '/magento/app-code' },
          ]},
          { text: 'Debugging', collapsed: true, items: [
            { text: 'Identify DB Schema Changes', link: '/magento/identify-db-schema-changes' },
            { text: 'Find noncacheable blocks', link: '/magento/non-cacheable-blocks' },
          ]},
          { text: 'Cloud/Commerce', collapsed: true, items: [
            { text: 'Setting Store Codes', link: '/magento/cloud-store-codes' }
          ]},
          { text: 'Security', collapsed: true, items: [
            { text: 'CosmicSting', link: '/magento/cosmicsting'},
          ]}
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
