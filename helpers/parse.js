import MarkdownIt from 'markdown-it'
import xss from 'xss'

export const configuredXss = new xss.FilterXSS({
  whiteList: {
    ...xss.whiteList,
    summary: [],
    h1: ['id'],
    h2: ['id'],
    h3: ['id'],
    h4: ['id'],
    h5: ['id'],
    h6: ['id'],
    kbd: ['id'],
    input: ['checked', 'disabled', 'type'],
    iframe: ['width', 'height', 'allowfullscreen', 'frameborder', 'start', 'end'],
    img: [...xss.whiteList.img, 'usemap'],
    map: ['name'],
    area: [...xss.whiteList.a, 'coords'],
    a: [...xss.whiteList.a, 'rel'],
  },
  onIgnoreTagAttr: (tag, name, value) => {
    // Allow iframes from acceptable sources
    if (tag === 'iframe' && name === 'src') {
      const allowedSources = [
        {
          regex:
            /^https?:\/\/(www\.)?youtube(-nocookie)?\.com\/embed\/[a-zA-Z0-9_-]{11}(\?&autoplay=[0-1]{1})?$/,
          remove: ['&autoplay=1'], // Prevents autoplay
        },
        {
          regex: /^https?:\/\/(www\.)?discord\.com\/widget\?id=\d{18,19}(&theme=\w+)?$/,
          remove: [/&theme=\w+/],
        },
      ]

      for (const source of allowedSources) {
        if (source.regex.test(value)) {
          for (const remove of source.remove) {
            value = value.replace(remove, '')
          }
          return name + '="' + xss.escapeAttrValue(value) + '"'
        }
      }
    }

    // For Highlight.JS
    if (
      name === 'class' &&
      ['pre', 'code', 'span'].includes(tag) &&
      (value.startsWith('hljs-') || value.startsWith('language-'))
    ) {
      return name + '="' + xss.escapeAttrValue(value) + '"'
    }
  },
  safeAttrValue(tag, name, value, _cssFilter) {
    if (tag === 'img' && name === 'src' && !value.startsWith('data:')) {
      try {
        const url = new URL(value)

        const allowedHostnames = [
          'imgur.com',
          'i.imgur.com',
          'cdn-raw.modrinth.com',
          'cdn.modrinth.com',
          'staging-cdn-raw.modrinth.com',
          'staging-cdn.modrinth.com',
          'github.com',
          'raw.githubusercontent.com',
          'img.shields.io',
          'i.postimg.cc',
          'wsrv.nl',
          'cf.way2muchnoise.eu',
          'bstats.org',
        ]

        if (!allowedHostnames.includes(url.hostname)) {
          return `https://wsrv.nl/?url=${encodeURIComponent(value)}&n=-1`
        }
      } catch (err) {}
    }

    return value
  },
})

export const md = (options = {}) => {
  const md = new MarkdownIt('default', {
    html: true,
    linkify: true,
    breaks: false,
    ...options,
  })

  const defaultLinkOpenRenderer =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    const index = token.attrIndex('href')

    if (index !== -1) {
      const href = token.attrs[index][1]

      try {
        const url = new URL(href)
        const allowedHostnames = ['modrinth.com']

        if (allowedHostnames.includes(url.hostname)) {
          return defaultLinkOpenRenderer(tokens, idx, options, env, self)
        }
      } catch (err) {}
    }

    tokens[idx].attrSet('rel', 'noopener nofollow ugc')

    return defaultLinkOpenRenderer(tokens, idx, options, env, self)
  }

  return md
}

export const renderString = (string) => configuredXss.process(md().render(string))
