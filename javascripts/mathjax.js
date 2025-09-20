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

// 检测是否为首页并添加相应类名
function detectHomePage() {
  // 通过页面内容判断（首页有hero-section）
  const hasHeroSection = document.querySelector('.hero-section') !== null;
  
  if (hasHeroSection) {
    document.body.classList.add('home-page');
  }
}

// 页面加载时检测
document.addEventListener('DOMContentLoaded', detectHomePage);