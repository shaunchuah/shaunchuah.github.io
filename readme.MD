# Shaun Chuah's Personal Website

[![Hugo](https://img.shields.io/badge/Hugo-0.151.0-blue.svg)](https://gohugo.io/)
[![PaperMod](https://img.shields.io/badge/Theme-PaperMod-green.svg)](https://github.com/adityatelange/hugo-PaperMod)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue.svg)](https://pages.github.com/)

This is the source code for my personal website and blog, hosted at [shaunchuah.github.io](https://shaunchuah.github.io/). The site serves as both a professional portfolio and a platform for sharing my thoughts on gastroenterology, inflammatory bowel disease (IBD), artificial intelligence, bioinformatics, and software development.

## About

I'm Shaun Chuah, an academic gastroenterologist at the University of Glasgow with a passion for applying machine learning and AI to improve outcomes in Inflammatory Bowel Disease. Through this blog, I share insights from my research, tutorials on bioinformatics and web development, and explorations of emerging technologies in healthcare.

### Key Features

- **Blog Posts**: Technical articles on AI, bioinformatics pipelines, web development, and medical research
- **Projects Portfolio**: Showcase of my work including ChatIBD, clinical studies, and software tools
- **Publications**: Academic publications in gastroenterology and IBD research
- **Search Functionality**: Built-in search powered by Fuse.js
- **Responsive Design**: Mobile-friendly layout using the PaperMod theme
- **Fast Loading**: Optimized with Hugo's static generation and minification

## Technology Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/) v0.151.0
- **Theme**: [PaperMod](https://github.com/adityatelange/hugo-PaperMod) - A fast, clean, and responsive theme
- **Deployment**: GitHub Pages with GitHub Actions CI/CD
- **Analytics**: Google Analytics
- **Syntax Highlighting**: Chroma with Catppuccin Frappé theme
- **Search**: Fuse.js for client-side search

## Local Development

### Prerequisites

- [Hugo](https://gohugo.io/getting-started/installing/) (Extended version)
- [Git](https://git-scm.com/)
- Optional: [Node.js](https://nodejs.org/) (if you need to modify assets)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shaunchuah/shaunchuah.github.io.git
   cd shaunchuah.github.io
   ```

2. **Initialize submodules** (for the PaperMod theme):

   ```bash
   git submodule update --init --recursive
   ```

3. **Install Hugo** (if not already installed):

   **macOS:**

   ```bash
   brew install hugo
   ```

   **Linux:**

   ```bash
   # Ubuntu/Debian
   sudo apt-get install hugo

   # Or download binary
   wget https://github.com/gohugoio/hugo/releases/download/v0.151.0/hugo_extended_0.151.0_linux-amd64.tar.gz
   tar -xzf hugo_extended_0.151.0_linux-amd64.tar.gz
   sudo mv hugo /usr/local/bin/
   ```

   **Windows:**

   ```powershell
   choco install hugo-extended
   # Or download from https://github.com/gohugoio/hugo/releases
   ```

### Running Locally

1. **Start the development server:**

   ```bash
   hugo server -D
   ```

2. **Open your browser** and navigate to `http://localhost:1313/`

The `-D` flag includes draft posts in the build. Remove it for production builds.

### Creating Content

#### New Blog Post

```bash
hugo new posts/your-post-title.md
```

This creates a new post in `content/posts/` with the default archetype.

#### New Page

```bash
hugo new your-page.md
```

#### Content Structure

- `content/posts/` - Blog posts
- `content/projects.md` - Projects page
- `content/publications.md` - Publications page
- `content/archives.md` - Archive page
- `content/search.md` - Search page

### Building for Production

```bash
# Build the site
hugo --minify

# The generated site will be in the `public/` directory
```

## Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions. The workflow:

1. Triggers on pushes to the `main` branch
2. Builds the Hugo site
3. Deploys to GitHub Pages

### Manual Deployment

If you need to deploy manually:

1. Ensure you're on the `main` branch
2. Push your changes:

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

The GitHub Actions workflow will handle the rest.

## Configuration

The site configuration is in `hugo.yaml`. Key settings include:

- **Base URL**: `https://shaunchuah.github.io/`
- **Theme**: PaperMod
- **Analytics**: Google Analytics ID configured
- **Social Links**: X and GitHub
- **Menu Items**: Home, Search, Projects, Publications, Course, Archives

### Customizing

- **Theme Customization**: Modify files in `assets/css/extended/` or `layouts/partials/`
- **Home Page**: Edit `layouts/partials/home_info.html` and corresponding params in `hugo.yaml`
- **Social Icons**: Configure in `hugo.yaml` under `params.socialIcons`

## License

The content of this website is © Shaun Chuah, unless otherwise noted. The Hugo theme (PaperMod) is licensed under the MIT License.

## Contact

- **Website**: [shaunchuah.github.io](https://shaunchuah.github.io/)
- **Twitter**: [@drshaunchuah](https://x.com/drshaunchuah)
- **GitHub**: [shaunchuah](https://github.com/shaunchuah)
- **Email**: [shaun.chuah@glasgow.ac.uk](mailto:shaun.chuah@glasgow.ac.uk)

---

Built with ❤️ using Hugo and PaperMod theme
