---
description: Production-tested DevOps, Magento, and Linux guides from 10+ years managing enterprise infrastructure. Real solutions to CI/CD, security, and performance problems.
---
# SDJ Docs: Production-Tested DevOps & Development Solutions

Welcome to my personal technical documentation repository - a collection of **battle-tested solutions, troubleshooting guides, and operational runbooks** developed over a decade of managing enterprise infrastructure, e-commerce platforms, and CI/CD pipelines.

## What Makes This Different

Unlike generic tutorials or copied documentation, every guide on this site represents a **real production problem I've personally solved**. These aren't theoretical exercises - they're the exact solutions, scripts, and workflows that keep production systems running across dozens of high-traffic environments.

**What you'll find here:**

- **GitHub Actions workflows** that actually work in real CI/CD pipelines
- **Magento security and performance guides** tested on stores handling millions in revenue
- **Linux system administration scripts** managing 50+ production servers
- **Infrastructure automation** patterns used in multi-environment deployments
- **Troubleshooting guides** for issues that cost me hours to solve (so they don't cost you hours)

This documentation site serves as both my personal knowledge base and a resource for the wider DevOps, development, and e-commerce communities. If you've ever spent hours debugging a cryptic error only to find the solution buried in a 5-year-old forum post - that's what I'm trying to prevent.

## Who This Is For

**This site is designed for:**

- **DevOps Engineers** managing CI/CD pipelines, infrastructure automation, and deployment workflows
- **Magento Developers & Architects** optimizing performance, security, and deployment processes
- **Systems Administrators** maintaining Linux servers, monitoring systems, and security hardening
- **Platform Engineers** building and maintaining developer tooling and infrastructure
- **Technical Leaders** looking for proven solutions to common infrastructure challenges

If you work in production environments where downtime is measured in thousands of dollars per minute, these guides are written with that context in mind.

## My Background

I'm Sam James, a Principal Software Engineer with over 10 years of experience in:

- **E-commerce Infrastructure**: Primarily Magento/Adobe Commerce platforms serving high-traffic retail operations
- **Cloud & Infrastructure**: AWS, Cloudflare, infrastructure-as-code, and hybrid environments  
- **CI/CD & Automation**: GitHub Actions, Ansible, Terraform, and custom deployment tooling
- **Security & Compliance**: Incident response, vulnerability remediation, and security hardening
- **Performance Engineering**: Database optimization, caching strategies, and application profiling

I've worked across agency environments, and consulting roles - giving me exposure to a wide variety of infrastructure patterns, team sizes, and technical challenges.

You can learn more about me on my [personal blog](https://www.sdj.pw/) or connect with me on [LinkedIn](https://www.linkedin.com/in/samjuk).

## Featured Guides

### Security & Vulnerability Management

**[CosmicSting (CVE-2024-34102) - Complete Response Guide](/magento/cosmicsting.html)**  
The most critical Magento vulnerability in years. This guide covers detection, patching, and post-incident security hardening based on real incident response work across 50+ stores.

**[Magento Security Patching Strategies](/magento/patching.html)**  
Best practices for applying security patches in production Magento environments, including zero-downtime strategies and rollback procedures.

### GitHub Actions & CI/CD

**[GitHub Actions SSH Configuration Issues](/general/github/actions/ssh-config.html)**  
Troubleshooting SSH key and known_hosts problems in GitHub Actions runners - a common stumbling block that's poorly documented.

**[GitHub Actions Artifact Cleanup Automation](/general/github/cleanup-artifacts.html)**  
Scripts and workflows for managing GitHub Actions artifacts at scale, including bulk cleanup and retention policies.

**[Managing GitHub Actions Standard Streams](/general/github/actions/steps-missing-standard-streams.html)**  
Understanding and debugging output capture issues in GitHub Actions workflows.

### Linux System Administration

**[Production Alerting Scripts](/linux/email-alerts/disk-space.html)**  
Email-based monitoring scripts for disk space, high CPU usage, and service availability - perfect for environments where full monitoring platforms aren't feasible.

**[System Performance Load Graphs via Email](/linux/email-alerts/load-graphs.html)**  
Generate and email server load graphs for quick visual diagnostics without needing to log in to the server.

### Infrastructure & Tooling

**[Ansible Server Provisioning](/operations/ansible/provisioning.html)**  
Production-ready Ansible playbooks for provisioning and configuring Linux servers with security hardening built-in.

**[Varnish Cache Debugging & Performance](/software/varnish/debug-cache-performance.html)**  
Practical approaches to diagnosing Varnish cache performance issues in high-traffic environments.

**[OpenVPN with Google SSO Integration](/software/openvpn/google-sso.html)**  
Setting up OpenVPN with Google Workspace SSO for team access management.

## Content Organization

The documentation is organized by platform, tool, or topic area:

### **General**
Cross-platform guides covering GitHub, Bitbucket, security topics, and general development tooling.

### **Operations**  
Infrastructure-as-code with Ansible and Terraform, including provisioning and configuration management patterns.

### **Software**
Specific software packages: Nginx, Varnish, Docker, OpenVPN, PHP, Composer, and monitoring tools like NewRelic and Sentry.

### **Linux**
System administration, monitoring, alerting, and performance optimization for Linux servers.

### **Magento**  
Magento-specific guides covering deployment, performance optimization, security, debugging, and operational best practices.

### **Python**
Python development environment setup, virtual environments, dependency management with Poetry.

### **Warden**
[Warden](https://warden.dev/) is a Docker-based development environment for Magento and other PHP applications - these guides cover advanced usage and customization.

## How to Use This Site

**Browse by Topic**: Use the sidebar navigation to explore specific areas of interest.

**Search**: Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open the search dialog and find specific solutions quickly.

**Custom Search Engine**: If you refer to this site frequently, consider adding it as a custom search engine in your browser:
- **Chrome/Edge**: Settings → Search engines → Manage search engines → Add
  - Search engine: `SDJ Docs`
  - Keyword: `sdj`
  - URL: `https://docs.sdj.pw/search.html?q=%s`
- Now you can type `sdj <query>` in your address bar to search directly

**Edit on GitHub**: Every page has an "Edit this page on GitHub" link at the bottom. If you find errors, outdated information, or want to contribute improvements, pull requests are welcome.

## Real-World Testing Philosophy

Every command, script, and configuration on this site has been:

✅ **Tested in production environments** (not just local development)  
✅ **Validated across multiple systems** (accounting for environment differences)  
✅ **Refined through real incidents** (edge cases from actual problems)  
✅ **Documented with context** (why it works, not just what to run)

I don't publish theoretical solutions. If it's documented here, it's because I've used it to solve a real problem.

## Common Gotchas & Lessons Learned

Many guides include **"Lessons Learned"** or **"Production Notes"** sections that cover:

- Non-obvious edge cases that only appear in production
- Performance implications at scale
- Security considerations often missed in tutorials
- Integration issues with other tools and systems
- Mistakes I made so you don't have to

These sections often contain the most valuable information - the stuff you won't find in official documentation.

## Contributing & Corrections

This site is **open-source** and lives at [github.com/samjuk/docs.sdj.pw](https://github.com/samjuk/docs.sdj.pw).

**You can contribute by:**
- Reporting errors or outdated information via GitHub Issues
- Submitting corrections or improvements via Pull Requests  
- Suggesting new topics you'd like to see covered
- Sharing your own "gotchas" or production experiences

I'm particularly interested in hearing about:
- Edge cases I haven't encountered
- Alternative approaches that work better in specific contexts
- Updates needed for new software versions
- Clarifications that would make guides more accessible

## Site Status & Roadmap

> **NOTE**: While we're still refining the content organization and categorization, some URLs may change. We do our best to maintain accurate 301 redirects, but if you're bookmarking specific pages, be aware that paths might evolve.

**Current focus areas:**
- Expanding existing guides with more context and troubleshooting steps
- Adding comprehensive "pillar" guides that cover entire topics end-to-end
- Improving search and discoverability
- Adding more real-world production examples and case studies

## Contact & Other Resources

**Personal Blog**: [sdj.pw](https://www.sdj.pw/) - Longer-form articles on development, infrastructure, and technology  
**GitHub**: [@samjuk](https://github.com/samjuk) - Open-source projects and contributions  
**LinkedIn**: [linkedin.com/in/samjuk](https://www.linkedin.com/in/samjuk) - Professional background and experience

For questions, corrections, or suggestions about this documentation site specifically, please use the [GitHub Issues](https://github.com/samjuk/docs.sdj.pw/issues) page.

---

## Quick Start: Most Popular Guides

New to the site? Start here:

1. **[CosmicSting Vulnerability Guide](/magento/cosmicsting.html)** - Critical Magento security issue
2. **[GitHub Actions SSH Config](/general/github/actions/ssh-config.html)** - Common CI/CD debugging
3. **[Varnish Cache Performance](/software/varnish/debug-cache-performance.html)** - High-traffic optimization
4. **[Linux Disk Space Alerts](/linux/email-alerts/disk-space.html)** - Essential monitoring
5. **[Ansible Server Provisioning](/operations/ansible/provisioning.html)** - Infrastructure automation

---

**Last Updated**: January 2026  
**Total Guides**: 70+ production-tested solutions  
**Built With**: [VitePress](https://vitepress.dev/) - Fast, modern documentation framework
