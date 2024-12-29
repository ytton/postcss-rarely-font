module.exports = (opts={}) => {
  return {
    postcssPlugin: 'postcss-rarely-font',
    Once(root) {
      console.log(opts)
      const rarelyFont = opts.fontName || 'rarelyFont';
      const defaultFallbackFont = opts.defaultFont || 'Arial, sans-serif';

      let bodyFontSet = false;

      // 遍历 CSS 树
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

          // 如果 body 没有 font-family 声明，则添加默认字体
          if (!bodyFontSet) {
            rule.append({ prop: 'font-family', value: `${defaultFallbackFont}, ${rarelyFont}` });
          }
        }

        // 遍历所有 font 和 font-family 声明
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

      // 如果 body 没有定义任何规则，则添加默认 font-family
      if (!bodyFontSet) {
        root.append({
          selector: 'body',
          nodes: [{ prop: 'font-family', value: `${defaultFallbackFont}, ${rarelyFont}` }]
        });
      }
    }
  };
};

// 标记插件为 PostCSS 8 插件
module.exports.postcss = true;
