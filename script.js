// 判断并初始化暗色模式设置
const themeToggle = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 优先采用用户手动设置的偏好，其次根据系统，最后默认使用深色模式（以适配高端质感设定）
if (savedTheme) {
    rootElement.setAttribute('data-theme', savedTheme);
} else if (prefersDark) {
    rootElement.setAttribute('data-theme', 'dark');
} else {
    rootElement.setAttribute('data-theme', 'dark');
}

// 切换按钮监听
themeToggle.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Intersection Observer 控制滚动淡入淡出动画
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            // 如果希望动画只播放一次，取消观察
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-hidden').forEach(section => {
    observer.observe(section);
});

// 点击导航栏链接的平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if(targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // offset navbar height (毛玻璃导航栏的高度)
                behavior: 'smooth'
            });
        }
    });
});
