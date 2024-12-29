const postcss = require('postcss');

module.exports = postcss.plugin('postcss-rarely-font', (opts = {}) => {
  const rarelyFont = opts.fontName || 'rarelyFont';
  const defaultFallbackFont = opts.defaultFont || 'Arial, sans-serif';

  return root => {
    let bodyFontSet = false;

    root.walkRules(rule => {
      // 检查 body 是否已设置字体
      if (rule.selector === 'body') {
        rule.walkDecls(/^font(-family)?$/, decl => {
          if (decl.prop === 'font-family') {
            bodyFontSet = true;
            if (!decl.value.includes(rarelyFont)) {
              decl.value += `, ${rarelyFont}`;
            }
          }
        });

        if (!bodyFontSet) {
          rule.append({ prop: 'font-family', value: `${defaultFallbackFont}, ${rarelyFont}` });
        }
      }

      // 遍历所有 font 或 font-family
      rule.walkDecls(/^font(-family)?$/, decl => {
        if (decl.prop === 'font-family' && !decl.value.includes(rarelyFont)) {
          decl.value += `, ${rarelyFont}`;
        } else if (decl.prop === 'font') {
          const fontParts = decl.value.split('/');
          const familyIndex = fontParts[0].lastIndexOf(' ');
          if (familyIndex !== -1) {
            const fontFamily = fontParts[0].slice(familyIndex + 1);
            if (!fontFamily.includes(rarelyFont)) {
              fontParts[0] += `, ${rarelyFont}`;
              decl.value = fontParts.join('/');
            }
          }
        }
      });
    });

    if (!bodyFontSet) {
      root.append({
        selector: 'body',
        nodes: [{ prop: 'font-family', value: `${defaultFallbackFont}, ${rarelyFont}` }]
      });
    }
  };
});
