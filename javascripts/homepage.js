// 首页检测脚本 - 尽早执行
(function() {
  // 检测页面上是否存在hero-section（仅首页有）
  if (document.querySelector('.hero-section')) {
    // 为body添加homepage类
    document.body.classList.add('homepage');
    
    // 自动滚动使背景底部刚好与页面底部重合
    window.addEventListener('load', function() {
      // 等待页面完全加载和渲染，确保所有元素就位
      setTimeout(function() {
        // 获取英雄区域和页面信息
        var heroSection = document.querySelector('.hero-section');
        var heroHeight = heroSection.offsetHeight; // 英雄区域实际高度
        var viewportHeight = window.innerHeight; // 视口高度
        var currentScroll = window.pageYOffset; // 当前滚动位置
        
        // 计算英雄区域顶部到视口顶部的距离
        var heroTop = heroSection.getBoundingClientRect().top + currentScroll;
        
        // 计算使英雄区域底部刚好与视口底部对齐的滚动距离
        // 目标滚动位置 = 英雄区域底部位置 - 视口高度
        // 英雄区域底部位置 = heroTop + heroHeight
        var targetScroll = (heroTop + heroHeight) - viewportHeight;
        
        // 确保不滚动到负位置，并且考虑当前滚动位置
        var scrollDistance = Math.max(0, targetScroll - currentScroll);
        
        console.log('英雄区域高度:', heroHeight, '视口高度:', viewportHeight, '当前滚动:', currentScroll, '计算滚动距离:', scrollDistance);
        
        // 执行滚动
        if (scrollDistance > 0) {
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }, 800); // 0.8秒延迟，确保页面完全稳定
    });
  }
})();

// 移动端菜单修复脚本
(function() {
  // 等待DOM加载完成
  function initMobileMenu() {
    var drawerToggle = document.getElementById('__drawer');
    var sidebar = document.querySelector('.md-sidebar--primary');
    var overlay = document.querySelector('.md-overlay');
    var menuButton = document.querySelector('.md-header__button[for="__drawer"]');
    
    if (!drawerToggle || !sidebar || !overlay || !menuButton) {
      console.log('移动端菜单元素未找到，等待重试...');
      setTimeout(initMobileMenu, 100);
      return;
    }
    
    console.log('移动端菜单元素已找到，开始修复...');
    
    // 添加移动端样式类
    sidebar.classList.add('mobile-sidebar-fixed');
    
    // 监听抽屉状态变化
    drawerToggle.addEventListener('change', function() {
      if (drawerToggle.checked) {
        console.log('移动端菜单打开');
        sidebar.style.transform = 'translateX(0)';
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
      } else {
        console.log('移动端菜单关闭');
        sidebar.style.transform = 'translateX(-100%)';
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        document.body.style.overflow = '';
      }
    });
    
    // 点击遮罩层关闭菜单（包括右侧空白区域）
    overlay.addEventListener('click', function(e) {
      console.log('点击遮罩层，关闭菜单');
      drawerToggle.checked = false;
      drawerToggle.dispatchEvent(new Event('change'));
    });
    
    // 防止侧边栏内部点击关闭菜单
    sidebar.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // 点击菜单外部区域关闭菜单（增强版）
    document.addEventListener('click', function(e) {
      // 如果菜单是打开的，且点击的不是菜单按钮，且点击的不是侧边栏内部
      if (drawerToggle.checked && 
          !menuButton.contains(e.target) && 
          !sidebar.contains(e.target)) {
        console.log('点击菜单外部区域，关闭菜单');
        drawerToggle.checked = false;
        drawerToggle.dispatchEvent(new Event('change'));
      }
    });
    
    // 触摸滑动支持
    var touchStartX = 0;
    var touchEndX = 0;
    
    sidebar.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    sidebar.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) { // 向左滑动超过50px
        console.log('向左滑动，关闭菜单');
        drawerToggle.checked = false;
        drawerToggle.dispatchEvent(new Event('change'));
      }
    }
    
    console.log('移动端菜单修复完成');
  }
  
  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
  
  // 窗口大小变化时重置菜单状态
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1219) { // 76.1875em ≈ 1219px
      var drawerToggle = document.getElementById('__drawer');
      if (drawerToggle && drawerToggle.checked) {
        drawerToggle.checked = false;
        drawerToggle.dispatchEvent(new Event('change'));
      }
    }
  });
})();