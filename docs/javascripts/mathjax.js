window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    packages: {'[+]': ['ams']} // 仅保留必要AMS扩展
  },
  startup: {
    typeset: false // 必须禁用自动渲染
  }
};

// 单独提取渲染控制（关键！）
document$.subscribe(() => {
  if (window.MathJax?.typesetPromise) {
    MathJax.typesetPromise();
  }
});