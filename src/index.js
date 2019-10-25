const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))

const hasProp = Object.prototype.hasOwnProperty

const uniqueSlug = (slug, slugs) => {
  let uniq = slug
  let i = 2
  while (hasProp.call(slugs, uniq)) uniq = `${slug}-${i++}`
  slugs[uniq] = true
  return uniq
}

function addquote (str) {
  return str.replace(/([$-/:-?{-~!"^_`\[\]])/g, '\\$1')
}

const headerLink = (md, opts) => {
  opts = Object.assign({}, headerLink.defaults, opts)

  md.core.ruler.before('linkify', 'headerLink', state => {
    const slugs = {}
    const tokens = state.tokens

    let quotes = opts.quotes.replace(/\s+/g, ' ')
    const isHtmlComments = quotes === headerLink.defaults.quotes
    quotes = quotes.split(' ')
    if (quotes.length !== 2) throw new Error('Invalid quotes')

    const regex = new RegExp(addquote(quotes[0]) + '\\s*\\S+\\s*' + addquote(quotes[1]), 's')

    tokens
      .filter(token => token.type === 'heading_open')
      .forEach(token => {
        // Aggregate the next token children text.
        let slug = token.attrGet('id')
        if (slug == null) {
          tokens[tokens.indexOf(token) + 1].children.filter(t => {
            if ((isHtmlComments && t.type === 'html_inline') || (!isHtmlComments && (t.type === 'text' || t.type === 'code_inline'))) {
              let content = t.content
              if (slug == null) slug = content.match(regex)
              if (slug) {
                slug = slug[0]
                t.content = t.content.replace(slug, '').trim()
                slug = slug.substring(quotes[0].length, slug.length - quotes[1].length).trim()
                slug = uniqueSlug(opts.slugify(slug), slugs)
                token.attrPush(['id', slug])
              }
              return true
            };
            return false
          })
        }
      })
  })
}

headerLink.defaults = {
  slugify,
  quotes: '<!-- -->',
}

module.exports = headerLink
